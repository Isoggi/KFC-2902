import { NextFunction, Request, Response } from 'express';

export class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'get success' });
  }
  async create(req: Request, res: Response, next: NextFunction) {
    return res.status(201).json({ message: 'create success' });
  }
}
