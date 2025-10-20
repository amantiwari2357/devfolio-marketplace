import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  provider: mongoose.Types.ObjectId;
  category: string;
  price: {
    amount: number;
    currency: string;
    billingCycle?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'project';
  };
  features: string[];
  deliverables: string[];
  timeline: string;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailableDate?: Date;
  };
  requirements: string[];
  status: 'active' | 'inactive' | 'archived';
  rating: number;
  reviews: Array<{
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        default: 'USD',
      },
      billingCycle: {
        type: String,
        enum: ['hourly', 'daily', 'weekly', 'monthly', 'project'],
      },
    },
    features: [{
      type: String,
      required: true,
    }],
    deliverables: [{
      type: String,
      required: true,
    }],
    timeline: {
      type: String,
      required: true,
    },
    availability: {
      status: {
        type: String,
        enum: ['available', 'busy', 'unavailable'],
        default: 'available',
      },
      nextAvailableDate: {
        type: Date,
      },
    },
    requirements: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
serviceSchema.index({ title: 'text', description: 'text' });
serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ provider: 1 });
serviceSchema.index({ 'price.amount': 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
