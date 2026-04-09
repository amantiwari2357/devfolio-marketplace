const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic user info
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // Step 1: Profile
  socialUrl: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    trim: true
  },
  country: {
    type: String,
    default: 'india'
  },
  currency: {
    type: String,
    default: 'inr'
  },
  expertise: [{
    type: String,
    enum: [
      "Cybersecurity", "Law", "Content & Branding", "Others", "HR",
      "Software", "Product", "Study Abroad", "Finance", "Design",
      "Data", "Astrology", "Mental Health & Wellbeing", "Marketing"
    ]
  }],

  // Step 2: Availability
  availability: [{
    day: {
      type: String,
      enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    enabled: {
      type: Boolean,
      default: false
    },
    startTime: String,
    endTime: String
  }],

  // Step 3: Services
  services: [{
    title: {
      type: String,
      default: "Discovery Call"
    },
    description: {
      type: String,
      default: "A 30-minute introductory session to understand your needs and discuss how I can help you achieve your goals."
    },
    price: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: "consultation"
    },
    features: [{
      type: String
    }]
  }],

  // Step 4: WhatsApp
  whatsappNumber: {
    type: String,
    trim: true
  },

  // Step 5: Portfolio Projects
  portfolio: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    liveUrl: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }]
  }],

  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  emailVerificationExpires: {
    type: Date,
    default: null
  },

  // Onboarding status
  onboardingCompleted: {
    type: Boolean,
    default: false
  },
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 4
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ onboardingCompleted: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
