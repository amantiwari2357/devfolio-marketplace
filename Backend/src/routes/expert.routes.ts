import { Router } from 'express';
import { ExpertController } from '../controllers/expert.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const expertController = new ExpertController();

// Public expert discovery
router.get('/', expertController.getExperts);
router.get('/:id', expertController.getExpertProfile);
router.get('/:id/availability', expertController.getExpertAvailability);
router.get('/:id/stats', expertController.getExpertStats);

// Protected expert self-management
router.use(authenticate);
router.put('/:id', authorize('expert', 'admin'), expertController.updateExpertProfile);
router.put('/:id/availability', authorize('expert', 'admin'), expertController.updateExpertAvailability);

export default router;
