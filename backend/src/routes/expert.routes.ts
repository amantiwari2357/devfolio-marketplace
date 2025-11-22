import { Router } from 'express';
import { ExpertController } from '../controllers/expert.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const expertController = new ExpertController();

// Public routes
router.get('/', expertController.getExperts);
router.get('/:id', expertController.getExpertProfile);
router.get('/:id/stats', expertController.getExpertStats);

// Protected routes
router.use(authenticate); // All routes below require authentication

// Expert management
router.put('/:id', authorize('admin', 'expert'), expertController.updateExpertProfile);
router.get('/:id/availability', expertController.getExpertAvailability);
router.patch('/:id/availability', authorize('admin', 'expert'), expertController.updateExpertAvailability);

export default router;
