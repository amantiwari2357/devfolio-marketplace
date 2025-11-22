// import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from '../utils/jwt';
// const User = require('../models/user.model');

// export interface AuthRequest extends Request {
//   user?: any;
// }

// export const authenticate = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     const decoded = verifyToken(token);
//     console.log('Decoded token:', decoded);
    
//     // Handle both 'id' and 'userId' from token
//     const userId = decoded.id || decoded.userId;
    
//     if (!userId) {
//       console.error('No userId found in token:', decoded);
//       return res.status(401).json({ message: 'Invalid token format' });
//     }

//     console.log('Looking for user with ID:', userId);
//     const user = await User.findById(userId).select('-password');

//     if (!user) {
//       console.error('User not found with ID:', userId);
//       return res.status(401).json({ message: 'User not found' });
//     }

//     console.log('User authenticated:', user._id, user.email);
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// export const authorize = (...roles: string[]) => {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }

//     next();
//   };
// };
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    console.log("Decoded Token:", decoded);

    const userId = decoded.userId || decoded.id;

    if (!userId) return res.status(401).json({ message: "Invalid token format" });

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  };
};
