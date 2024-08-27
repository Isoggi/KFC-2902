import { Prisma } from '@prisma/client';
import { Request } from 'express';
import prisma from '../prisma';
import { hash, compare } from 'bcrypt';
import { generateToken } from '@/lib/jwt';
import { ErrorHandler } from '@/helpers/response';

interface IUser {
  id: number;
  phone_number: string;
  gender: string;
  birth_date: Date;
  email: string;
  password?: string;
}
export class AuthService {
  static async login(req: Request) {
    const { phone_number, password } = req.body;
    const user = (await prisma.user.findUnique({
      where: {
        phone_number,
      },
    })) as IUser;
    if (!user) throw new ErrorHandler('user not found', 404);
    const checkPassword = await compare(password, user.password!);
    if (checkPassword) {
      delete user.password;
    } else throw new ErrorHandler('wrong password', 400);
    console.log(user);

    return generateToken(user);
  }
  static async register(req: Request) {
    const {
      email,
      password,
      phone_number,
      gender,
      date,
      month,
      year,
      full_name,
    } = req.body;
    const hashPassword = await hash(password, 10);

    const data: Prisma.UserCreateInput = {
      email,
      password: hashPassword,
      phone_number,
      gender,
      birth_date: new Date(year, month - 1, date),
      full_name,
    };

    if (req?.file) {
      const image = req.file;
      data.image = image.filename;
    }
    return await prisma.user.create({ data });
  }
}
