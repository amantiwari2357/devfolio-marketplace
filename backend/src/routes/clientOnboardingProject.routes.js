const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStage
} = require('../controllers/clientOnboardingProject.controller');

const {
  clientOnboardingProjectSchema,
  updateStageSchema
} = require('../validators/clientOnboardingProject.validator');

// All routes require authentication
router.use(authMiddleware);

// Get all projects for the authenticated user
router.get('/', getAllProjects);

// Get specific project by ID
router.get('/:id', getProjectById);

// Create new project
router.post('/', clientOnboardingProjectSchema, createProject);

// Update project
router.put('/:id', clientOnboardingProjectSchema, updateProject);

// Delete project
router.delete('/:id', deleteProject);

// Update project stage
router.patch('/:id/stage', updateStageSchema, updateProjectStage);

module.exports = router;
