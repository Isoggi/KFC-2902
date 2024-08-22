/** @format */
import { api } from "@/config/axios.config";
import { loginSchema } from "@/schemas/auth.schema";
import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

export const { signIn, signOut, handlers, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credential({
      authorize: async (credentials) => {
        try {
          const validateFields = loginSchema.safeParse(credentials);
          if (!validateFields.success) throw new Error("Login Gagal");
          const res = await api.get("/users", {
            params: {
              phone_number: credentials?.phone_number,
              password: credentials?.password,
            },
          });
          const user = res.data[0];
          delete user.password;
          delete user.confirm_password;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const res = await api.get("/users", {
          params: {
            email: user?.email,
          },
        });

        if (res.data.length === 0) {
          const newUser = {
            full_name: user.name,
            phone_number: null,
            gender: "Pria",
            date: null,
            month: null,
            year: null,
            email: user.email,
            password: null,
            confirm_password: null,
            google_id: user.id,
            image: user.image,
          };
          const { data } = await api.post("/users", newUser);

          if (data) {
            user = data;
          }
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone_number = token.phone_number as string;
        session.user.email = token.email as string;
        session.user.full_name = token.full_name as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      if (account?.provider === "google") {
        const res = await api.get("/users", {
          params: {
            email: user?.email,
          },
        });
        if (res.data.length !== 0) {
          token = res.data[0];
        }
        return token;
      }

      if (user) {
        token.id = user.id;
        token.full_name = user.full_name;
        token.phone_number = user.phone_number;
        token.email = user.email;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
  },
});
