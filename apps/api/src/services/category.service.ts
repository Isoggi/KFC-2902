import { Request } from 'express';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
export class CategoryService {
  static async createService(req: Request) {
    const { category, image } = req.body;
    if (!category || !image) throw new Error('category/image is required');

    return await prisma.category.create({
      data: req.body,
    });
  }

  static async getAllService() {
    return await prisma.category.findMany();
  }
}
