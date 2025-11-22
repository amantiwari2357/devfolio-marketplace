import { Router } from 'express';
import { ClientOnboardingController } from '../controllers/clientOnboarding.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const clientOnboardingController = new ClientOnboardingController();

// Validation schemas
const clientOnboardingValidation = [
  body('clientName').notEmpty().withMessage('Client name is required'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('techStack').notEmpty().withMessage('Tech stack is required'),
  body('projectType').notEmpty().withMessage('Project type is required'),
  body('startDate')
    .optional()
    .custom((value) => {
      if (value && !new Date(value).getTime()) {
        throw new Error('Start date must be a valid date');
      }
      return true;
    }),
  body('deadline')
    .optional()
    .custom((value) => {
      if (value && !new Date(value).getTime()) {
        throw new Error('Deadline must be a valid date');
      }
      return true;
    }),
  body('totalAmount')
    .optional()
    .isNumeric()
    .withMessage('Total amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be positive'),
  body('stages').optional().isArray().withMessage('Stages must be an array'),
  body('teamMembers').optional().isArray().withMessage('Team members must be an array'),
];

// All routes require authentication
router.use(authenticate);

// Client onboarding routes
router.get('/', clientOnboardingController.getAll);
router.get('/stats', authorize('admin'), clientOnboardingController.getStats);
router.get('/:id', clientOnboardingController.getById);
router.post(
  '/',
  validate(clientOnboardingValidation),
  clientOnboardingController.create
);
router.put(
  '/:id',
  validate(clientOnboardingValidation),
  clientOnboardingController.update
);
router.delete('/:id', authorize('admin'), clientOnboardingController.delete);

// Stage management
router.patch(
  '/:id/stage',
  body('stageIndex').isInt().withMessage('Stage index must be an integer'),
  body('status')
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
  clientOnboardingController.updateStageStatus
);

// Payment management
router.patch(
  '/:id/payment',
  body('paidAmount')
    .isNumeric()
    .withMessage('Paid amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Paid amount must be positive'),
  clientOnboardingController.updatePayment
);

export default router;
