/** @format */

import React from "react";
import RegisterComponent from "../components/register.component";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="px-[50px] py-[60px] lg:max-w-[520px] w-full m-auto">
      <b className="text-[32px] mt-5">BUAT AKUN </b>
      <RegisterComponent />
    </div>
  );
}
