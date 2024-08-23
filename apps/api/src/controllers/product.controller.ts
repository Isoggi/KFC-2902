import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
export class ProductController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getAllService(req);
      return res
        .status(200)
        .json({ message: 'get success', data, success: true });
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.createService(req);
      return res.status(201).json({ message: 'new product has been created' });
    } catch (error) {
      next(error);
    }
  }
}
