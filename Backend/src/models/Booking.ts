import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  expertId: mongoose.Types.ObjectId;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    expertId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 15,
      max: 480, // 8 hours max
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ expertId: 1, createdAt: -1 });
bookingSchema.index({ serviceId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDate: 1 });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
