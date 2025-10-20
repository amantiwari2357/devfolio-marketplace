import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { BaseController } from './base.controller';
import { Service, IService } from '../models';

export class ServiceController extends BaseController<IService> {
  constructor() {
    super(Service);
  }

  // Get services by provider
  getByProvider = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [services, total] = await Promise.all([
        Service.find({ provider: req.params.providerId })
          .populate('provider', 'firstName lastName email profileImage')
          .skip(skip)
          .limit(limit),
        Service.countDocuments({ provider: req.params.providerId }),
      ]);

      res.json({
        data: services,
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

  // Add review to service
  addReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { rating, comment } = req.body;
      const userId = req.user.id;

      const service = await Service.findById(req.params.id);
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      // Check if user already reviewed
      const existingReview = service.reviews.find(
        (review) => review.user.toString() === userId
      );
      if (existingReview) {
        res.status(400).json({ message: 'You have already reviewed this service' });
        return;
      }

      // Add review
      service.reviews.push({
        user: userId,
        rating: Number(rating),
        comment: String(comment),
        createdAt: new Date(),
      });

      // Update average rating
      const totalRating = service.reviews.reduce((sum, review) => sum + review.rating, 0);
      service.rating = totalRating / service.reviews.length;

      await service.save();
      
      const updatedService = await Service.findById(req.params.id)
        .populate('provider', 'firstName lastName email profileImage')
        .populate('reviews.user', 'firstName lastName profileImage');

      res.json(updatedService);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update service availability
  updateAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status, nextAvailableDate } = req.body;

      if (!['available', 'busy', 'unavailable'].includes(status)) {
        res.status(400).json({ message: 'Invalid availability status' });
        return;
      }

      const service = await Service.findByIdAndUpdate(
        req.params.id,
        {
          'availability.status': status,
          'availability.nextAvailableDate': nextAvailableDate,
        },
        { new: true, runValidators: true }
      ).populate('provider', 'firstName lastName email profileImage');

      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      res.json(service);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Search services with filters
  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        category,
        minPrice,
        maxPrice,
        availability,
        billingCycle,
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      // Build query
      const query: any = { status: 'active' };
      if (category) query.category = category;
      if (minPrice || maxPrice) {
        query['price.amount'] = {};
        if (minPrice) query['price.amount'].$gte = parseFloat(minPrice as string);
        if (maxPrice) query['price.amount'].$lte = parseFloat(maxPrice as string);
      }
      if (availability) query['availability.status'] = availability;
      if (billingCycle) query['price.billingCycle'] = billingCycle;

      const [services, total] = await Promise.all([
        Service.find(query)
          .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limit)
          .populate('provider', 'firstName lastName email profileImage'),
        Service.countDocuments(query),
      ]);

      res.json({
        data: services,
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

  // Get featured services
  getFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
      const services = await Service.find({
        status: 'active',
        'availability.status': 'available',
      })
        .sort({ rating: -1 })
        .limit(6)
        .populate('provider', 'firstName lastName email profileImage');

      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
