const Template = require('../models/template.model');

// Get all active templates (public)
const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ templates });
  } catch (error) {
    console.error('Get all templates error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all templates (admin)
const getAllTemplatesAdmin = async (req, res) => {
  try {
    const templates = await Template.find({}).sort({ createdAt: -1 });
    res.json({ templates });
  } catch (error) {
    console.error('Get all templates admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create template
const createTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      technologies,
      rating,
      downloads,
      isActive,
      pdfUrl,
      pdfName,
    } = req.body;

    const template = new Template({
      name,
      description,
      technologies,
      rating,
      downloads,
      isActive,
      pdfUrl,
      pdfName,
    });

    await template.save();

    res.status(201).json({
      message: 'Template created successfully',
      template,
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const template = await Template.findByIdAndUpdate(id, updates, { new: true });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({
      message: 'Template updated successfully',
      template,
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete template
const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle template status
const toggleTemplateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    template.isActive = !template.isActive;
    await template.save();

    res.json({
      message: 'Template status toggled successfully',
      template,
    });
  } catch (error) {
    console.error('Toggle template status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTemplates,
  getAllTemplatesAdmin,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleTemplateStatus,
};
