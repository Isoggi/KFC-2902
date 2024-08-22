/** @format */

"use client";
import { api } from "@/config/axios.config";
import { ICategory } from "@/interfaces/category";
import React, { useEffect, useState } from "react";
import { MenuComponent } from "./menu.component";
import MenuBarComponent from "./menubar.component";
import { useSession } from "next-auth/react";

export default function MenuListCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      <MenuBarComponent categories={categories} />
      <div className="md:pt-28 pt-16 ">
        {categories.map((_, key) => (
          <MenuComponent category={_.category} key={key} />
        ))}
      </div>
    </>
  );
}
