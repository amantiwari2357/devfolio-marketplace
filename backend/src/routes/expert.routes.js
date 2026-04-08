const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expert.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Expert enquiry routes (must be BEFORE /:id to avoid matching 'enquiries' as ID)
router.get('/enquiries/all', authMiddleware, expertController.getAllExpertEnquiries);
router.post('/enquiries', expertController.createExpertEnquiry); // Public route for enquiries
router.put('/enquiries/:id/status', authMiddleware, expertController.updateEnquiryStatus);
router.delete('/enquiries/:id', authMiddleware, expertController.deleteEnquiry);

// Expert routes
router.get('/all', expertController.getAllExperts);
router.post('/', expertController.createExpert);
router.put('/:id', authMiddleware, expertController.updateExpert);
router.delete('/:id', authMiddleware, expertController.deleteExpert);
router.get('/:id', authMiddleware, expertController.getExpertById);

module.exports = router;
