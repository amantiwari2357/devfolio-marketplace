import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const testimonialController = new TestimonialController();

// Validation schemas
const testimonialValidation = [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Content must be between 10 and 1000 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('type')
    .isIn(['project', 'course', 'service'])
    .withMessage('Invalid type'),
  body('relatedItem')
    .notEmpty()
    .withMessage('Related item is required'),
];

// Public routes
router.get('/featured', testimonialController.getFeaturedTestimonials);
router.get('/type/:type', testimonialController.getByType);
router.get('/item/:itemId', testimonialController.getForItem);

// Protected routes
router.use(authenticate); // All routes below require authentication

// Testimonial management
router.get('/', testimonialController.getAll);
router.get('/stats', authorize('admin'), testimonialController.getStats);
router.get('/:id', testimonialController.getById);
router.post('/', validate(testimonialValidation), testimonialController.create);
router.put('/:id', validate(testimonialValidation), testimonialController.update);
router.delete('/:id', authorize('admin'), testimonialController.delete);

// Admin routes
router.patch(
  '/:id/status',
  authorize('admin'),
  body('status')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Invalid status'),
  testimonialController.updateStatus
);
router.patch('/:id/featured', authorize('admin'), testimonialController.toggleFeatured);

export default router;
