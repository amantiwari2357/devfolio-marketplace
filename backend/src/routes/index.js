const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./user.routes');
const enquiryRoutes = require('./enquiry.routes');
const projectRoutes = require('./project.routes');
const availabilityRoutes = require('./availability.routes');
const testimonialRoutes = require('./testimonial.routes');
const expertRoutes = require('./expert.routes');

// Mount routes
router.use('/users', userRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/projects', projectRoutes);
router.use('/availabilities', availabilityRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/experts', expertRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = router;
