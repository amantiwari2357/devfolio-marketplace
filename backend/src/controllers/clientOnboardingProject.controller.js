const ClientOnboardingProject = require('../models/clientOnboardingProject.model');
const { clientOnboardingProjectSchema, updateStageSchema } = require('../validators/clientOnboardingProject.validator');
const { validationResult } = require('express-validator');

// Default stages template
const defaultStages = [
  { id: 1, name: "Requirement Gathering + Contract", output: "Documents, Payment Part-1", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 2, name: "Branding & Wireframe", output: "Logo, Colors, Sitemap", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 3, name: "UI/UX Design", output: "Figma, Approval Status", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 4, name: "Frontend Development", output: "Web Pages, Components", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 5, name: "Backend Development", output: "Database, APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 6, name: "Integrations", output: "Payment, Auth, CRM, Third-Party APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 7, name: "Content Upload", output: "Images, Text Content", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 8, name: "Testing & QA", output: "Bugs List, Reports", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 9, name: "Deployment & Hosting", output: "Domain, SSL, Server", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 10, name: "Final Delivery & Training", output: "Documentation, Credentials, Warranty", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
];

// Get all client onboarding projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await ClientOnboardingProject.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ClientOnboardingProject.findOne({
      _id: id,
      createdBy: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const projectData = {
      ...req.body,
      createdBy: req.user.id,
      stages: defaultStages.map(stage => ({
        ...stage,
        payment: Math.round(req.body.totalAmount / 10)
      }))
    };

    const project = new ClientOnboardingProject(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    const project = await ClientOnboardingProject.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ClientOnboardingProject.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

// Update project stage
const updateProjectStage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { stageId, status, paymentStatus, notes, assignedMember } = req.body;

    const project = await ClientOnboardingProject.findOne({
      _id: id,
      createdBy: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const stageIndex = project.stages.findIndex(stage => stage.id === stageId);
    if (stageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Stage not found'
      });
    }

    // Update stage fields
    if (status) {
      project.stages[stageIndex].status = status;
      if (status === 'done') {
        project.stages[stageIndex].completionDate = new Date().toISOString().split('T')[0];
      }
    }

    if (paymentStatus) {
      project.stages[stageIndex].paymentStatus = paymentStatus;
    }

    if (notes !== undefined) {
      project.stages[stageIndex].notes = notes;
    }

    if (assignedMember !== undefined) {
      project.stages[stageIndex].assignedMember = assignedMember;
    }

    await project.save();

    // Emit real-time update via Socket.IO
    if (global.io) {
      global.io.to(`project_${project._id}`).emit('projectUpdated', project);
      global.io.emit('projectUpdated', project); // Also emit to all clients as fallback
    }

    res.json({
      success: true,
      message: 'Stage updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating stage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stage'
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStage
};
