/** @format */

import React from "react";

type Props = {
  params: {
    order_name: string;
  };
};

export default function page({ params }: Props) {
  return <div>{params.order_name}</div>;
}
