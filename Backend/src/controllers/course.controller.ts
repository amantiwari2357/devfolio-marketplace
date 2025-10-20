import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Course, ICourse } from '../models';

export class CourseController extends BaseController<ICourse> {
  constructor() {
    super(Course);
  }

  // Get courses by instructor
  getByInstructor = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [courses, total] = await Promise.all([
        Course.find({ instructor: req.params.instructorId })
          .populate('instructor', 'firstName lastName email profileImage')
          .skip(skip)
          .limit(limit),
        Course.countDocuments({ instructor: req.params.instructorId }),
      ]);

      res.json({
        data: courses,
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

  // Add review to course
  addReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const { rating, comment } = req.body;
      const userId = req.user.id;

      const course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }

      // Check if user already reviewed
      const existingReview = course.reviews.find(
        (review) => review.user.toString() === userId
      );
      if (existingReview) {
        res.status(400).json({ message: 'You have already reviewed this course' });
        return;
      }

      // Add review
      course.reviews.push({
        user: userId,
        rating,
        comment,
      });

      // Update average rating
      const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0);
      course.rating = totalRating / course.reviews.length;

      await course.save();
      
      const updatedCourse = await Course.findById(req.params.id)
        .populate('instructor', 'firstName lastName email profileImage')
        .populate('reviews.user', 'firstName lastName profileImage');

      res.json(updatedCourse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get featured courses
  getFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await Course.find({ status: 'published' })
        .sort({ rating: -1, enrollments: -1 })
        .limit(6)
        .populate('instructor', 'firstName lastName email profileImage');

      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Search courses with filters
  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        category,
        level,
        minPrice,
        maxPrice,
        tags,
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = { status: 'published' };
      if (category) query.category = category;
      if (level) query.level = level;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice as string);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
      }
      if (tags) {
        query.tags = {
          $in: (tags as string).split(','),
        };
      }

      const [courses, total] = await Promise.all([
        Course.find(query)
          .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limit)
          .populate('instructor', 'firstName lastName email profileImage'),
        Course.countDocuments(query),
      ]);

      res.json({
        data: courses,
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

  // Update course status
  updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      
      if (!['draft', 'published', 'archived'].includes(status)) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).populate('instructor', 'firstName lastName email profileImage');

      if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }

      res.json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Increment enrollment count
  incrementEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { $inc: { enrollments: 1 } },
        { new: true }
      );

      if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }

      res.json({ enrollments: course.enrollments });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
