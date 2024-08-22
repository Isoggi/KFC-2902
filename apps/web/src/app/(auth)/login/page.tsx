/** @format */

import React from "react";
import RegisterComponent from "../components/register.component";
import LoginComponent from "../components/login.component";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="p-[30px]  w-full lg:max-w-[520px] m-auto">
      <div className="text-[32px] mb-5 font-bold">MASUK </div>
      <div className="text-[15px] mb-[14px]">
        (Pengguna dapat masuk dengan kredensial aplikasi KFCKU)
      </div>
      <LoginComponent />
    </div>
  );
}
