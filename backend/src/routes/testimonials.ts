const express = require('express');
const Testimonial = require('../models/Testimonial');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all testimonials
router.get('/', optionalAuth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isVerified: true })
      .populate('userId', 'firstName lastName profileImage')
      .populate('offeringId', 'title')
      .sort({ createdAt: -1 });

    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get testimonials for specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      userId: req.params.userId,
      isVerified: true 
    })
      .populate('offeringId', 'title')
      .sort({ createdAt: -1 });

    res.json(testimonials);
  } catch (error) {
    console.error('Get user testimonials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const { text, rating, authorName, authorTitle, userId, offeringId, isAnonymous } = req.body;

    if (!text || !rating || !authorName || !userId) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const testimonial = new Testimonial({
      text,
      rating,
      authorName: isAnonymous ? 'Anonymous' : authorName,
      authorTitle: isAnonymous ? undefined : authorTitle,
      userId,
      offeringId,
      isAnonymous: !!isAnonymous,
      isVerified: false // Requires admin approval
    });

    await testimonial.save();

    res.status(201).json({
      message: 'Testimonial submitted for review',
      testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
