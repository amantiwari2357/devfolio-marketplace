import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const bookingController = new BookingController();

// Validation schemas
const bookingValidation = [
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('expertId').notEmpty().withMessage('Expert ID is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('scheduledTime').notEmpty().withMessage('Scheduled time is required'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
  body('notes').optional().isString(),
];

const bookingUpdateValidation = [
  body('status').optional().isIn(['pending', 'confirmed', 'completed', 'cancelled']),
  body('notes').optional().isString(),
];

// Protected routes - all booking routes require authentication
router.use(authenticate);

// User booking routes
router.get('/', bookingController.getUserBookings);
router.post('/', validate(bookingValidation), bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', validate(bookingUpdateValidation), bookingController.updateBooking);
router.delete('/:id', bookingController.cancelBooking);

// Admin routes
router.get('/admin/all', authorize('admin'), bookingController.getAllBookings);
router.get('/admin/stats', authorize('admin'), bookingController.getBookingStats);

export default router;
