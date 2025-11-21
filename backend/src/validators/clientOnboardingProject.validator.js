const { body } = require('express-validator');

// Project creation/update validation
const clientOnboardingProjectSchema = [
  body('clientName')
    .trim()
    .notEmpty()
    .withMessage('Client name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Client name must be between 2 and 100 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Invalid phone number format'),

  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('projectName')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Project name must be between 2 and 200 characters'),

  body('techStack')
    .trim()
    .notEmpty()
    .withMessage('Technology stack is required'),

  body('projectType')
    .trim()
    .notEmpty()
    .withMessage('Project type is required'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Valid start date is required'),

  body('deadline')
    .notEmpty()
    .withMessage('Deadline is required')
    .isISO8601()
    .withMessage('Valid deadline is required'),

  body('totalAmount')
    .isNumeric()
    .withMessage('Total amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be positive'),

  body('paidAmount')
    .optional()
    .isNumeric()
    .withMessage('Paid amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Paid amount must be positive'),

  body('teamMembers')
    .optional()
    .isArray()
    .withMessage('Team members must be an array'),

  body('teamMembers.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Team member name cannot be empty')
];

// Stage update validation
const updateStageSchema = [
  body('stageId')
    .isNumeric()
    .withMessage('Stage ID must be a number')
    .isInt({ min: 1, max: 10 })
    .withMessage('Stage ID must be between 1 and 10'),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'done'])
    .withMessage('Invalid status value'),

  body('paymentStatus')
    .optional()
    .isIn(['pending', 'partially-paid', 'paid'])
    .withMessage('Invalid payment status value'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),

  body('assignedMember')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Assigned member name cannot exceed 100 characters')
];

module.exports = {
  clientOnboardingProjectSchema,
  updateStageSchema
};
