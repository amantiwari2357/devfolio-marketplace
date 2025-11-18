const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./user.routes');

// Mount routes
router.use('/users', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = router;
