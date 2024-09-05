import { Request } from 'express';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { ErrorHandler } from '../helpers/response';

export class ProductService {
  static async getAllService(req: Request) {
    const { categoryId } = req.query;
    let where: Prisma.ProductWhereInput = {};
    if (categoryId)
      where.Category = {
        id: Number(categoryId),
      };

    return await prisma.product.findMany({ where });
  }

  static async createService(req: Request) {
    const { product_name, price, description, categoryId } = req.body;
    if (!product_name || !price || !description || !categoryId)
      throw new Error('product name/price/description is required');
    if (!req.file?.filename) throw new ErrorHandler('file is required', 400);

    const data: Prisma.ProductCreateInput = {
      product_name,
      price,
      description,
      image: req.file?.filename,
      Category: {
        connect: {
          id: Number(categoryId),
        },
      },
    };

    return await prisma.product.create({
      data,
    });
  }
}
