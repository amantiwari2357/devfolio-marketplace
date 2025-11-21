require('dotenv').config();
const mongoose = require('mongoose');
const Expert = require('./src/models/expert.model');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devfolio-marketplace');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Dummy experts data
const dummyExperts = [
  {
    firstName: 'John',
    lastName: 'Smith',
    role: 'Full Stack Developer',
    profileImage: 'https://example.com/john-smith.jpg',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    bio: 'Experienced full stack developer with 5+ years in web development, specializing in MERN stack.',
    email: 'john.smith@example.com',
    rating: 4.8,
    connections: 150,
    experience: '5+ years',
    location: 'New York, USA'
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'UI/UX Designer',
    profileImage: 'https://example.com/sarah-johnson.jpg',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    bio: 'Creative UI/UX designer passionate about creating intuitive user experiences and beautiful interfaces.',
    email: 'sarah.johnson@example.com',
    rating: 4.9,
    connections: 200,
    experience: '4+ years',
    location: 'San Francisco, USA'
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'Data Scientist',
    profileImage: 'https://example.com/michael-chen.jpg',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas'],
    bio: 'Data scientist with expertise in machine learning and statistical analysis, helping businesses make data-driven decisions.',
    email: 'michael.chen@example.com',
    rating: 4.7,
    connections: 120,
    experience: '6+ years',
    location: 'Seattle, USA'
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'DevOps Engineer',
    profileImage: 'https://example.com/emily-davis.jpg',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    bio: 'DevOps engineer focused on building scalable infrastructure and automating deployment pipelines.',
    email: 'emily.davis@example.com',
    rating: 4.6,
    connections: 180,
    experience: '5+ years',
    location: 'Austin, USA'
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    role: 'Mobile App Developer',
    profileImage: 'https://example.com/david-wilson.jpg',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    bio: 'Mobile app developer creating cross-platform applications with focus on performance and user experience.',
    email: 'david.wilson@example.com',
    rating: 4.5,
    connections: 140,
    experience: '4+ years',
    location: 'Los Angeles, USA'
  },
  {
    firstName: 'Lisa',
    lastName: 'Brown',
    role: 'Product Manager',
    profileImage: 'https://example.com/lisa-brown.jpg',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    bio: 'Product manager bridging the gap between business and technology, delivering products that users love.',
    email: 'lisa.brown@example.com',
    rating: 4.8,
    connections: 160,
    experience: '7+ years',
    location: 'Chicago, USA'
  }
];

// Function to add experts
const addExperts = async () => {
  try {
    await connectDB();

    for (const expertData of dummyExperts) {
      try {
        const expert = await Expert.findOneAndUpdate(
          { email: expertData.email },
          expertData,
          { upsert: true, new: true, runValidators: true }
        );
        console.log(`Successfully added/updated expert: ${expertData.firstName} ${expertData.lastName}`);
      } catch (error) {
        console.log(`Failed to add expert: ${expertData.firstName} ${expertData.lastName}`);
        console.error('Error:', error.message);
      }
    }

    console.log('Dummy experts addition completed!');
  } catch (error) {
    console.error('Error in addExperts:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the function
addExperts();
