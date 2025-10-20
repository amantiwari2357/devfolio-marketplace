import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const serviceController = new ServiceController();

// Validation schemas
const serviceValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price.amount').isNumeric().withMessage('Price amount must be a number'),
  body('price.currency').notEmpty().withMessage('Price currency is required'),
  body('price.billingCycle')
    .optional()
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'project'])
    .withMessage('Invalid billing cycle'),
  body('features').isArray().withMessage('Features must be an array'),
  body('deliverables').isArray().withMessage('Deliverables must be an array'),
  body('timeline').notEmpty().withMessage('Timeline is required'),
  body('requirements').isArray().withMessage('Requirements must be an array'),
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

const availabilityValidation = [
  body('status')
    .isIn(['available', 'busy', 'unavailable'])
    .withMessage('Invalid availability status'),
  body('nextAvailableDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];

// Public routes
router.get('/', serviceController.getAll);
router.get('/featured', serviceController.getFeatured);
router.get('/search', serviceController.search);
router.get('/:id', serviceController.getById);
router.get('/provider/:providerId', serviceController.getByProvider);

// Protected routes
router.use(authenticate); // All routes below require authentication

// Service management
router.post(
  '/',
  authorize('admin', 'expert'),
  validate(serviceValidation),
  serviceController.create
);
router.put(
  '/:id',
  authorize('admin', 'expert'),
  validate(serviceValidation),
  serviceController.update
);
router.delete('/:id', authorize('admin', 'expert'), serviceController.delete);

// Service availability
router.patch(
  '/:id/availability',
  authorize('admin', 'expert'),
  validate(availabilityValidation),
  serviceController.updateAvailability
);

// Reviews
router.post(
  '/:id/reviews',
  validate(reviewValidation),
  serviceController.addReview
);

export default router;
