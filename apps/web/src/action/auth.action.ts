/** @format */
"use server";
import { api } from "@/config/axios.config";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      phone_number: values.phone_number,
      password: values.password,
    });
    return {
      message: "Login Berhasil",
    };
  } catch (error) {
    throw error;
  }
};

export const actionLogout = async () => {
  return await signOut({ redirect: true, redirectTo: "/login" });
};

export const actionRegister = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    await api.post("/users", values);
    return {
      message: "Register Berhasil",
    };
  } catch (error) {
    return {
      message: "Register Gagal",
    };
  }
};

export async function googleAuthenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "google log in failed";
    }
    throw error;
  }
}
