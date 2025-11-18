const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Allowed origins list
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  process.env.CORS_ORIGIN
].filter(Boolean); // remove undefined/null values

// CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
