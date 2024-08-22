/** @format */

import React from "react";
import ProviderContent from "../provider/content.provider";
import Link from "next/link";
import Image from "next/image";
import LogoApple from "@/../public/app/logo_appstore.png";
import LogoPlaystore from "@/../public/app/logo_playstore.png";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className=" bg-[#202124] w-full absolute bottom-0 ">
      <ProviderContent>
        <div className="grid grid-cols-5 text-white w-full pt-[50px] pb-[20px] px-[15px] ">
          <div>
            <b className="pt-[15px] pr-[25px] pb-[10px] block">Menu Category</b>
            <div className="text-[#ABABAB] text-sm pb-[15px] pr-[15px]">
              <div className="mb-[6px]">Special</div>
              <div className="mb-[6px]">Combo</div>
              <div className="mb-[6px]">Alacarte</div>
              <div className="mb-[6px]">Drinks</div>
              <div className="mb-[6px]">Kids Meal</div>
              <div className="mb-[6px]">Dessert</div>
            </div>
          </div>
          <div>
            <b className="pt-[15px] pr-[25px] pb-[10px] block">Hubungi Kami</b>
            <div className="text-[#ABABAB] text-sm pb-[15px] pr-[15px]">
              <div className="mb-[6px]">Hubungi kami</div>
            </div>
          </div>
          <div>
            <b className="pt-[15px] pr-[25px] pb-[10px] block">Voucher</b>
            <div className="text-[#ABABAB] text-sm pb-[15px] pr-[15px]">
              <div className="mb-[6px]">Voucher saya</div>
            </div>
          </div>
          <div>
            <b className="pt-[15px] pr-[25px] pb-[10px] block">Kebijkan</b>
            <div className="text-[#ABABAB] text-sm pb-[15px] pr-[15px]">
              <div className="mb-[6px]">Voucher pribadi</div>
              <div className="mb-[6px]">Syarat dan Ketentuan</div>
            </div>
          </div>
          <div>
            <b className="pt-[15px] pr-[25px] pb-[10px] block">Download Ap</b>
            <div className="text-[#ABABAB] text-sm pb-[15px] pr-[15px]">
              <div className="mb-[6px] flex gap-[6px]">
                <Link href={"/"}>
                  <Image
                    alt=""
                    width={136}
                    height={42}
                    src={LogoApple}
                    className="w-[136px] h-[42px] "
                  />
                </Link>
                <Link href={"/"}>
                  <Image
                    alt=""
                    width={136}
                    height={42}
                    src={LogoPlaystore}
                    className="w-[136px] h-[42px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="' text-[#ABABAB] text-center w-full h-[35px] mt-5 pb-20">
          by PT FASTFOOD Indonesia Tbk. | All rights reserved.
        </div>
      </ProviderContent>
    </div>
  );
}
