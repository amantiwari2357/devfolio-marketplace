const { body } = require('express-validator');

const createProjectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),

  body('icon')
    .trim()
    .notEmpty()
    .withMessage('Icon is required'),

  body('pricing')
    .optional()
    .isIn(['Free', 'Freemium', 'Paid'])
    .withMessage('Pricing must be Free, Freemium, or Paid'),

  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),

  body('features.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Each feature must be between 1 and 200 characters'),

  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),

  body('technologies.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each technology must be between 1 and 50 characters'),

  body('timeline')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Timeline must be between 1 and 50 characters'),

  body('priceRange')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Price range must be between 1 and 50 characters'),

  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Live URL must be a valid URL')
];

const updateProjectValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),

  body('icon')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Icon cannot be empty'),

  body('pricing')
    .optional()
    .isIn(['Free', 'Freemium', 'Paid'])
    .withMessage('Pricing must be Free, Freemium, or Paid'),

  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),

  body('features.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Each feature must be between 1 and 200 characters'),

  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),

  body('technologies.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each technology must be between 1 and 50 characters'),

  body('timeline')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Timeline must be between 1 and 50 characters'),

  body('priceRange')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Price range must be between 1 and 50 characters'),

  body('liveUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Live URL must be a valid URL')
];

module.exports = {
  createProjectValidation,
  updateProjectValidation
};
