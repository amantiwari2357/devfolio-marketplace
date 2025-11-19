const Testimonial = require('../models/testimonial.model');

// Get all active testimonials (public)
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (error) {
    console.error('Get all testimonials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all testimonials (admin)
const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (error) {
    console.error('Get all testimonials admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create testimonial
const createTestimonial = async (req, res) => {
  try {
    const { quote, author, role } = req.body;

    const testimonial = new Testimonial({
      quote,
      author,
      role
    });

    await testimonial.save();

    res.status(201).json({
      message: 'Testimonial created successfully',
      testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(id, updates, { new: true });

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({
      message: 'Testimonial updated successfully',
      testimonial
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle testimonial status
const toggleTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();

    res.json({
      message: 'Testimonial status toggled successfully',
      testimonial
    });
  } catch (error) {
    console.error('Toggle testimonial status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus
};
