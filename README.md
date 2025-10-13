# Portfolio Application - Complete Full-Stack Solution

A modern, responsive portfolio application built with React, Node.js, Express, and MongoDB Atlas. Features user authentication, onboarding flow, and a professional portfolio display.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI Design**: Clean, professional interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **User Authentication**: Registration and login with form validation
- **Multi-Step Onboarding**: 4-step setup process after signup
- **Portfolio Display**: Showcase offerings, testimonials, and ratings
- **Interactive Components**: Modals, tabs, and dynamic content

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for all entities
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **MongoDB Integration**: Connected to MongoDB Atlas cloud database
- **Data Models**: User, Offering, and Testimonial schemas
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

### Onboarding Flow
1. **Profile Setup**: Social links, page URL, country, currency, expertise
2. **Services Selection**: Choose 1:1 services to offer
3. **Availability Settings**: Set weekly availability with time slots
4. **WhatsApp Integration**: Phone number setup with feature preview

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- CSS3 with custom properties
- Responsive design with CSS Grid and Flexbox

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Database
- MongoDB Atlas (Cloud)
- Mongoose schemas for data modeling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - The `.env` file is already configured with MongoDB Atlas connection
   - JWT secret is set for development
   - Port is configured to 4000

4. **Start the backend server**
   ```bash
   npm run dev
   ```

   The backend will start at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd portfolio-topmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend server**
   ```bash
   npm run dev
   ```

   The frontend will start at `http://localhost:5173` (or similar)

## 🎯 Usage

### Complete User Flow

1. **Visit the Application**
   - Open `http://localhost:5173` in your browser
   - You'll see the portfolio homepage

2. **Start Registration**
   - Click "Start your page" button
   - Fill out the signup form with your details
   - Submit to create your account

3. **Complete Onboarding**
   - **Step 1**: Set up your profile (social links, expertise, etc.)
   - **Step 2**: Select services you want to offer
   - **Step 3**: Set your availability schedule
   - **Step 4**: Add WhatsApp integration

4. **Launch Your Portfolio**
   - Click "Launch your page" to view your portfolio
   - Your offerings, testimonials, and ratings will be displayed

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Data
- `GET /api/offerings` - Get all offerings
- `GET /api/testimonials` - Get all testimonials
- `GET /api/ratings` - Get ratings summary
- `GET /api/health` - Health check

## 🎨 Design Features

### UI Components
- **Progress Bar**: Animated progress indicator for onboarding
- **Form Validation**: Real-time validation with error messages
- **Interactive Cards**: Hover effects and smooth transitions
- **Modal System**: Testimonials modal with backdrop blur
- **Responsive Grid**: Adaptive layouts for all screen sizes

### Color Scheme
- Primary: Blue (#3b82f6)
- Background: Light gray (#f8fafc)
- Text: Dark slate (#0f172a)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Error: Red (#ef4444)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: ≤ 480px
- **Tablet**: ≤ 768px
- **Desktop**: > 768px

### Mobile Optimizations
- Touch-friendly buttons and inputs
- Optimized spacing and typography
- Simplified navigation
- Stacked layouts for better readability

## 🔧 Development

### Project Structure
```
aman.com/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Offering.ts
│   │   │   └── Testimonial.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── offerings.ts
│   │   │   └── testimonials.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── portfolio-topmate/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

### Available Scripts

#### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚀 Deployment

### Backend Deployment
1. Build the backend: `npm run build`
2. Deploy to platforms like Heroku, Railway, or Vercel
3. Update MongoDB Atlas IP whitelist for production
4. Set production environment variables

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API endpoints for production backend

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration
- Input validation and sanitization
- Environment variable protection

## 📊 Database Schema

### User Model
- firstName, lastName, email, password
- role (user/admin)
- profileImage, bio
- socialLinks (linkedin, instagram, twitter)
- timestamps

### Offering Model
- title, description, type
- price, originalPrice, duration
- popular flag
- userId reference
- isActive flag
- timestamps

### Testimonial Model
- text, rating (1-5)
- authorName, authorTitle
- userId, offeringId references
- isAnonymous, isVerified flags
- timestamps

## 🎉 Success!

Your complete portfolio application is now running with:

✅ **Full-Stack Architecture**: React frontend + Node.js backend  
✅ **Database Integration**: MongoDB Atlas cloud database  
✅ **User Authentication**: Secure registration and login  
✅ **Onboarding Flow**: 4-step setup process  
✅ **Responsive Design**: Works on all devices  
✅ **Professional UI**: Modern, clean interface  
✅ **Real-time Features**: Dynamic content and interactions  

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB Atlas IP whitelist includes your current IP
   - Verify connection string in `.env` file

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

3. **CORS Errors**
   - Ensure backend CORS is properly configured
   - Check frontend API endpoint URLs

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript configuration

### Support
For any issues or questions, check the console logs and ensure all dependencies are properly installed.

---

**Built with ❤️ using modern web technologies**
#   d e v f o l i o - m a r k e t p l a c e  
 