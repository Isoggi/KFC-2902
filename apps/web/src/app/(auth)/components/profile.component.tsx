/** @format */
'use client';
import { registerSchema, updateProfileSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ErrorMessage } from '@hookform/error-message';
import Avatar from '@/../public/avatar.jpeg';
type Props = { session: Session | null };
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { actionRegister, actionUpdateProfile } from '@/action/auth.action';
import { Session, User } from 'next-auth';
import Image from 'next/image';
import { avatar_src } from '@/config/image.config';
import { useSession } from 'next-auth/react';
export default function ProfileComponent() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session?.user) setUser(session?.user);
  }, [session]);
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      full_name: user?.full_name!,
      gender: user?.gender!,
      image: user?.image!,
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const form = new FormData();
    form.append('full_name', values.full_name);
    form.append('gender', values.gender);
    form.append('image', values.image);

    await actionUpdateProfile(form)
      .then((res) => {
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
        <div className="relative m-auto py-5">
          <Image
            alt="avatar"
            width={200}
            height={200}
            src={
              form.watch('image') instanceof File
                ? window.URL.createObjectURL(form.watch('image'))
                : form.watch('image')
                  ? avatar_src + user?.image
                  : Avatar
            }
            className="rounded-full w-[200px] aspect-square object-cover"
            onClick={() => ref.current?.click()}
          />
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                form.setValue('image', file);
              }
            }}
            accept="image/*"
            ref={ref}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            className="block rounded-t-lg  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2 focus-within:border-red-500  peer z-10 relative bg-transparent"
            placeholder=" "
            {...register('full_name')}
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]">
            <ErrorMessage errors={errors} name={'full_name'} />
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="block rounded-t-lg disabled:text-gray-400  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            value={user?.phone_number}
            disabled
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Nomor handphone <span className="text-red-500">*</span>
          </label>
        </div>

        <Select
          onValueChange={(target) => {
            if (target === 'Pria' || target === 'Perempuan')
              form.setValue('gender', target);
          }}
          value={user?.gender}
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
          <ErrorMessage errors={errors} name={'gender'} />
        </div>
        <label className=" text-[15px]">
          Tanggal Lahir*{' '}
          <span className="text-red-500 text-[12.5px]">
            (tidak dapat diubah)
          </span>
        </label>

        <div className="flex gap-1 border-b max-w-[339px]">
          <Select
            disabled
            value={String(new Date(user?.birth_date!).getDate())}
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
            disabled
            value={String(new Date(user?.birth_date!).getMonth() + 1)}
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
            disabled
            value={String(new Date(user?.birth_date!).getFullYear())}
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
        <div className="text-red-500 pt-[5px] min-h-[25px] text-[13px]"></div>
        <div className="relative">
          <input
            type="text"
            className="block rounded-t-lg disabled:text-gray-400  pb-2 pt-5 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-2  peer z-10 relative bg-transparent"
            placeholder=" "
            value={user?.email!}
            disabled
          />
          <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-0 origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Email <span className="text-red-500">*</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[25px] py-[12px] bg-[#e4002b] max-w-[520px] shadow m-auto"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
