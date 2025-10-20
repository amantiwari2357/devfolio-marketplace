import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const testimonialController = new TestimonialController();

// Public routes
router.get('/featured', testimonialController.getFeaturedTestimonials);
router.get('/type/:type', testimonialController.getByType);
router.get('/item/:itemId', testimonialController.getForItem);

// Protected routes
router.use(authenticate);

// CRUD for testimonials (user-generated)
router.post('/', testimonialController.create);
router.get('/', authorize('admin'), testimonialController.getAll);
router.get('/:id', authorize('admin'), testimonialController.getById);
router.put('/:id', testimonialController.update);
router.delete('/:id', authorize('admin'), testimonialController.delete);

// Admin-only moderation
router.patch('/:id/status', authorize('admin'), testimonialController.updateStatus);
router.patch('/:id/toggle-featured', authorize('admin'), testimonialController.toggleFeatured);
router.get('/stats/summary', authorize('admin'), testimonialController.getStats);

export default router;
