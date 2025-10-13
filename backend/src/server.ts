require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const offeringRoutes = require('./routes/offerings');
const testimonialRoutes = require('./routes/testimonials');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/offerings', offeringRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/api/health', (req: any, res: any) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Get ratings summary
app.get('/api/ratings', async (req: any, res: any) => {
  try {
    const Testimonial = require('./models/Testimonial');
    const testimonials = await Testimonial.find({ isVerified: true });
    
    const totalRatings = testimonials.length;
    const averageRating = totalRatings > 0 
      ? testimonials.reduce((sum: number, t: any) => sum + t.rating, 0) / totalRatings 
      : 0;

    res.json({
      average: parseFloat(averageRating.toFixed(1)),
      count: totalRatings,
      testimonialsCount: totalRatings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📊 MongoDB connected`);
});


