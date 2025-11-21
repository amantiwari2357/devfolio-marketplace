require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model');

const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

async function getAdminToken() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://amankumartiwari5255:amankumartiwari5255@cluster0.qcwxko5.mongodb.net/?appName=Cluster0');
    
    console.log('Connected to MongoDB');
    
    // Find admin user
    const admin = await User.findOne({ email: 'devfoliomarketplace@gmail.com' });
    
    if (!admin) {
      console.error('Admin user not found!');
      process.exit(1);
    }
    
    console.log('Admin found:', {
      id: admin._id,
      email: admin.email,
      role: admin.role
    });
    
    // Generate token for admin
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      jwtSecret,
      { expiresIn: '7d' }
    );
    
    console.log('\n' + '='.repeat(80));
    console.log('Generated Admin Token:');
    console.log('='.repeat(80));
    console.log(token);
    console.log('='.repeat(80));
    console.log('\nUse this token in Postman Authorization header:');
    console.log(`Bearer ${token}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

getAdminToken();
