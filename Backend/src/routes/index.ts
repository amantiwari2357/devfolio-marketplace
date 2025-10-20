import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import projectRoutes from './project.routes';
import courseRoutes from './course.routes';
import testimonialRoutes from './testimonial.routes';
import expertRoutes from './expert.routes';
import serviceRoutes from './service.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// User management routes
router.use('/users', userRoutes);

// Project routes
router.use('/projects', projectRoutes);

// Course routes
router.use('/courses', courseRoutes);

// Testimonial routes
router.use('/testimonials', testimonialRoutes);

// Expert routes
router.use('/experts', expertRoutes);

// Service routes
router.use('/services', serviceRoutes);

export default router;
