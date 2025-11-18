const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validateAvailabilityUpdate,
  validateServicesUpdate,
  validateWhatsAppUpdate
} = require('../validators/user.validator');
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Public routes
router.post('/auth/signup', validateSignup, handleValidationErrors, userController.signup);
router.post('/auth/login', validateLogin, handleValidationErrors, userController.login);

// Protected routes
router.use(authMiddleware); // Apply auth middleware to all routes below

router.get('/profile', userController.getProfile);
router.put('/profile', validateProfileUpdate, handleValidationErrors, userController.updateProfile);
router.put('/availability', validateAvailabilityUpdate, handleValidationErrors, userController.updateAvailability);
router.put('/services', validateServicesUpdate, handleValidationErrors, userController.updateServices);
router.put('/whatsapp', validateWhatsAppUpdate, handleValidationErrors, userController.updateWhatsApp);

module.exports = router;
