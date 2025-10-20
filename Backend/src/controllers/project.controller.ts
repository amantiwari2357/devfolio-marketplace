import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { BaseController } from './base.controller';
import { Project, IProject } from '../models';

export class ProjectController extends BaseController<IProject> {
  constructor() {
    super(Project);
  }

  // Get projects by author
  getByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [projects, total] = await Promise.all([
        Project.find({ author: req.params.authorId })
          .populate('author', 'firstName lastName email profileImage')
          .skip(skip)
          .limit(limit),
        Project.countDocuments({ author: req.params.authorId }),
      ]);

      res.json({
        data: projects,
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

  // Add review to project
  addReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { rating, comment } = req.body;
      const userId = req.user.id;

      const project = await Project.findById(req.params.id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      // Check if user already reviewed
      const existingReview = project.reviews.find(
        (review) => review.user.toString() === userId
      );
      if (existingReview) {
        res.status(400).json({ message: 'You have already reviewed this project' });
        return;
      }

      // Add review
      project.reviews.push({
        user: userId,
        rating: Number(rating),
        comment: String(comment),
        createdAt: new Date(),
      });

      // Update average rating
      const totalRating = project.reviews.reduce((sum, review) => sum + review.rating, 0);
      project.rating = totalRating / project.reviews.length;

      await project.save();
      
      const updatedProject = await Project.findById(req.params.id)
        .populate('author', 'firstName lastName email profileImage')
        .populate('reviews.user', 'firstName lastName profileImage');

      res.json(updatedProject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get featured projects
  getFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
      const projects = await Project.find({ status: 'published' })
        .sort({ rating: -1, downloads: -1 })
        .limit(6)
        .populate('author', 'firstName lastName email profileImage');

      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Search projects by category and filters
  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        category,
        minPrice,
        maxPrice,
        technologies,
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = { status: 'published' };
      if (category) query.category = category;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice as string);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
      }
      if (technologies) {
        query.technologies = {
          $in: (technologies as string).split(','),
        };
      }

      const [projects, total] = await Promise.all([
        Project.find(query)
          .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limit)
          .populate('author', 'firstName lastName email profileImage'),
        Project.countDocuments(query),
      ]);

      res.json({
        data: projects,
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

  // Update project status
  updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      
      if (!['draft', 'published', 'archived'].includes(status)) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).populate('author', 'firstName lastName email profileImage');

      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      res.json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Increment download count
  incrementDownloads = async (req: Request, res: Response): Promise<void> => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { $inc: { downloads: 1 } },
        { new: true }
      );

      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      res.json({ downloads: project.downloads });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
