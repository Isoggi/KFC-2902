/** @format */

import ProviderContent from "@/components/provider/content.provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function template({ children }: Props) {
  return <ProviderContent>{children}</ProviderContent>;
}
