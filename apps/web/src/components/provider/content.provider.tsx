/** @format */

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProviderContent({ children }: Props) {
  return (
    <div className="w-full">
      <div className="  max-w-[1220px]  2xl:max-w-[1440px] m-auto w-full  flex justify-between flex-col">
        {children}
      </div>
    </div>
  );
}
