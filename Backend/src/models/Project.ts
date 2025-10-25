import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  author: mongoose.Types.ObjectId;
  price: number;
  status: 'draft' | 'published' | 'archived';
  downloads: number;
  rating: number;
  timeline?: string;
  priceRange?: string;
  reviews: Array<{
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
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
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: [{
      type: String,
      required: true,
      trim: true,
    }],
    features: [{
      type: String,
      required: true,
    }],
    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    downloads: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    timeline: {
      type: String,
      trim: true,
    },
    priceRange: {
      type: String,
      trim: true,
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
projectSchema.index({ title: 'text', description: 'text' });
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ author: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
