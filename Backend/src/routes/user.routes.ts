import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const userController = new UserController();

// Validation schemas
const userValidation = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('role')
    .isIn(['admin', 'user', 'expert'])
    .withMessage('Invalid role'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),
  body('availability')
    .optional()
    .isObject()
    .withMessage('Availability must be an object'),
  body('availability.status')
    .optional()
    .isIn(['available', 'busy', 'unavailable'])
    .withMessage('Status must be available, busy, or unavailable'),
  body('availability.nextAvailableDate')
    .optional()
    .isString()
    .withMessage('Next available date must be a string'),
];

// Public (if any) - keep minimal; users listing typically admin-only

// Protected routes
router.use(authenticate);

// Admin-only user management
router.post('/', authorize('admin'), validate(userValidation), userController.create);
router.get('/', authorize('admin'), userController.getAll);
router.get('/stats', authorize('admin'), userController.getStats);
router.get('/experts', authorize('admin'), userController.getExperts);
router.get('/:id', authorize('admin'), userController.getById);
router.put('/:id', authorize('admin'), validate(userValidation), userController.update);
router.delete('/:id', authorize('admin'), userController.delete);
router.patch('/:id/role', authorize('admin'), userController.updateRole);

export default router;
