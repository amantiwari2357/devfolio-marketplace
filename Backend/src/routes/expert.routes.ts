import { Router } from 'express';
import { ExpertController } from '../controllers/expert.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const expertController = new ExpertController();

// Validation schemas
const expertValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('bio')
    .notEmpty()
    .withMessage('Bio is required'),
  body('skills')
    .isArray()
    .withMessage('Skills must be an array'),
  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),
  body('availability.status')
    .isIn(['available', 'busy', 'unavailable'])
    .withMessage('Invalid availability status'),
  body('availability.nextAvailableDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
];

// Public expert discovery
router.get('/', expertController.getExperts);
router.get('/:id', expertController.getExpertProfile);
router.get('/:id/availability', expertController.getExpertAvailability);
router.get('/:id/stats', expertController.getExpertStats);
router.get('/stats', authenticate, authorize('admin'), expertController.getExpertsStats);

// Protected expert self-management
router.use(authenticate);
router.post('/', authorize('admin'), validate(expertValidation), expertController.createExpert);
router.put('/:id', authorize('expert', 'admin'), validate(expertValidation), expertController.updateExpertProfile);
router.put('/:id/availability', authorize('expert', 'admin'), expertController.updateExpertAvailability);

export default router;
