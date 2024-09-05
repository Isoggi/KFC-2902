import { Request } from 'express';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { ErrorHandler } from '../helpers/response';
export class CategoryService {
  static async createService(req: Request) {
    const { category, image } = req.body;
    if (!category) throw new Error('category is required');
    if (!req.file?.filename) throw new ErrorHandler('file is required', 400);
    const data: Prisma.CategoryCreateInput = {
      category,
      image: req.file.filename,
    };

    return await prisma.category.create({
      data,
    });
  }

  static async getAllService() {
    return await prisma.category.findMany();
  }
}
