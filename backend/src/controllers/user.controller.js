const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup - Create user account
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      username: email.split('@')[0], // Default username from email
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        currentStep: user.currentStep,
        onboardingCompleted: user.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        currentStep: user.currentStep,
        onboardingCompleted: user.onboardingCompleted
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Update Step 1: Profile
const updateProfile = async (req, res) => {
  try {
    const { socialUrl, username, country, currency, expertise } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username is already taken
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    user.socialUrl = socialUrl;
    user.username = username;
    user.country = country;
    user.currency = currency;
    user.expertise = expertise;
    user.currentStep = 2;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        socialUrl: user.socialUrl,
        username: user.username,
        country: user.country,
        currency: user.currency,
        expertise: user.expertise,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

// Update Step 2: Availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.availability = availability;
    user.currentStep = 3;

    await user.save();

    res.json({
      message: 'Availability updated successfully',
      user: {
        id: user._id,
        availability: user.availability,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Server error during availability update' });
  }
};

// Update Step 3: Services
const updateServices = async (req, res) => {
  try {
    const { services } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.services = services;
    user.currentStep = 4;

    await user.save();

    res.json({
      message: 'Services updated successfully',
      user: {
        id: user._id,
        services: user.services,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update services error:', error);
    res.status(500).json({ message: 'Server error during services update' });
  }
};

// Update Step 4: WhatsApp and Complete Onboarding
const updateWhatsApp = async (req, res) => {
  try {
    const { whatsappNumber } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.whatsappNumber = whatsappNumber;
    user.onboardingCompleted = true;
    user.currentStep = 4;

    await user.save();

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        id: user._id,
        whatsappNumber: user.whatsappNumber,
        onboardingCompleted: user.onboardingCompleted,
        currentStep: user.currentStep
      }
    });
  } catch (error) {
    console.error('Update WhatsApp error:', error);
    res.status(500).json({ message: 'Server error during WhatsApp update' });
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

module.exports = {
  signup,
  login,
  updateProfile,
  updateAvailability,
  updateServices,
  updateWhatsApp,
  getProfile
};
