import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'login success' });
  }
  async register(req: Request, res: Response, next: NextFunction) {
    return res.status(201).json({ message: 'register success' });
  }
}
