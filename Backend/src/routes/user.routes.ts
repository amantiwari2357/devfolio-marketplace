import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// Public (if any) - keep minimal; users listing typically admin-only

// Protected routes
router.use(authenticate);

// Admin-only user management
router.get('/', authorize('admin'), userController.getAll);
router.get('/stats', authorize('admin'), userController.getStats);
router.get('/experts', authorize('admin'), userController.getExperts);
router.get('/:id', authorize('admin'), userController.getById);
router.put('/:id', authorize('admin'), userController.update);
router.delete('/:id', authorize('admin'), userController.delete);
router.patch('/:id/role', authorize('admin'), userController.updateRole);

export default router;
