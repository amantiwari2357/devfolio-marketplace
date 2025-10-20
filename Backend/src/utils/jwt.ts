import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as unknown as SignOptions['expiresIn'] };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
