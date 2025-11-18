const { body } = require('express-validator');

const enquiryValidators = {
  createEnquiry: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),

    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),

    body('phone')
      .trim()
      .isLength({ min: 10, max: 15 })
      .withMessage('Phone number must be between 10 and 15 characters')
      .matches(/^[\+]?[1-9][\d]{0,14}$/)
      .withMessage('Please provide a valid phone number'),

    body('message')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
  ]
};

module.exports = enquiryValidators;
