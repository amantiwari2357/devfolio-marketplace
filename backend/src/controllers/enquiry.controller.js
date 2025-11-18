const Enquiry = require('../models/enquiry.model');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

const enquiryController = {
  // Create a new enquiry
  createEnquiry: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { name, email, phone, message } = req.body;
      const userId = req.user ? req.user.userId : null; // Optional user ID

      // If userId is provided, verify user exists
      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
      }

      // Create enquiry
      const enquiry = new Enquiry({
        name,
        email,
        phone,
        message,
        userId
      });

      await enquiry.save();

      res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully',
        enquiry: {
          id: enquiry._id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          message: enquiry.message,
          status: enquiry.status,
          createdAt: enquiry.createdAt
        }
      });

    } catch (error) {
      console.error('Error creating enquiry:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get all enquiries (admin only)
  getAllEnquiries: async (req, res) => {
    try {
      const enquiries = await Enquiry.find()
        .populate('userId', 'username email')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        enquiries
      });

    } catch (error) {
      console.error('Error fetching enquiries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get enquiries for logged-in user
  getUserEnquiries: async (req, res) => {
    try {
      const userId = req.user.userId;

      const enquiries = await Enquiry.find({ userId })
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        enquiries
      });

    } catch (error) {
      console.error('Error fetching user enquiries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update enquiry status (admin only)
  updateEnquiryStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
      }

      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate('userId', 'username email');

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found'
        });
      }

      res.json({
        success: true,
        message: 'Enquiry status updated successfully',
        enquiry
      });

    } catch (error) {
      console.error('Error updating enquiry status:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = enquiryController;
