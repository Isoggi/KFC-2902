import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateData } from '@/middlewares/validationMiddleware';
import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { uploader } from '@/lib/uploader';
import { verifyEmail } from '@/middlewares/verify';
import { validateUser } from '@/middlewares/validateUser';
export class AuthRouter {
  private router = Router();
  private authController = new AuthController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post(
      '/v1',
      validateData(loginSchema),
      this.authController.login,
    );
    this.router.post(
      '/v2',
      uploader('AVATAR', 'avatars').single('image'),
      validateData(registerSchema),
      this.authController.register,
    );
    this.router.get(
      '/verification/:token',
      verifyEmail,
      this.authController.verification,
    );

    this.router.patch(
      '/profile',
      validateUser,
      uploader('AVATAR', 'avatars').single('image'),
      this.authController.updateProfile,
    );
  }
  public getRouter() {
    return this.router;
  }
}
