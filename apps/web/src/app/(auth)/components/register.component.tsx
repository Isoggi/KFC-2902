/** @format */
"use client";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage } from "@hookform/error-message";

type Props = {};
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { actionRegister } from "@/action/auth.action";
export default function RegisterComponent({}: Props) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    actionRegister(values)
      .then((res) => {
        form.reset();
        router.push("/login");
        toast.success(res.message);
      })
      .catch((err) => {
        toast.success(err.message);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" text-[15px] flex flex-col m-auto"
      >
        <div className="relative">
          <input
            type="text"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 focus-within:border-red-500  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register("full_name")}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
            <ErrorMessage errors={errors} name={"full_name"} />
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register("phone_number")}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Nomor handphone <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
            <ErrorMessage errors={errors} name={"phone_number"} />
          </div>
        </div>

        <Select
          onValueChange={(target) => {
            if (target === "Pria" || target === "Perempuan")
              form.setValue("gender", target);
          }}
        >
          <SelectTrigger className="w-full  outline-none border-b-2 border-t-0 border-l-0 border-r-0 rounded-none  peer z-10 relative bg-transparent">
            <SelectValue placeholder="Pilih Jenis Kelamin *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pria">Pria</SelectItem>
            <SelectItem value="Perempuan">Perempuan</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
          <ErrorMessage errors={errors} name={"gender"} />
        </div>
        <label className=" text-[15px]">
          Tanggal Lahir*{" "}
          <span className="text-red-500 text-[12.5px]">
            (tidak dapat diubah nantinya)
          </span>
        </label>

        <div className="flex gap-1 border-b max-w-[339px]">
          <Select
            onValueChange={(target) => {
              form.setValue("date", Number(target));
            }}
          >
            <SelectTrigger className="w-full max-w-[113px] outline-none border-none rounded-none">
              <SelectValue placeholder="Tanggal" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(31)].map((_, i) => (
                <SelectItem key={i} value={String(i + 1)} typeof="number">
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(target) => {
              form.setValue("month", Number(target));
            }}
          >
            <SelectTrigger className="w-full max-w-[113px] outline-none border-none rounded-none">
              <SelectValue placeholder="Bulan" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i} value={String(i + 1)} typeof="number">
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(target) => {
              form.setValue("year", Number(target));
            }}
          >
            <SelectTrigger className="w-full max-w-[113px] outline-none border-none rounded-none">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(new Date().getFullYear() - 1959)].map((_, i) => (
                <SelectItem
                  key={i}
                  value={String(i + 1959 + 1)}
                  typeof="number"
                >
                  {i + 1959 + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
          <ErrorMessage
            errors={errors}
            name={
              form.getFieldState("date").error?.message
                ? "date"
                : form.getFieldState("month").error?.message
                ? "month"
                : "year"
            }
          />
        </div>
        <div className="relative">
          <input
            type="text"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register("email")}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
            <ErrorMessage errors={errors} name={"email"} />
          </div>
        </div>
        <div className="relative">
          <input
            type="password"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register("password")}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Kata sandi <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
            <ErrorMessage errors={errors} name={"password"} />
          </div>
        </div>
        <div className="relative">
          <input
            type="password"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register("confirm_password")}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Konfirmasi kata sandi <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] mb-[5px]">
            <ErrorMessage errors={errors} name={"confirm_password"} />
          </div>
        </div>

        <div className="flex items-start relative min-h-14">
          <input
            type="checkbox"
            className=" mr-3 mt-[3px] relative top-0 min-w-5 min-h-5"
          ></input>
          <div>
            Dengan masuk atau mendaftar, anda menyetujui{" "}
            <Link href="#" className="underline font-semibold">
              Syarat & Ketentuan serta Kebijakan Privasi. .
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-[25px] py-[12px] bg-[#e4002b] max-w-[520px] shadow m-auto"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>

        <span className="m-auto pt-[21px] pb-[25px]">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline font-semibold">
            Masuk disini
          </Link>
        </span>
      </form>
    </Form>
  );
}
