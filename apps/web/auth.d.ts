/** @format */

declare module "next-auth" {
  interface User {
    id: number | undefined;
    phone_number: string | undefined;
    email: string | undefined;
    full_name: string | undefined;
    gender: "Pria" | "Perempuan" | undefined;
    image?: string;
  }

  interface Session {
    user: User;
  }
}

import { JWT } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: number | undefined;
    phone_number: string | undefined;
    email: string | undefined;
    full_name: string | undefined;
    gender: "Pria" | "Perempuan" | undefined;
    image?: string;
  }
}
