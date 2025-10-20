import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { User, IUser, Project, Course, Service } from '../models';

export class ExpertController extends BaseController<IUser> {
  constructor() {
    super(User);
  }

  // Get all experts with filters
  getExperts = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        skills,
        availability,
        rating,
        sortBy = 'rating',
        order = 'desc',
      } = req.query;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = { role: 'expert' };
      if (skills) {
        query.skills = {
          $in: (skills as string).split(','),
        };
      }
      if (rating) {
        query.rating = { $gte: parseFloat(rating as string) };
      }

      const [experts, total] = await Promise.all([
        User.find(query)
          .select('-password')
          .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limit),
        User.countDocuments(query),
      ]);

      res.json({
        data: experts,
        pagination: {
          current: page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get expert profile with statistics
  getExpertProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const expertId = req.params.id;

      const expert = await User.findOne({ _id: expertId, role: 'expert' })
        .select('-password');

      if (!expert) {
        res.status(404).json({ message: 'Expert not found' });
        return;
      }

      // Get expert's projects, courses, and services counts
      const [projectCount, courseCount, serviceCount] = await Promise.all([
        Project.countDocuments({ author: expertId }),
        Course.countDocuments({ instructor: expertId }),
        Service.countDocuments({ provider: expertId }),
      ]);

      res.json({
        expert,
        statistics: {
          projects: projectCount,
          courses: courseCount,
          services: serviceCount,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update expert profile
  updateExpertProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const updates = {
        bio: req.body.bio,
        skills: req.body.skills,
        socialLinks: req.body.socialLinks,
        availability: req.body.availability,
      };

      const expert = await User.findOneAndUpdate(
        { _id: req.params.id, role: 'expert' },
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      if (!expert) {
        res.status(404).json({ message: 'Expert not found' });
        return;
      }

      res.json(expert);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get expert availability schedule
  getExpertAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      const expert = await User.findOne({ _id: req.params.id, role: 'expert' })
        .select('availability');

      if (!expert) {
        res.status(404).json({ message: 'Expert not found' });
        return;
      }

      res.json(expert.availability);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update expert availability
  updateExpertAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      const { availability } = req.body;

      const expert = await User.findOneAndUpdate(
        { _id: req.params.id, role: 'expert' },
        { $set: { availability } },
        { new: true, runValidators: true }
      ).select('-password');

      if (!expert) {
        res.status(404).json({ message: 'Expert not found' });
        return;
      }

      res.json(expert);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get expert statistics
  getExpertStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const expertId = req.params.id;

      const [projects, courses, services, reviews] = await Promise.all([
        Project.find({ author: expertId }).select('rating downloads reviews'),
        Course.find({ instructor: expertId }).select('rating enrollments reviews'),
        Service.find({ provider: expertId }).select('rating reviews'),
        // Aggregate reviews involving this expert across entities if needed; as a simple proxy we reuse above
        Project.find({ 'reviews.user': expertId }).select('reviews'),
      ]);

      const stats = {
        totalProjects: projects.length,
        totalCourses: courses.length,
        totalServices: services.length,
        averageRating: calculateAverageRating([...projects, ...courses, ...services]),
        totalReviews: calculateTotalReviews(reviews),
        totalDownloads: projects.reduce((sum, p) => sum + (p.downloads || 0), 0),
        totalEnrollments: courses.reduce((sum, c) => sum + (c.enrollments || 0), 0),
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

// Helper functions
function calculateAverageRating(items: any[]): number {
  const ratings = items.map(item => item.rating).filter(r => r !== undefined);
  return ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;
}

function calculateTotalReviews(items: any[]): number {
  return items.reduce((sum, item) => sum + (item.reviews?.length || 0), 0);
}
