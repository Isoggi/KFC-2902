import { Prisma } from '@prisma/client';
import { Request } from 'express';
import prisma from '../prisma';
import { hash, compare } from 'bcrypt';
import { generateToken, generateTokenEmailVerification } from '@/lib/jwt';
import { ErrorHandler } from '@/helpers/response';
import { sendVerificationEmail } from '@/lib/nodemailer';
import { verification_url } from '@/config';
import { IUser } from '@/interfaces/user';
import fs from 'fs';
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

    await prisma.user.create({ data });

    const token = generateTokenEmailVerification({
      email,
    });

    return sendVerificationEmail(email, {
      email,
      verification_url: verification_url + token,
    });
  }

  static async verifyEmail(req: Request) {
    const { email } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ErrorHandler('user not found', 404);
    else if (user.is_verified)
      throw new ErrorHandler('user already verified', 400);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        is_verified: true,
      },
    });
  }

  static async updateProfile(req: Request) {
    const { id } = req.user;
    const { full_name, gender } = req.body;
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!checkUser) throw new ErrorHandler('user not found', 404);
    const data: Prisma.UserUpdateInput = {};
    if (full_name) data.full_name = full_name;
    if (gender) data.gender = gender;
    if (req.file) {
      data.image = req.file.filename;
    }
    await prisma.user.update({
      data,
      where: {
        id,
      },
    });

    if (checkUser.image && data.image && checkUser.image !== data.image)
      fs.unlink(
        __dirname + '/../public/images/avatars/' + checkUser.image,
        (err: unknown) => {
          if (err) console.log(err);
        },
      );

    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
    })) as IUser;
    delete user.password;
    const token = generateToken(user);
    return token;
  }
}
