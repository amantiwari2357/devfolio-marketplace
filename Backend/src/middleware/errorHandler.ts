import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

interface ErrorWithStatus extends Error {
  status?: number;
  code?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // MongoDB duplicate key error
  if (err instanceof MongoError && err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      error: 'A record with this value already exists',
    });
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // JWT authentication error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      error: err.message,
    });
  }

  // JWT token expired error
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
      error: err.message,
    });
  }

  // Default error
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
