'use client';

import { actionLogout } from '@/action/auth.action';

import { Menu } from 'lucide-react';
import { Session, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
export function MenuBar({ user }: { user: User | null }) {
  const [open, setOpen] = useState<boolean>(false);

  const logout = async () => {
    await actionLogout().then(() => {
      toast('Logout Success');
    });
  };
  return (
    <div className="">
      <div className="flex items-center">
        <Menu
          width={25}
          height={33}
          className="ml-[14px] "
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={`  absolute bg-white w-32 ${open ? 'block' : 'hidden'} -mx-8 rounded-md my-2 text-center border shadow flex flex-col`}
      >
        <button className={'p-2 border-b'}>Home</button>
        <Link href={'/profile'}>
          <button className={'p-2 border-b'}>Profile</button>
        </Link>

        <button
          className={`p-2  ${user ? 'block' : 'hidden'}`}
          onClick={logout}
        >
          Logout
        </button>
        <Link href="/login" className={`p-2  ${user ? 'hidden' : 'block'}`}>
          Login
        </Link>
      </div>
    </div>
  );
}
