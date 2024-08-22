/** @format */
"use client";
import { api } from "@/config/axios.config";
import { IMenu } from "@/interfaces/menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  category: string;
};

export function MenuComponent({ category }: Props) {
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/products", {
        params: {
          category,
        },
      });

      setMenus(res.data);
    };
    fetch();
  }, []);
  return (
    <div className="w-full pt-[150px] -mt-[150px]" id={category}>
      <div className="ml-3 font-bold lg:text-[28px] md:text-[22px] flex items-center mb-[20px] text-nowrap">
        <div className="pr-[15px]">{category}</div>
      </div>
      <div className="grid  xl:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full ">
        {menus.map((_: IMenu, key) => (
          <MenuCard menu={_} key={key} />
        ))}
      </div>
    </div>
  );
}

export function MenuCard({ menu }: { menu: IMenu }) {
  return (
    <div className="shadow-lg border  p-[10px] mx-[10px] mb-[25px]  md:grid md:grid-cols-1 flex">
      <div className="aspect-square  md:aspect-square h-full max-w-[194px] md:max-w-max 2xl:max-w-[320px] w-full flex pb-8 md:pb-0">
        <Image
          src={menu.img_src}
          alt="gambar"
          width={320}
          height={320}
          className=" object-cover w-full"
        />
      </div>
      <div className=" pt-[5px] px-[15px] w-full flex flex-col justify-between text-xs sm:text-sm  ">
        <div className="flex flex-col md:flex-row justify-between font-bold lg:text-lg mb-[10px] ">
          <div>{menu.product_name}</div>
          <div className="mt-[15px] md:mt-0">
            Rp{menu.price?.toLocaleString("id-ID")}
          </div>
        </div>
        <div className="mb-[35px]  sm:text-sm">{menu.description}</div>
        <div className="md:pb-[15px] flex  justify-end">
          <button className="min-h-8 p-[5px] md:py-3 md:px-[2px] md:h-screen md:max-h-[47px] md:w-full h-8  rounded md:rounded-[25px] bg-[#e4002b] font-bold text-white shadow">
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  );
}
