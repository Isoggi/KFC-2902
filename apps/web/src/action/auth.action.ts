/** @format */
'use server';
import { api } from '@/config/axios.config';
import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { AxiosError } from 'axios';
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
