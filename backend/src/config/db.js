const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devfolio-marketplace';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message || error);
    console.log('Falling back to local MongoDB...');

    try {
      await mongoose.connect('mongodb://localhost:27017/devfolio-marketplace', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to local MongoDB successfully');
    } catch (localError) {
      console.error('Local MongoDB connection also failed:', localError.message || localError);
      console.log('Please ensure MongoDB is installed and running locally, or check your Atlas IP whitelist');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
