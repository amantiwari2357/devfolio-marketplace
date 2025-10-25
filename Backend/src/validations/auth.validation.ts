import { body } from 'express-validator';

export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const updateProfileValidation = [
  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name cannot be empty'),
  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name cannot be empty'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

export const availabilityValidation = [
  body('availability')
    .isArray()
    .withMessage('Availability must be an array'),
  body('availability.*.day')
    .isString()
    .notEmpty()
    .withMessage('Day is required for each availability entry'),
  body('availability.*.enabled')
    .isBoolean()
    .withMessage('Enabled must be a boolean'),
  body('availability.*.startTime')
    .optional()
    .isString()
    .withMessage('Start time must be a string'),
  body('availability.*.endTime')
    .optional()
    .isString()
    .withMessage('End time must be a string'),
];

export const whatsappValidation = [
  body('whatsappNumber')
    .optional()
    .isString()
    .withMessage('WhatsApp number must be a string'),
];
