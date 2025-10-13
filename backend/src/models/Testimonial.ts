const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 1000 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  authorName: { type: String, required: true, trim: true },
  authorTitle: { type: String, trim: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offeringId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offering' },
  isAnonymous: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
