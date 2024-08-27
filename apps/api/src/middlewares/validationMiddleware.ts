import { ErrorHandler } from '@/helpers/response';
import { registerSchema } from '@/schemas/auth.schema';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
export const validateData =
  (schema: z.infer<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema == registerSchema) {
        req.body.date = Number(req.body.date);
        req.body.year = Number(req.body.year);
        req.body.month = Number(req.body.month);
      }
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map((issue: any) => issue.message)
          .join(', ');

        next(new ErrorHandler(message, 400));
      }
    }
  };
