const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');

// Public routes
router.get('/', templateController.getAllTemplates);

// Admin routes (no auth required for admin dashboard)
router.get('/admin', templateController.getAllTemplatesAdmin);
router.post('/', templateController.createTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);
router.patch('/:id/toggle', templateController.toggleTemplateStatus);

module.exports = router;
