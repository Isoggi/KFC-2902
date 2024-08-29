import { JWT_SECRET, verify_email_secret } from '../config';
import { sign } from 'jsonwebtoken';
export const generateToken = (payload: any, expiresIn: string = '1hr') => {
  return sign(payload, JWT_SECRET, { expiresIn, algorithm: 'HS256' });
};

export const generateTokenEmailVerification = (
  payload: any,
  expiresIn: string = '1m',
) => {
  return sign(payload, verify_email_secret, { expiresIn, algorithm: 'HS256' });
};
