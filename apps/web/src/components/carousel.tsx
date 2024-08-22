/** @format */
"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Item1 from "@/../public/carousel/jagonya_original.webp";
import Item2 from "@/../public/carousel/paket-seru.webp";
import Autoplay from "embla-carousel-autoplay";

type Props = {};

export default function CarouselKFC({}: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        <CarouselItem>
          <Image
            alt=""
            src={Item1}
            width={1610}
            height={523}
            className="w-full"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={Item2}
            alt=""
            width={1610}
            height={523}
            className="w-full"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
