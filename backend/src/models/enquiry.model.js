const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',
    required: false
  },
  expertName: {
    type: String,
    required: false
  },
  source: {
    type: String,
    enum: ['hero-section', 'contact-form', 'landing-page', 'project-detail', 'expert-detail', 'other'],
    default: 'hero-section'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  followUps: [{
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['called', 'emailed', 'meeting', 'note'],
      default: 'note'
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
enquirySchema.index({ email: 1 });
enquirySchema.index({ userId: 1 });
enquirySchema.index({ expertId: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
