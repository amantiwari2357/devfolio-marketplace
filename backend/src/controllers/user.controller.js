const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ClientOnboardingProject = require('../models/clientOnboardingProject.model');
const { sendVerificationEmail, sendWelcomeEmail } = require('../services/emailService');

// Signup - Create user with basic info
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      currentStep: 1,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });

    await user.save();

    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    try {
      await sendVerificationEmail(email, verificationToken, frontendUrl);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue even if email fails, user can request resend
    }

    res.status(201).json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Public project-onboarding stages template (same structure as clientOnboardingProject.controller)
const onboardingDefaultStages = [
  { id: 1, name: "Requirement Gathering + Contract", output: "Documents, Payment Part-1", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 2, name: "Branding & Wireframe", output: "Logo, Colors, Sitemap", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 3, name: "UI/UX Design", output: "Figma, Approval Status", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 4, name: "Frontend Development", output: "Web Pages, Components", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 5, name: "Backend Development", output: "Database, APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 6, name: "Integrations", output: "Payment, Auth, CRM, Third-Party APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 7, name: "Content Upload", output: "Images, Text Content", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 8, name: "Testing & QA", output: "Bugs List, Reports", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 9, name: "Deployment & Hosting", output: "Domain, SSL, Server", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 10, name: "Final Delivery & Training", output: "Documentation, Credentials, Warranty", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
];

// Submit project onboarding request from public site Profile page
const submitOnboardingRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      projectName,
      projectDescription,
      requirements,
      timeline,
      budget,
      clientName,
      email,
      phone,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Basic validation for required fields coming from the form
    if (!projectName || !projectDescription || !requirements) {
      return res.status(400).json({ message: 'Missing required onboarding fields' });
    }

    // Derive some reasonable defaults for the client onboarding project
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    const deadlineDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const isoDeadline = deadlineDate.toISOString().split('T')[0];

    const totalAmount = 0; // budget is free-text, so we keep numeric amount 0 for now

    const projectData = {
      clientName: clientName || user.username || user.email.split('@')[0],
      email: email || user.email,
      phone: phone || user.whatsappNumber || '+910000000000',
      companyName: projectName,
      projectName,
      techStack: 'Not specified',
      projectType: 'Website',
      startDate: isoToday,
      deadline: isoDeadline,
      teamMembers: [],
      totalAmount,
      paidAmount: 0,
      description: projectDescription,
      requirements,
      timeline,
      budget,
      createdBy: userId,
      stages: onboardingDefaultStages.map(stage => ({
        ...stage,
        payment: Math.round(totalAmount / onboardingDefaultStages.length),
      })),
    };

    const project = new ClientOnboardingProject(projectData);
    await project.save();

    return res.status(201).json({
      message: 'Project onboarding request submitted successfully',
      project,
    });
  } catch (error) {
    console.error('Submit onboarding request error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get latest onboarding status for authenticated user
const getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const project = await ClientOnboardingProject.findOne({ createdBy: userId })
      .sort({ createdAt: -1 });

    if (!project) {
      return res.json({ status: 'none', project: null });
    }

    return res.json({
      status: 'exists',
      project,
    });
  } catch (error) {
    console.error('Get onboarding status error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Step 1: Update Profile
const updateProfile = async (req, res) => {
  try {
    const { socialUrl, username, country, currency, expertise } = req.body;
    const userId = req.user.userId;

    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        socialUrl,
        username,
        country,
        currency,
        expertise,
        currentStep: 2
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 2: Update Availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        availability,
        currentStep: 3
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      user: {
        id: user._id,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 3: Update Services
const updateServices = async (req, res) => {
  try {
    const { services } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        services: services || [{ name: 'Discovery Call', description: 'A 30-minute introductory session to understand your needs and discuss how I can help you achieve your goals.' }],
        currentStep: 4
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Services updated successfully',
      user: {
        id: user._id,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 4: Update WhatsApp and Complete Onboarding
const updateWhatsApp = async (req, res) => {
  try {
    const { whatsappNumber } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        whatsappNumber,
        onboardingCompleted: true,
        currentStep: 4
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        id: user._id,
        onboardingCompleted: user.onboardingCompleted,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update WhatsApp error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (for admin dashboard)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        currentStep: user.currentStep,
        onboardingCompleted: user.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { email = 'admin@example.com', password = 'admin123' } = req.body;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const admin = new User({
      email,
      password: hashedPassword,
      role: 'admin',
      currentStep: 4,
      onboardingCompleted: true
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Admin created successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify email with token
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    // Find user with matching token and check if it's not expired
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.username || 'User');
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    res.status(200).json({
      message: 'Email verified successfully. You can now login.',
      user: {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resend verification email
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;

    await user.save();

    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    try {
      await sendVerificationEmail(email, verificationToken, frontendUrl);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return res.status(500).json({ message: 'Failed to send verification email' });
    }

    res.status(200).json({
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  updateProfile,
  updateAvailability,
  updateServices,
  updateWhatsApp,
  getProfile,
  getAllUsers,
  login,
  createAdmin,
  submitOnboardingRequest,
  getOnboardingStatus,
  verifyEmail,
  resendVerificationEmail
};
