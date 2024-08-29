import { verify_email_secret } from '@/config';
import { ErrorHandler } from '@/helpers/response';
import { IUser } from '@/interfaces/user';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.params;
    const user = verify(token, verify_email_secret);
    req.user = user as IUser;
    next();
  } catch (error) {
    next(new ErrorHandler('unauthorized', 401));
  }
};
