const Availability = require('../models/availability.model');
const { validationResult } = require('express-validator');

// Create a new availability booking
const createAvailability = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { date, time, userName, userEmail, userPhone, serviceType, notes } = req.body;

    // Check if the slot is already booked
    const existingBooking = await Availability.findOne({
      date: new Date(date),
      time: time,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const availability = new Availability({
      date: new Date(date),
      time,
      userName,
      userEmail,
      userPhone,
      serviceType: serviceType || 'Consultation',
      notes: notes || ''
    });

    await availability.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      availability
    });
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all availability bookings
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
      message: 'Internal server error'
    });
  }
};

// Get availability by date
const getAvailabilityByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const availabilities = await Availability.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).sort({ time: 1 });

    res.status(200).json({
      success: true,
      availabilities
    });
  } catch (error) {
    console.error('Error fetching availabilities by date:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update availability status
const updateAvailabilityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const availability = await Availability.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: 'Availability not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      availability
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete availability
const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await Availability.findByIdAndDelete(id);

    if (!availability) {
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
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createAvailability,
  getAllAvailabilities,
  getAvailabilityByDate,
  updateAvailabilityStatus,
  deleteAvailability
};
