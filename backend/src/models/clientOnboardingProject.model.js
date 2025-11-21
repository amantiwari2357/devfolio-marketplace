const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  output: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'done'],
    default: 'pending'
  },
  completionDate: {
    type: String,
    default: ''
  },
  assignedMember: {
    type: String,
    default: '',
    trim: true
  },
  payment: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partially-paid', 'paid'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: '',
    trim: true
  },
  approvalRequired: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const clientOnboardingProjectSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  techStack: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  teamMembers: [{
    type: String,
    trim: true
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  stages: [stageSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
clientOnboardingProjectSchema.index({ createdBy: 1, createdAt: -1 });
clientOnboardingProjectSchema.index({ email: 1 });

module.exports = mongoose.model('ClientOnboardingProject', clientOnboardingProjectSchema);
