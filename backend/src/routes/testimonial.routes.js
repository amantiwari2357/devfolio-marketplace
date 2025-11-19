const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const {
  validateCreateTestimonial,
  validateUpdateTestimonial
} = require('../validators/testimonial.validator');

// Public routes
router.get('/', testimonialController.getAllTestimonials);

// Admin routes (no auth required for admin dashboard)
router.get('/admin', testimonialController.getAllTestimonialsAdmin);
router.post('/', validateCreateTestimonial, testimonialController.createTestimonial);
router.put('/:id', validateUpdateTestimonial, testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);
router.patch('/:id/toggle', testimonialController.toggleTestimonialStatus);

module.exports = router;
