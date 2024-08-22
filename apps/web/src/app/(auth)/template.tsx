/** @format */

import ProviderContent from "@/components/provider/content.provider";
import Image from "next/image";
import React from "react";
import AbahKFC from "@/../public/abah-kfc.jpeg";
type Props = {
  children: React.ReactNode;
};

export default function template({ children }: Props) {
  return (
    <ProviderContent>
      <div className="w-full grid lg:grid-cols-2 ">
        <div className="bg-[#E21C2A] hidden lg:block w-full max-w-[634px] relative  m-auto h-full px-[23px]">
          <Image
            src={AbahKFC}
            alt=""
            width={634}
            height={634}
            className="w-full aspect-square m-auto "
          />
        </div>
        {children}
      </div>
    </ProviderContent>
  );
}
