/** @format */

interface IUser {
  id: number;
  phone_number: string;
  email: string;
  full_name: string;
  image?: string;
  gender: "Pria" | "Perempuan";
}
