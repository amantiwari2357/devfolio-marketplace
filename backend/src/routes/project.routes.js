const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { createProjectValidation, updateProjectValidation } = require('../validators/project.validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all projects (public - for frontend)
router.get('/all', projectController.getAllProjects);

// Get current user's projects (protected)
router.get('/my', authMiddleware, projectController.getUserProjects);

// Get project by ID (public - for frontend)
router.get('/:id', projectController.getProjectById);

// Protected routes (admin only) - temporarily removing auth for testing
router.post('/', createProjectValidation, projectController.createProject);
router.put('/:id', authMiddleware, updateProjectValidation, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
