import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
export class CategoryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getAllService();
      return res
        .status(200)
        .json({ message: 'get success', data, success: true });
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.createService(req);
      return res
        .status(201)
        .json({ message: 'new category has been created', success: true });
    } catch (error) {
      next(error);
    }
  }
}
