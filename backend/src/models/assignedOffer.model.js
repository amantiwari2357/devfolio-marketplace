const mongoose = require('mongoose');

const assignedOfferSchema = new mongoose.Schema({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  },
  offer: {
    type: Object,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['assigned', 'active', 'used', 'expired', 'converted'],
    default: 'assigned'
  },
  assignedDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  claimedDate: {
    type: String
  },
  usedDate: {
    type: String
  },
  convertedDate: {
    type: String
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
assignedOfferSchema.index({ clientId: 1 });
assignedOfferSchema.index({ offerId: 1 });
assignedOfferSchema.index({ status: 1 });
assignedOfferSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AssignedOffer', assignedOfferSchema);
