const express = require('express');
const router = express.Router();

const {
  createAvailability,
  getAllAvailabilities,
  getAvailabilityByDate,
  updateAvailabilityStatus,
  deleteAvailability
} = require('../controllers/availability.controller');

const { validateAvailabilityBooking } = require('../validators/availability.validator');

// ============================
// Availability Routes
// ============================

// Create Availability
router.post('/', validateAvailabilityBooking, createAvailability);

// Get All Availabilities
router.get('/', getAllAvailabilities);

// Get Availability by Date (YYYY-MM-DD format)
router.get('/date/:date', getAvailabilityByDate);

// Update Status (Available / Booked)
router.put('/:id/status', updateAvailabilityStatus);

// Delete Availability Slot
router.delete('/:id', deleteAvailability);

module.exports = router;
