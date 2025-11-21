const jwt = require('jsonwebtoken');

// Generate a test token
const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

const testUser = {
  id: '507f1f77bcf86cd799439011', // Sample MongoDB ObjectId
  email: 'test@example.com'
};

const token = jwt.sign(testUser, jwtSecret, { expiresIn: '7d' });

console.log('Generated Test Token:');
console.log('='.repeat(80));
console.log(token);
console.log('='.repeat(80));
console.log('\nUse this token in Postman Authorization header:');
console.log(`Bearer ${token}`);
