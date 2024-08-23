import { Request } from 'express';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';

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
    const { product_name, price, description, image, categoryId } = req.body;
    if (!product_name || !price || !description || !image || !categoryId)
      throw new Error('product name/price/description/image is required');

    const data: Prisma.ProductCreateInput = {
      product_name,
      price,
      description,
      image,
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
