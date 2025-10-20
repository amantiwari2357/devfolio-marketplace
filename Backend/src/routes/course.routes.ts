import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const courseController = new CourseController();

// Validation schemas
const courseValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid level'),
  body('category').notEmpty().withMessage('Category is required'),
  body('chapters').isArray().withMessage('Chapters must be an array'),
  body('chapters.*.title').notEmpty().withMessage('Chapter title is required'),
  body('chapters.*.description')
    .notEmpty()
    .withMessage('Chapter description is required'),
  body('chapters.*.videoUrl')
    .notEmpty()
    .withMessage('Chapter video URL is required'),
  body('chapters.*.duration')
    .isNumeric()
    .withMessage('Chapter duration must be a number'),
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

// Public routes
router.get('/', courseController.getAll);
router.get('/featured', courseController.getFeatured);
router.get('/search', courseController.search);
router.get('/:id', courseController.getById);
router.get('/instructor/:instructorId', courseController.getByInstructor);

// Protected routes
router.use(authenticate); // All routes below require authentication

// Course management
router.post(
  '/',
  authorize('admin', 'expert'),
  validate(courseValidation),
  courseController.create
);
router.put(
  '/:id',
  authorize('admin', 'expert'),
  validate(courseValidation),
  courseController.update
);
router.delete('/:id', authorize('admin', 'expert'), courseController.delete);

// Course status
router.patch(
  '/:id/status',
  authorize('admin', 'expert'),
  body('status')
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  courseController.updateStatus
);

// Reviews
router.post(
  '/:id/reviews',
  validate(reviewValidation),
  courseController.addReview
);

// Enrollment tracking
router.post('/:id/enrollments', courseController.incrementEnrollments);

export default router;
