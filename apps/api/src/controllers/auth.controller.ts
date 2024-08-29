import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { responseHandler } from '@/helpers/response';
export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req);
      return res
        .status(200)
        .json({ message: 'login success', data, success: true });
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.register(req);
      return res
        .status(201)
        .json({ message: 'register success', success: true });
    } catch (error) {
      next(error);
    }
  }

  async verification(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.verifyEmail(req);
      return res.send(responseHandler('verified', null));
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.updateProfile(req);
      return res
        .status(200)
        .send(responseHandler('profile has been updated', data));
    } catch (error) {
      next(error);
    }
  }
}
