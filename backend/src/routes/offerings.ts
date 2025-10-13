const express = require('express');
const Offering = require('../models/Offering');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all offerings
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { type } = req.query;
    
    let filter: any = { isActive: true };
    if (type && type !== 'All') {
      filter.type = type;
    }

    const offerings = await Offering.find(filter)
      .populate('userId', 'firstName lastName profileImage')
      .sort({ popular: -1, createdAt: -1 });

    res.json(offerings);
  } catch (error) {
    console.error('Get offerings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get offering by ID
router.get('/:id', async (req, res) => {
  try {
    const offering = await Offering.findById(req.params.id)
      .populate('userId', 'firstName lastName profileImage bio socialLinks');

    if (!offering) {
      return res.status(404).json({ message: 'Offering not found' });
    }

    res.json(offering);
  } catch (error) {
    console.error('Get offering error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
