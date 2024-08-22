import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
export class CategoryRouter {
  private router = Router();
  private categoryController = new CategoryController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.get('/', this.categoryController.get);
    this.router.post('/', this.categoryController.create);
  }
  public getRouter() {
    return this.router;
  }
}
