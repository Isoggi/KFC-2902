/** @format */
"use client";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";

import { ErrorMessage } from "@hookform/error-message";
import Google from "@/../public/google_icon.5b8ad5292f705ef0c229.ico";
type Props = {};
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/config/axios.config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { googleAuthenticate, loginAction } from "@/action/auth.action";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function LoginComponent({}: Props) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });
  const router = useRouter();
  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await loginAction(values)
      .then((res) => {
        toast(res.message);
        router.push("/");
      })
      .catch((err) => {
        if (err instanceof Error)
          toast(err.message, {
            style: {
              background: "red",
              border: "none",
              color: "#fff",
            },
          });
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

        <div className="w-full text-right mb-[25px]">
          <Link href="#" className="">
            Lupa kata sandi?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-[25px] py-[12px] min-h-14  bg-[#28a745]  shadow m-auto"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
      <div className="font-bold  text-[18px] mt-[21px]  ">
        ATAU MASUK DENGAN:
      </div>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full rounded-[25px] py-[12px] min-h-14   bg-black shadow m-auto my-[10px]"
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Image
              src={
                "data:image/png;base64,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"
              }
              alt="Google"
              width={30}
              height={30}
              className="w-[30px] h-[30px] "
            />
            {" Masuk dengan Apple"}
          </>
        )}
      </Button>

      <form action={dispatchGoogle}>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-[25px] py-[12px] min-h-14  bg-[#e4002b]  shadow m-auto mb-[10px]"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Image
                src={Google}
                alt="Google"
                width={30}
                height={30}
                className="w-[30px] h-[30px] mr-2 "
              />
              {" Masuk dengan Google"}
            </>
          )}
        </Button>
      </form>

      <span className="m-auto pt-[21px] pb-[25px]">
        Belum punya akun?{" "}
        <Link href="/register" className="underline font-semibold">
          Daftar
        </Link>
      </span>
    </Form>
  );
}
