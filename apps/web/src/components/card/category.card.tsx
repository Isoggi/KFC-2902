/** @format */
"use client";
import { api } from "@/config/axios.config";
import { ICategory } from "@/interfaces/category";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CategoryCardList({}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="py-[27px] w-full">
      <div className="ml-3 font-bold text-[28px] flex items-center mb-[20px] text-nowrap">
        <div className="pr-[15px]">JELAJAHI KATEGORI</div>
        <div className="h-0.5 w-full border-t " />
      </div>
      <div className="grid grid-cols-4">
        {categories.map((category, key) => (
          <CategoryCard key={key} category={category} />
        ))}
      </div>
    </div>
  );
}

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="py-[6px] px-3 mb-[10px] ">
      <div className="border rounded shadow">
        <Image
          alt=""
          width={330}
          height={272}
          className="w-full aspect-[330/272] rounded-t"
          src={category.img_src}
        />
        <div className="text-[19px] font-bold flex items-center py-4 px-[10px]">
          {category.category}
          <ChevronRight width={18} height={18} />
        </div>
      </div>
    </div>
  );
};
