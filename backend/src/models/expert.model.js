const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  bio: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  connections: {
    type: Number,
    default: 0,
    min: 0
  },
  experience: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
expertSchema.index({ email: 1 });
expertSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model('Expert', expertSchema);
