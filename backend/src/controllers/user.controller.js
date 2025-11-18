const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup - Create user with basic info
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      currentStep: 1
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
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
        currentStep: user.currentStep,
        onboardingCompleted: user.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Login error:', error);
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
  login
};
