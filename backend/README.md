# Devfolio Marketplace Backend

A Node.js backend API for the Devfolio Marketplace platform with user registration and multi-step onboarding.

## Features

- User authentication (signup/login)
- Multi-step onboarding process (4 steps)
- JWT-based authentication
- MongoDB database integration
- Input validation and error handling
- CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   └── user.controller.js  # User-related logic
│   ├── middlewares/
│   │   └── auth.middleware.js  # JWT authentication
│   ├── models/
│   │   └── user.model.js   # User schema
│   ├── routes/
│   │   └── index.js        # API routes
│   ├── services/
│   │   └── user.service.js # User services (placeholder)
│   ├── utils/
│   │   └── errorHandler.js # Error handling middleware
│   └── validators/
│       └── user.validator.js # Input validation
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Navigate to the backend directory:
   ```bash
   cd devfolio-marketplace/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devfolio-marketplace
   JWT_SECRET=your-super-secret-jwt-key
   ```

5. Start MongoDB (if running locally)

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `https://devfolio-marketplace-1.onrender.com`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Protected Routes (require JWT token in Authorization header)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile (Step 1)
- `PUT /api/availability` - Update availability (Step 2)
- `PUT /api/services` - Update services (Step 3)
- `PUT /api/whatsapp` - Update WhatsApp number and complete onboarding (Step 4)

## Onboarding Steps

1. **Profile Setup**: Social URL, username, country, currency, expertise
2. **Availability**: Weekly schedule with start/end times
3. **Services**: Service offerings (default: Discovery Call)
4. **WhatsApp Integration**: Phone number for booking notifications

## Data Models

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  socialUrl: String,
  username: String (required, unique),
  country: String (required),
  currency: String (required),
  expertise: [String],
  availability: [{
    day: String,
    enabled: Boolean,
    startTime: String,
    endTime: String
  }],
  services: [{
    name: String,
    description: String
  }],
  whatsappNumber: String,
  onboardingCompleted: Boolean,
  currentStep: Number (1-4)
}
```

## Usage

### Signup
```bash
curl -X POST https://devfolio-marketplace-1.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST https://devfolio-marketplace-1.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Update Profile (Step 1)
```bash
curl -X PUT https://devfolio-marketplace-1.onrender.com/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "socialUrl": "https://linkedin.com/in/user",
    "username": "user123",
    "country": "India",
    "currency": "INR",
    "expertise": ["Software", "Design"]
  }'
```

## Development

- Use `npm run dev` for development with nodemon
- Use `npm start` for production
- MongoDB connection is handled automatically on server start
- JWT tokens expire in 7 days

## Contributing

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Update this README for any new features
4. Test all endpoints thoroughly

## License

ISC
