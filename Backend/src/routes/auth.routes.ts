import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  availabilityValidation,
} from '../validations/auth.validation';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put(
  '/profile',
  authenticate,
  validate(updateProfileValidation),
  authController.updateProfile
);
router.post(
  '/change-password',
  authenticate,
  validate(changePasswordValidation),
  authController.changePassword
);
router.put(
  '/availability',
  authenticate,
  validate(availabilityValidation),
  authController.updateAvailability
);

export default router;
