import { JWT_SECRET } from '../config';
import { sign } from 'jsonwebtoken';
export const generateToken = (payload: any, expiresIn: string = '1hr') => {
  return sign(payload, JWT_SECRET, { expiresIn, algorithm: 'HS256' });
};
