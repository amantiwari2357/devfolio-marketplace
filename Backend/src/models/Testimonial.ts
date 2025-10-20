import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  rating: number;
  type: 'project' | 'course' | 'service';
  relatedItem: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    type: {
      type: String,
      enum: ['project', 'course', 'service'],
      required: true,
    },
    relatedItem: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'type',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
testimonialSchema.index({ author: 1 });
testimonialSchema.index({ type: 1, status: 1 });
testimonialSchema.index({ featured: 1, status: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
