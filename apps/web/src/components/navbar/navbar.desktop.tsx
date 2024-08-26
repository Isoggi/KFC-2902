/** @format */
import Image from 'next/image';
import React from 'react';
import Logo from '@/../public/kfc-logo.svg';
import Logo2 from '@/../public/kfc-logo2.svg';

import Link from 'next/link';
import './navbar.css';
import { auth } from '@/auth';
import ButtonLogout from './button.navbar';
import { Menu } from 'lucide-react';
export default async function NavbarDesktop() {
  const session = await auth();

  return (
    <div className="w-full shadow fixed top-0 bg-white z-50  border-b">
      <div className="  max-w-[1220px]  2xl:max-w-[1440px] m-auto w-full p-3 px-[15px] flex justify-between">
        <div className="flex w-full items-center">
          <button className="ml-[14px] md:hidden block">
            <Menu width={20} height={19} />
          </button>
          <Link href={'/'}>
            <Image
              src={Logo}
              alt=""
              width={150}
              height={78}
              className="w-[150px] h-[78px] hidden md:block"
            />

            <Image
              src={Logo2}
              alt=""
              width={100}
              height={23}
              className="w-[100px] h-[23px] md:hidden block object-cover"
            />
          </Link>

          <Link
            href="/menu"
            className="md:flex items-center w-[85px] text-lg  justify-end font-bold hidden"
          >
            MENU
          </Link>
          <Link
            href="/"
            className="flex items-center w-[85px] text-lg  justify-end font-bold"
          >
            {session?.user?.gender}
          </Link>
        </div>

        <div className="flex max-w-[465px] w-full text-[15px] items-center justify-end">
          <Link
            href={'#'}
            className="text-[#e4002b] font-bold mr-[6px] hidden md:inline-block"
          >
            Kode Promosi
          </Link>
          <Link href={'#'} className="font-bold">
            English
          </Link>

          <div className="flex items-center">
            {session?.user?.image ? (
              <Image
                alt=""
                width={30}
                height={30}
                className="w-[30px] aspect-square rounded-full mx-4"
                src={session.user?.image}
              />
            ) : (
              <div className="avatar"></div>
            )}
            <div className="cart">1</div>
          </div>

          <ButtonLogout />
        </div>
      </div>
    </div>
  );
}
