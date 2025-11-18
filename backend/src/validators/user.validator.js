const { body } = require('express-validator');

// Signup validation
const validateSignup = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile update validation
const validateProfileUpdate = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  body('country')
    .notEmpty()
    .withMessage('Country is required'),
  body('currency')
    .notEmpty()
    .withMessage('Currency is required'),
  body('expertise')
    .isArray({ min: 1 })
    .withMessage('At least one expertise is required')
];

// Availability update validation
const validateAvailabilityUpdate = [
  body('availability')
    .isArray()
    .withMessage('Availability must be an array'),
  body('availability.*.day')
    .isIn(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .withMessage('Invalid day'),
  body('availability.*.enabled')
    .isBoolean()
    .withMessage('Enabled must be a boolean'),
  body('availability.*.startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
    .withMessage('Invalid time format'),
  body('availability.*.endTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
    .withMessage('Invalid time format')
];

// Services update validation
const validateServicesUpdate = [
  body('services')
    .isArray()
    .withMessage('Services must be an array'),
  body('services.*.name')
    .notEmpty()
    .withMessage('Service name is required'),
  body('services.*.description')
    .notEmpty()
    .withMessage('Service description is required')
];

// WhatsApp update validation
const validateWhatsAppUpdate = [
  body('whatsappNumber')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('WhatsApp number must be 10 digits')
];

module.exports = {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validateAvailabilityUpdate,
  validateServicesUpdate,
  validateWhatsAppUpdate
};
