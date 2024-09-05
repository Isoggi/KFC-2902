import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { uploader } from '../lib/uploader';
export class CategoryRouter {
  private router = Router();
  private categoryController = new CategoryController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.get('/', this.categoryController.get);
    this.router.post(
      '/',
      uploader('CAT', 'categories').single('image'),
      this.categoryController.create,
    );
  }
  public getRouter() {
    return this.router;
  }
}
