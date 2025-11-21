const Offer = require('../models/offer.model');
const AssignedOffer = require('../models/assignedOffer.model');
const { offerSchema, assignedOfferSchema, updateOfferStatusSchema } = require('../validators/offer.validator');
const { validationResult } = require('express-validator');

// Get all offers (public)
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, offers });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch offers' });
  }
};

// Create new offer (admin only)
const createOffer = async (req, res) => {
  try {
    const { error } = offerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const offer = new Offer(req.body);
    await offer.save();

    res.status(201).json({ success: true, message: 'Offer created successfully', offer });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ success: false, message: 'Failed to create offer' });
  }
};

// Update offer (admin only)
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = offerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const offer = await Offer.findByIdAndUpdate(id, req.body, { new: true });
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    res.json({ success: true, message: 'Offer updated successfully', offer });
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ success: false, message: 'Failed to update offer' });
  }
};

// Delete offer (admin only)
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByIdAndDelete(id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    res.json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ success: false, message: 'Failed to delete offer' });
  }
};

// Assign offer to client (admin only)
const assignOffer = async (req, res) => {
  try {
    const { error } = assignedOfferSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { offerId, clientId, clientName, notes } = req.body;

    // Check if offer exists
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    // Calculate expiry date
    const assignedDate = new Date();
    const expiryDate = new Date(assignedDate);
    expiryDate.setDate(expiryDate.getDate() + offer.validityDays);

    const assignedOffer = new AssignedOffer({
      offerId,
      offer,
      clientId,
      clientName,
      status: 'assigned',
      assignedDate: assignedDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      notes
    });

    await assignedOffer.save();

    res.status(201).json({ success: true, message: 'Offer assigned successfully', assignedOffer });
  } catch (error) {
    console.error('Error assigning offer:', error);
    res.status(500).json({ success: false, message: 'Failed to assign offer' });
  }
};

// Get user's assigned offers
const getUserAssignedOffers = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const assignedOffers = await AssignedOffer.find({ clientId: userId })
      .populate('offer')
      .sort({ assignedDate: -1 });

    res.json({ success: true, assignedOffers });
  } catch (error) {
    console.error('Error fetching assigned offers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch assigned offers' });
  }
};

// Claim offer (user action)
const claimOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const userId = req.user.id;

    const assignedOffer = await AssignedOffer.findOne({
      _id: offerId,
      clientId: userId,
      status: 'assigned'
    });

    if (!assignedOffer) {
      return res.status(404).json({ success: false, message: 'Assigned offer not found or already claimed' });
    }

    assignedOffer.status = 'active';
    assignedOffer.claimedDate = new Date().toISOString();
    await assignedOffer.save();

    res.json({ success: true, message: 'Offer claimed successfully', assignedOffer });
  } catch (error) {
    console.error('Error claiming offer:', error);
    res.status(500).json({ success: false, message: 'Failed to claim offer' });
  }
};

// Update offer status (admin only)
const updateOfferStatus = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { error } = updateOfferStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { status, notes } = req.body;

    const assignedOffer = await AssignedOffer.findById(offerId);
    if (!assignedOffer) {
      return res.status(404).json({ success: false, message: 'Assigned offer not found' });
    }

    assignedOffer.status = status;
    assignedOffer.notes = notes;

    // Set appropriate date based on status
    if (status === 'used') {
      assignedOffer.usedDate = new Date().toISOString();
    } else if (status === 'converted') {
      assignedOffer.convertedDate = new Date().toISOString();
    }

    await assignedOffer.save();

    res.json({ success: true, message: 'Offer status updated successfully', assignedOffer });
  } catch (error) {
    console.error('Error updating offer status:', error);
    res.status(500).json({ success: false, message: 'Failed to update offer status' });
  }
};

module.exports = {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  assignOffer,
  getUserAssignedOffers,
  claimOffer,
  updateOfferStatus
};
