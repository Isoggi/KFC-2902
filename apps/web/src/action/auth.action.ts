/** @format */
'use server';
import { api } from '@/config/axios.config';
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from '@/schemas/auth.schema';
import { z } from 'zod';
import { auth, signIn, signOut, unstable_update as update } from '@/auth';
import { AuthError, User } from 'next-auth';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      phone_number: values.phone_number,
      password: values.password,
      redirect: false,
    });
    return {
      message: 'Login Berhasil',
    };
  } catch (error) {
    throw new Error('Login Gagal');
  }
};

export const actionLogout = async () => {
  return await signOut({ redirect: true, redirectTo: '/login' });
};

export const actionRegister = async (
  values: z.infer<typeof registerSchema>,
) => {
  try {
    const res = await api.post('/auth/v2', values);
    return {
      message: res.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data.message);
    throw new Error('Register Gagal');
  }
};

export const actionUpdateProfile = async (values: FormData) => {
  try {
    const session = await auth();

    const res = await api.patch('/auth/profile', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });

    if (res.data.data) {
      const user = jwtDecode(res.data.data) as User;

      user.access_token = res.data.data;
      await update({ ...session, ...user });
    }

    return {
      message: res.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data.message);
    throw new Error('Register Gagal');
  }
};

export async function googleAuthenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      return 'google log in failed';
    }
    throw error;
  }
}
