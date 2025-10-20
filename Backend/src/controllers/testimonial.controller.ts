import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Testimonial, ITestimonial } from '../models';

export class TestimonialController extends BaseController<ITestimonial> {
  constructor() {
    super(Testimonial);
  }

  // Get featured testimonials
  getFeaturedTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonials = await Testimonial.find({
        status: 'approved',
        featured: true,
      })
        .populate('author', 'firstName lastName email profileImage')
        .sort('-createdAt')
        .limit(6);

      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get testimonials by type
  getByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [testimonials, total] = await Promise.all([
        Testimonial.find({ type, status: 'approved' })
          .populate('author', 'firstName lastName email profileImage')
          .populate('relatedItem')
          .skip(skip)
          .limit(limit)
          .sort('-createdAt'),
        Testimonial.countDocuments({ type, status: 'approved' }),
      ]);

      res.json({
        data: testimonials,
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

  // Get testimonials for a specific item
  getForItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { itemId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [testimonials, total] = await Promise.all([
        Testimonial.find({
          relatedItem: itemId,
          status: 'approved',
        })
          .populate('author', 'firstName lastName email profileImage')
          .skip(skip)
          .limit(limit)
          .sort('-createdAt'),
        Testimonial.countDocuments({
          relatedItem: itemId,
          status: 'approved',
        }),
      ]);

      res.json({
        data: testimonials,
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

  // Update testimonial status (admin only)
  updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      
      if (!['pending', 'approved', 'rejected'].includes(status)) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      const testimonial = await Testimonial.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      )
        .populate('author', 'firstName lastName email profileImage')
        .populate('relatedItem');

      if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found' });
        return;
      }

      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Toggle featured status (admin only)
  toggleFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      
      if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found' });
        return;
      }

      testimonial.featured = !testimonial.featured;
      await testimonial.save();

      const updatedTestimonial = await Testimonial.findById(req.params.id)
        .populate('author', 'firstName lastName email profileImage')
        .populate('relatedItem');

      res.json(updatedTestimonial);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get testimonial statistics
  getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await Testimonial.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            averageRating: { $avg: '$rating' },
          },
        },
      ]);

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
