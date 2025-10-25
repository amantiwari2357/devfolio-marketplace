import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const projectController = new ProjectController();

// Validation schemas
const projectValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('technologies').isString().withMessage('Technologies must be a string'),
  body('features').isString().withMessage('Features must be a string'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

// Public routes
router.get('/', projectController.getAll);
router.get('/featured', projectController.getFeatured);
router.get('/search', projectController.search);
router.get('/:id', projectController.getById);
router.get('/author/:authorId', projectController.getByAuthor);

// Protected routes
router.use(authenticate); // All routes below require authentication

// Project management
router.post('/', validate(projectValidation), projectController.create);
router.put('/:id', validate(projectValidation), projectController.update);
router.delete('/:id', projectController.delete);

// Project status (admin only)
router.patch(
  '/:id/status',
  authorize('admin'),
  body('status')
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  projectController.updateStatus
);

// Reviews
router.post(
  '/:id/reviews',
  validate(reviewValidation),
  projectController.addReview
);

// Download tracking
router.post('/:id/downloads', projectController.incrementDownloads);

export default router;
