const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/all', offerController.getAllOffers);

// Protected routes (require authentication)
router.use(authMiddleware);

// Offer CRUD
router.post('/', offerController.createOffer);
router.put('/:id', offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

// Offer assignment and management
router.post('/assign', offerController.assignOffer);
router.get('/assigned', offerController.getUserAssignedOffers);
router.put('/:offerId/claim', offerController.claimOffer);
router.put('/:offerId/status', offerController.updateOfferStatus);

module.exports = router;
