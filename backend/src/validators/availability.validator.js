const { body } = require('express-validator');

const validateAvailabilityBooking = [
  body('date')
    .isISO8601({ strict: true })
    .withMessage('Please provide a valid date'),

  body('time')
    .isString()
    .notEmpty()
    .withMessage('Time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
    .withMessage('Please provide a valid time in HH:MM AM/PM format'),

  body('userName')
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('userEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('userPhone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('serviceType')
    .optional()
    .isString()
    .isIn([
      'Consultation',
      'Custom Website Development',
      'Full Stack Application Development',
      'UI/UX Design & Prototyping',
      'Maintenance & Optimization',
      'Branding & Digital Presence'
    ])
    .withMessage('Invalid service type'),

  body('notes')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

module.exports = {
  validateAvailabilityBooking
};
