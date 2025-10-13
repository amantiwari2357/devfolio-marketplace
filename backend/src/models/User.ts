const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profileImage: { type: String },
  bio: { type: String, maxlength: 500 },
  socialLinks: {
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
