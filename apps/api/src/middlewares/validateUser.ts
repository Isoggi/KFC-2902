import { JWT_SECRET } from '@/config';
import { ErrorHandler } from '@/helpers/response';
import { IUser } from '@/interfaces/user';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    console.log(token);

    if (!token) throw new ErrorHandler('unauthorized', 401);
    req.user = verify(token, JWT_SECRET) as IUser;
    next();
  } catch (error) {
    next(error);
  }
};
