import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// Public routes
router.get('/experts', userController.getExperts);
router.get('/stats', authenticate, authorize('admin'), userController.getStats);

// Protected routes
router.use(authenticate); // All routes below require authentication

// User management
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', authorize('admin'), userController.delete);
router.patch('/:id/role', authorize('admin'), userController.updateRole);

export default router;
