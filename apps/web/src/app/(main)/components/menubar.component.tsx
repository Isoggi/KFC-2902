/** @format */
"use client";
import ProviderContent from "@/components/provider/content.provider";
import { ICategory } from "@/interfaces/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  categories: ICategory[];
};

export default function MenuBarComponent({ categories }: Props) {
  const [scroll, setScroll] = useState<number>(0);
  //   const menu: string[] = [
  //     "special",
  //     "combo",
  //     "kfc bucket",
  //     "ala carte",
  //     "drinks",
  //     "kids meal",
  //     "coffee",
  //     "breakfast",
  //     "dessert",
  //   ];
  const [select, setSelect] = useState<string>("Spesial");
  return (
    <div className="left-0 w-full outline-none font-sans  fixed top-[67px] md:top-[102px] border-t z-[1000] bg-white h-[40px] md:h-[45px] ">
      <div className="  max-w-[1220px]  2xl:max-w-[1440px] m-auto w-full  flex justify-between flex-col relative">
        <div className="bg-white absolute left-0  z-10 top-0 h-[45px] md:flex hidden items-center ">
          <ChevronLeft
            className={`relative left-0  ${scroll <= 0 ? "hidden" : "block"} `}
            onClick={() => {
              const selector = document.getElementById("menubar");
              selector?.scrollTo({
                left: selector.scrollLeft - 180,
                behavior: "smooth",
              });
              setScroll((_) => (selector?.scrollLeft! - 180) | 0);
            }}
          />
        </div>
        <div
          id="menubar"
          className="md:text-xl text-[15px] border-b pt-2 mb-[30px] flex font-bold uppercase overflow-x-scroll md:overflow-hidden max-w-[1220px]  2xl:max-w-[1440px] px-[15px] relative text-[rgba(0, 0, 0, .5)] "
        >
          {categories.map((_, key) => (
            <Link
              href={"#" + _.category}
              key={key}
              className={`mx-[2.1rem] border-b-[5px]  uppercase  ${
                _.category == select
                  ? " border-red-500 text-black"
                  : " border-white text-[rgba(0,0,0,.5)]"
              }  text-nowrap p-[2px]`}
              onClick={() => {
                setSelect(_.category);
              }}
            >
              {_.category}
            </Link>
          ))}
        </div>
        <div className="bg-white absolute right-0  z-10 top-0 h-[45px] md:flex hidden items-center ">
          <ChevronRight
            className="relative right-0"
            onClick={() => {
              const selector = document.getElementById("menubar");
              selector?.scrollTo({
                left: selector.scrollLeft + 180,
                behavior: "smooth",
              });

              setScroll((_) => (selector?.scrollLeft! + 180) | 0);
            }}
          />
        </div>
      </div>
    </div>
  );
}
