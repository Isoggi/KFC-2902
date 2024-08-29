'use client';
import React from 'react';
import Kfcrun from '@/../public/kfc-run.gif';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <div className="flex justify-center flex-col items-center my-6 ">
      <Image
        alt="success"
        src={Kfcrun}
        width={320}
        height={320}
        className="  aspect-square object-cover w-60"
      />
      <h1 className="my-3 text-2xl font-semibold">Oopss ... {error.message}</h1>
      <p>Something went wrong</p>
    </div>
  );
}
