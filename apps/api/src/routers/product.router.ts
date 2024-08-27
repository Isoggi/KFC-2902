import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { uploader } from '@/lib/uploader';
export class ProductRouter {
  private router = Router();
  private productController = new ProductController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.get('/', this.productController.get);
    this.router.post(
      '/',
      uploader('PRD', 'products').single('image'),
      this.productController.create,
    );
  }
  public getRouter() {
    return this.router;
  }
}
