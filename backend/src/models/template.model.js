const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: {
    type: [String],
    required: true,
    default: []
  },
  rating: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: String,
    default: '0',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pdfUrl: {
    type: String,
  },
  pdfName: {
    type: String,
  },
}, {
  timestamps: true,
});

// Indexes for performance
templateSchema.index({ isActive: 1 });
templateSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Template', templateSchema);
