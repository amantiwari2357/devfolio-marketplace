import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models';
import { generateToken } from '../utils/jwt';

export class AuthController {
  // Register a new user
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName } = req.body;

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
      });

      // Generate token
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

  // Login user
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Check password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate token
      const token = generateToken(user);

      res.json({
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
      res.status(500).json({ message: error.message });
    }
  };

  // Get current user profile
  getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update user profile
  updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        skills: req.body.skills,
        socialLinks: req.body.socialLinks,
      };

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
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

  // Change password
  changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Verify current password
      const isValidPassword = await user.comparePassword(currentPassword);
      if (!isValidPassword) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update availability
  updateAvailability = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { availability } = req.body;

      // Transform availability data to match schema
      const transformedAvailability = availability
        .filter((item: any) => item.enabled)
        .map((item: any) => ({
          day: item.day,
          slots: [{ start: item.startTime, end: item.endTime }],
        }));

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { availability: transformedAvailability } },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: 'Availability updated successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update WhatsApp number
  updateWhatsApp = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { whatsappNumber } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { whatsappNumber } },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: 'WhatsApp number updated successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
