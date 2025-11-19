const { body } = require('express-validator');

// Create testimonial validation
const validateCreateTestimonial = [
  body('quote')
    .notEmpty()
    .withMessage('Quote is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Quote must be between 10 and 500 characters'),
  body('author')
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters')
];

// Update testimonial validation
const validateUpdateTestimonial = [
  body('quote')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Quote must be between 10 and 500 characters'),
  body('author')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('role')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

module.exports = {
  validateCreateTestimonial,
  validateUpdateTestimonial
};
