const Availability = require('../models/availability.model');
const { validationResult } = require('express-validator');

// ------------------------------------------------------------
// CREATE NEW BOOKING
// ------------------------------------------------------------
const createAvailability = async (req, res) => {
  try {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("VALIDATION ERRORS:", errors.array());   // ⭐ Debugging
      return res.status(400).json({
        success: false,
        message: 'Validation Failed',
        errors: errors.array()
      });
    }

    const { date, time, userName, userEmail, userPhone, serviceType, notes } = req.body;

    // Convert date properly
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    // Check if slot already exists (but allow cancelled ones)
    const existingBooking = await Availability.findOne({
      date: bookingDate,
      time: time,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create the booking
    const newBooking = new Availability({
      date: bookingDate,
      time,
      userName,
      userEmail,
      userPhone,
      serviceType: serviceType || 'Consultation',
      notes: notes || '',
      status: 'pending'
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      availability: newBooking
    });

  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// ------------------------------------------------------------
// GET ALL BOOKINGS
// ------------------------------------------------------------
const getAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await Availability.find()
      .sort({ date: 1, time: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      availabilities
    });

  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// ------------------------------------------------------------
// GET BOOKINGS BY DATE
// ------------------------------------------------------------
const getAvailabilityByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const start = new Date(date);
    const end = new Date(date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const availabilities = await Availability.find({
      date: { $gte: start, $lte: end }
    }).sort({ time: 1 });

    res.status(200).json({
      success: true,
      availabilities
    });

  } catch (error) {
    console.error('Error fetching availability by date:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// ------------------------------------------------------------
// UPDATE BOOKING STATUS
// ------------------------------------------------------------
const updateAvailabilityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ['pending', 'confirmed', 'cancelled'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const updated = await Availability.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Availability not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated',
      availability: updated
    });

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// ------------------------------------------------------------
// DELETE BOOKING
// ------------------------------------------------------------
const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Availability.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Availability not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Availability deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// ------------------------------------------------------------
module.exports = {
  createAvailability,
  getAllAvailabilities,
  getAvailabilityByDate,
  updateAvailabilityStatus,
  deleteAvailability
};
