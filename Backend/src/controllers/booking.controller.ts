import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Booking } from '../models';

export class BookingController {
  // Get user's bookings
  getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const bookings = await Booking.find({ userId: req.user.id })
        .populate('serviceId', 'title description price')
        .populate('expertId', 'firstName lastName email')
        .sort({ createdAt: -1 });

      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get booking by ID
  getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const booking = await Booking.findOne({
        _id: req.params.id,
        userId: req.user.id
      })
        .populate('serviceId', 'title description price')
        .populate('expertId', 'firstName lastName email');

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      res.json(booking);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Create new booking
  createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { serviceId, expertId, scheduledDate, scheduledTime, duration, notes } = req.body;

      const booking = await Booking.create({
        userId: req.user.id,
        serviceId,
        expertId,
        scheduledDate,
        scheduledTime,
        duration,
        notes,
        status: 'pending'
      });

      res.status(201).json(booking);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update booking
  updateBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const updates = req.body;

      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $set: updates },
        { new: true, runValidators: true }
      )
        .populate('serviceId', 'title description price')
        .populate('expertId', 'firstName lastName email');

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      res.json(booking);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Cancel booking
  cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $set: { status: 'cancelled' } },
        { new: true }
      );

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      res.json({ message: 'Booking cancelled successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get all bookings
  getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const bookings = await Booking.find()
        .populate('userId', 'firstName lastName email')
        .populate('serviceId', 'title price')
        .populate('expertId', 'firstName lastName')
        .sort({ createdAt: -1 });

      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get booking stats
  getBookingStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const totalBookings = await Booking.countDocuments();
      const pendingBookings = await Booking.countDocuments({ status: 'pending' });
      const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
      const completedBookings = await Booking.countDocuments({ status: 'completed' });
      const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

      res.json({
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
