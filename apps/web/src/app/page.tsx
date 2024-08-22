/** @format */

import CategoryCardList from "@/components/card/category.card";
import CarouselKFC from "@/components/carousel";
import ProviderContent from "@/components/provider/content.provider";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <CarouselKFC />
      <ProviderContent>
        <CategoryCardList />
      </ProviderContent>
    </>
  );
}
