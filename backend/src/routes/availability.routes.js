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

// Routes
router.post('/', validateAvailabilityBooking, createAvailability);
router.get('/', getAllAvailabilities);
router.get('/date/:date', getAvailabilityByDate);
router.put('/:id/status', updateAvailabilityStatus);
router.delete('/:id', deleteAvailability);

module.exports = router;
