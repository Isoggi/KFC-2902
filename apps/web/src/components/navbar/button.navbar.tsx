/** @format */

"use client";
import { actionLogout } from "@/action/auth.action";
import { Menu } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {};

export default function ButtonLogout({}: Props) {
  const logout = async () => {
    await actionLogout().then(() => {
      toast("Logout Success");
    });
  };
  return (
    <button className="ml-[14px] hidden md:block" onClick={logout}>
      <Menu width={25} height={33} />
    </button>
  );
}
