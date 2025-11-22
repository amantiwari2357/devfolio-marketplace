import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { ClientOnboarding, IClientOnboarding } from '../models/ClientOnboarding';
import { AuthRequest } from '../middleware/auth';

export class ClientOnboardingController extends BaseController<IClientOnboarding> {
  constructor() {
    super(ClientOnboarding);
  }

  // Override create method to set createdBy and handle defaults
  create = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Get user ID from authenticated user
      const userId = req.user?._id || req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Format dates properly - handle both string and Date objects
      const formatDate = (dateInput: string | Date) => {
        if (!dateInput) return undefined;
        if (dateInput instanceof Date) return dateInput;
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${dateInput}`);
        }
        return date;
      };

      // Prepare data with proper formatting
      const data: any = {
        clientName: req.body.clientName,
        email: req.body.email,
        phone: req.body.phone,
        companyName: req.body.companyName,
        projectName: req.body.projectName,
        techStack: req.body.techStack,
        projectType: req.body.projectType,
        totalAmount: Number(req.body.totalAmount) || 0,
        paidAmount: Number(req.body.paidAmount) || 0,
        teamMembers: Array.isArray(req.body.teamMembers) ? req.body.teamMembers : [],
        stages: Array.isArray(req.body.stages) ? req.body.stages : [],
        createdBy: userId,
      };

      // Add dates if provided
      if (req.body.startDate) {
        data.startDate = formatDate(req.body.startDate);
      }
      if (req.body.deadline) {
        data.deadline = formatDate(req.body.deadline);
      }

      console.log('Creating client onboarding with data:', {
        ...data,
        createdBy: userId,
      });

      const record = await ClientOnboarding.create(data);
      const populatedRecord = await ClientOnboarding.findById(record._id)
        .populate('createdBy', 'firstName lastName email username');

      console.log('Client onboarding created successfully:', record._id);

      res.status(201).json(populatedRecord);
    } catch (error: any) {
      console.error('Error creating client onboarding:', error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err: any) => ({
          field: err.path,
          message: err.message,
        }));
        return res.status(400).json({
          message: 'Validation error',
          errors: validationErrors,
        });
      }

      res.status(400).json({ 
        message: error.message || 'Failed to create client onboarding',
        error: error.name,
        details: error.errors || error.stack,
      });
    }
  };

  // Get all client onboarding records with filters
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        clientName,
        email,
        companyName,
        projectName,
        status,
        page = 1,
        limit = 10,
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      // Build query
      const query: any = {};
      if (clientName) {
        query.clientName = { $regex: clientName, $options: 'i' };
      }
      if (email) {
        query.email = { $regex: email, $options: 'i' };
      }
      if (companyName) {
        query.companyName = { $regex: companyName, $options: 'i' };
      }
      if (projectName) {
        query.projectName = { $regex: projectName, $options: 'i' };
      }
      if (status) {
        query['stages.status'] = status;
      }

      const [records, total] = await Promise.all([
        ClientOnboarding.find(query)
          .populate('createdBy', 'firstName lastName email')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        ClientOnboarding.countDocuments(query),
      ]);

      res.json({
        data: records,
        pagination: {
          current: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get client onboarding by ID
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const record = await ClientOnboarding.findById(req.params.id)
        .populate('createdBy', 'firstName lastName email');

      if (!record) {
        res.status(404).json({ message: 'Client onboarding record not found' });
        return;
      }

      res.json(record);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update stage status
  updateStageStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stageIndex, status } = req.body;

      const record = await ClientOnboarding.findById(req.params.id);
      if (!record) {
        res.status(404).json({ message: 'Client onboarding record not found' });
        return;
      }

      if (stageIndex >= 0 && stageIndex < record.stages.length) {
        record.stages[stageIndex].status = status;
        if (status === 'in-progress' && !record.stages[stageIndex].startDate) {
          record.stages[stageIndex].startDate = new Date();
        }
        if (status === 'completed' && !record.stages[stageIndex].endDate) {
          record.stages[stageIndex].endDate = new Date();
        }
        await record.save();
      }

      const updatedRecord = await ClientOnboarding.findById(req.params.id)
        .populate('createdBy', 'firstName lastName email');

      res.json(updatedRecord);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update payment
  updatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { paidAmount } = req.body;

      const record = await ClientOnboarding.findByIdAndUpdate(
        req.params.id,
        { paidAmount },
        { new: true, runValidators: true }
      ).populate('createdBy', 'firstName lastName email');

      if (!record) {
        res.status(404).json({ message: 'Client onboarding record not found' });
        return;
      }

      res.json(record);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get statistics
  getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await ClientOnboarding.aggregate([
        {
          $group: {
            _id: null,
            totalProjects: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            totalPaid: { $sum: '$paidAmount' },
            pendingAmount: {
              $sum: { $subtract: ['$totalAmount', '$paidAmount'] },
            },
          },
        },
      ]);

      const stageStats = await ClientOnboarding.aggregate([
        { $unwind: '$stages' },
        {
          $group: {
            _id: '$stages.status',
            count: { $sum: 1 },
          },
        },
      ]);

      res.json({
        overview: stats[0] || {
          totalProjects: 0,
          totalRevenue: 0,
          totalPaid: 0,
          pendingAmount: 0,
        },
        stageStats,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
