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

// Public routes
router.post('/signup', validateSignup, userController.signup);
router.post('/login', validateLogin, userController.login);

// Admin routes (no auth required for admin dashboard)
router.get('/all', userController.getAllUsers);
router.post('/create-admin', userController.createAdmin);

// Protected routes
router.use(authMiddleware); // All routes below require authentication

router.get('/profile', userController.getProfile);
router.put('/profile', validateProfileUpdate, userController.updateProfile);
router.put('/availability', validateAvailabilityUpdate, userController.updateAvailability);
router.put('/services', validateServicesUpdate, userController.updateServices);
router.put('/whatsapp', validateWhatsAppUpdate, userController.updateWhatsApp);

// Onboarding request routes used by frontend profile page
router.get('/onboarding-status', userController.getOnboardingStatus);
router.post('/onboarding-request', userController.submitOnboardingRequest);

module.exports = router;
