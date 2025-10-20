import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  instructor: mongoose.Types.ObjectId;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  chapters: Array<{
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    resources: Array<{
      title: string;
      type: 'pdf' | 'link' | 'code';
      url: string;
    }>;
  }>;
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
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

const courseSchema = new Schema<ICourse>(
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
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    chapters: [{
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      resources: [{
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['pdf', 'link', 'code'],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      }],
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    enrollments: {
      type: Number,
      default: 0,
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
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ instructor: 1 });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
