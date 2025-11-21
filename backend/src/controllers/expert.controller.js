const Expert = require('../models/expert.model');
const ExpertEnquiry = require('../models/enquiry.model');
const { expertSchema, expertEnquirySchema, statusUpdateSchema } = require('../validators/expert.validator');

// Get all experts
const getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      experts
    });
  } catch (error) {
    console.error('Error fetching experts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experts',
      error: error.message
    });
  }
};

// Get expert by ID
const getExpertById = async (req, res) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found'
      });
    }

    res.status(200).json({
      success: true,
      expert
    });
  } catch (error) {
    console.error('Error fetching expert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expert',
      error: error.message
    });
  }
};

// Create new expert
const createExpert = async (req, res) => {
  try {
    // Validate input
    const { error, value } = expertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Check if email already exists
    const existingExpert = await Expert.findOne({ email: value.email });
    if (existingExpert) {
      return res.status(400).json({
        success: false,
        message: 'Expert with this email already exists'
      });
    }

    const expert = new Expert(value);
    await expert.save();

    res.status(201).json({
      success: true,
      message: 'Expert created successfully',
      expert
    });
  } catch (error) {
    console.error('Error creating expert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create expert',
      error: error.message
    });
  }
};

// Update expert
const updateExpert = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = expertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Check if email already exists (excluding current expert)
    const existingExpert = await Expert.findOne({ email: value.email, _id: { $ne: id } });
    if (existingExpert) {
      return res.status(400).json({
        success: false,
        message: 'Expert with this email already exists'
      });
    }

    const expert = await Expert.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true
    });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expert updated successfully',
      expert
    });
  } catch (error) {
    console.error('Error updating expert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update expert',
      error: error.message
    });
  }
};

// Delete expert
const deleteExpert = async (req, res) => {
  try {
    const { id } = req.params;

    const expert = await Expert.findByIdAndDelete(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expert deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting expert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete expert',
      error: error.message
    });
  }
};

// Get all expert enquiries
const getAllExpertEnquiries = async (req, res) => {
  try {
    const enquiries = await ExpertEnquiry.find({ source: 'expert-detail' })
      .populate('expertId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries
    });
  } catch (error) {
    console.error('Error fetching expert enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expert enquiries',
      error: error.message
    });
  }
};

// Create expert enquiry
const createExpertEnquiry = async (req, res) => {
  try {
    // Validate input
    const { error, value } = expertEnquirySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Check if expert exists
    const expert = await Expert.findById(value.expertId);
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found'
      });
    }

    const enquiry = new ExpertEnquiry({
      ...value,
      source: 'expert-detail',
      expertName: `${expert.firstName} ${expert.lastName}`
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Expert enquiry submitted successfully',
      enquiry
    });
  } catch (error) {
    console.error('Error creating expert enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit expert enquiry',
      error: error.message
    });
  }
};

// Update enquiry status
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = statusUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const enquiry = await ExpertEnquiry.findByIdAndUpdate(id, { status: value.status }, {
      new: true,
      runValidators: true
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      enquiry
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status',
      error: error.message
    });
  }
};

// Delete enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await ExpertEnquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: error.message
    });
  }
};

module.exports = {
  getAllExperts,
  getExpertById,
  createExpert,
  updateExpert,
  deleteExpert,
  getAllExpertEnquiries,
  createExpertEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
};
