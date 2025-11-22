# Devfolio Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://amankumartiwari5255_db_user:jlJohiJC3FX5gBxN@cluster0.m5vmuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

### 4. API Endpoints

- Health Check: `GET /api/health`
- Auth: `/api/auth/*`
- Users: `/api/users/*`
- Projects: `/api/projects/*`
- Courses: `/api/courses/*`
- Services: `/api/services/*`
- Experts: `/api/experts/*`
- Testimonials: `/api/testimonials/*`
- Client Onboarding: `/api/client-onboarding/*`

## Client Onboarding API

### Get All Client Onboarding Records
```
GET /api/client-onboarding
Query Parameters:
  - clientName (optional)
  - email (optional)
  - companyName (optional)
  - projectName (optional)
  - status (optional)
  - page (optional, default: 1)
  - limit (optional, default: 10)
```

### Get Client Onboarding by ID
```
GET /api/client-onboarding/:id
```

### Create Client Onboarding
```
POST /api/client-onboarding
Body: {
  clientName: string,
  email: string,
  phone: string,
  companyName: string,
  projectName: string,
  techStack: string,
  projectType: string,
  startDate: string (ISO date),
  deadline: string (ISO date),
  teamMembers: Array,
  totalAmount: number,
  paidAmount: number,
  stages: Array
}
```

### Update Client Onboarding
```
PUT /api/client-onboarding/:id
Body: (same as create)
```

### Update Stage Status
```
PATCH /api/client-onboarding/:id/stage
Body: {
  stageIndex: number,
  status: 'pending' | 'in-progress' | 'completed'
}
```

### Update Payment
```
PATCH /api/client-onboarding/:id/payment
Body: {
  paidAmount: number
}
```

### Get Statistics
```
GET /api/client-onboarding/stats
```

## Notes

- All routes except `/api/health` and `/api/auth/login` require authentication
- Use the JWT token from login in the Authorization header: `Bearer <token>`