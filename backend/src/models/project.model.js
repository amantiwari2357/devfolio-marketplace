const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  pricing: {
    type: String,
    enum: ['Free', 'Freemium', 'Paid'],
    default: 'Paid'
  },
  features: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  timeline: {
    type: String,
    trim: true
  },
  priceRange: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
