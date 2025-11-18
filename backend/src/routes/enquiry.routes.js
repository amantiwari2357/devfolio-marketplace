const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');
const enquiryValidators = require('../validators/enquiry.validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Create enquiry (optional authentication)
router.post(
  '/',
  enquiryValidators.createEnquiry,
  enquiryController.createEnquiry
);

// Get all enquiries (admin only - you might want to add admin middleware)
router.get('/all', enquiryController.getAllEnquiries);

// Get user's own enquiries
router.get('/my', authMiddleware, enquiryController.getUserEnquiries);

// Update enquiry status (admin only)
router.put('/:id/status', enquiryController.updateEnquiryStatus);

// Add follow-up to enquiry
router.post('/:id/followup', enquiryController.addFollowUp);

module.exports = router;
