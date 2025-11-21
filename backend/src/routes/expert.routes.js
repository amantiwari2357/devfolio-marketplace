const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expert.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Expert routes
router.get('/all', authMiddleware, expertController.getAllExperts);
router.get('/:id', authMiddleware, expertController.getExpertById);
router.post('/', expertController.createExpert);
router.put('/:id', authMiddleware, expertController.updateExpert);
router.delete('/:id', authMiddleware, expertController.deleteExpert);

// Expert enquiry routes
router.get('/enquiries/all', authMiddleware, expertController.getAllExpertEnquiries);
router.post('/enquiries', expertController.createExpertEnquiry); // Public route for enquiries
router.put('/enquiries/:id/status', authMiddleware, expertController.updateEnquiryStatus);
router.delete('/enquiries/:id', authMiddleware, expertController.deleteEnquiry);

module.exports = router;
