import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  expert?: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    expert: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'responded', 'closed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
enquirySchema.index({ expert: 1, status: 1 });
enquirySchema.index({ project: 1, status: 1 });
enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);
