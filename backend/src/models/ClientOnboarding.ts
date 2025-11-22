import mongoose, { Document, Schema } from 'mongoose';

export interface IClientOnboarding extends Document {
  clientName: string;
  email: string;
  phone: string;
  companyName: string;
  projectName: string;
  techStack: string;
  projectType: string;
  startDate: Date;
  deadline: Date;
  teamMembers: Array<{
    name: string;
    role: string;
    email: string;
  }>;
  totalAmount: number;
  paidAmount: number;
  stages: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
    startDate?: Date;
    endDate?: Date;
    description?: string;
  }>;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const clientOnboardingSchema = new Schema<IClientOnboarding>(
  {
    clientName: {
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: String,
      required: true,
      trim: true,
    },
    projectType: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    teamMembers: [
      {
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    stages: [
      {
        name: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'in-progress', 'completed'],
          default: 'pending',
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
clientOnboardingSchema.index({ email: 1 });
clientOnboardingSchema.index({ createdBy: 1 });
clientOnboardingSchema.index({ projectName: 'text', companyName: 'text' });

export const ClientOnboarding = mongoose.model<IClientOnboarding>(
  'ClientOnboarding',
  clientOnboardingSchema
);
