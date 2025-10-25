import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { User, IUser } from '../models';
import { generateToken } from '../utils/jwt';

export class UserController extends BaseController<IUser> {
  constructor() {
    super(User);
  }

  // Create a new user (admin only)
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already registered' });
        return;
      }

      // Create new user
      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      // Generate token (optional for admin-created users)
      const token = generateToken(user);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get all experts
  getExperts = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [experts, total] = await Promise.all([
        User.find({ role: 'expert' })
          .select('-password')
          .skip(skip)
          .limit(limit),
        User.countDocuments({ role: 'expert' }),
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

  // Update user role
  updateRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const { role } = req.body;
      
      if (!['admin', 'user', 'expert'].includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
        return;
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get user statistics
  getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 },
          },
        },
      ]);

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
