const { body } = require('express-validator');

// Project creation/update validation - All fields are optional
const clientOnboardingProjectSchema = [
  body('clientName').optional().trim(),
  body('email').optional().trim().normalizeEmail(),
  body('phone').optional().trim(),
  body('companyName').optional().trim(),
  body('projectName').optional().trim(),
  body('techStack').optional().trim(),
  body('projectType').optional().trim(),
  body('startDate').optional().trim(),
  body('deadline').optional().trim(),
  body('totalAmount').optional().trim(),
  body('paidAmount').optional().trim(),
  body('teamMembers').optional(),
  body('projectDescription').optional().trim(),
  body('requirements').optional().trim(),
  body('timeline').optional().trim(),
  body('budget').optional().trim()
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
