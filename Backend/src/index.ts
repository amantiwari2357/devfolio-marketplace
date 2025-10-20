import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { join } from 'path';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const API_BASE = process.env.API_BASE || '/api';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost:5173';
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/devfolio';

console.log('Env loaded:', {
  PORT: process.env.PORT,
  API_BASE: process.env.API_BASE,
  CLIENT_URL: process.env.CLIENT_URL,
  ADMIN_URL: process.env.ADMIN_URL,
  HAS_MONGO_URI: Boolean(process.env.MONGO_URI),
  HAS_MONGODB_URI: Boolean(process.env.MONGODB_URI),
});

// Middleware
app.use(
  cors({
    origin: [CLIENT_URL, ADMIN_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_BASE, routes);

// Error handling
app.use(errorHandler);

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
