import { Radio } from "antd";
import Image from "next/image";
import React from "react";
import _classes from "./Payment.module.scss";

type Props = {
  cardId: number;
  visa: StaticImageData;
  title?: string;
  description?: string;
};
function Payment(props: Props) {
  const { cardId, visa, title, description } = props;

  return (
    <div className="bg-gray-4 flex items-center py-3 px-3 pr-10 rounded my-3">
      <Radio className={`bg-gray-4 ${_classes["radio-div"]}`} value={cardId}>
        <div className="rounded px-2 pb-0 mb-0 pt-2">
          <Image
            alt=""
            src={visa}
            width={46}
            height={24}
            className="border rounded border-gray-2"
          />
        </div>
        <div className="px-2">
          <h6 className="text-md capitalize text-dark font-medium">{title}</h6>
          <p className="text-gray-2">{description}</p>
        </div>
      </Radio>
    </div>
  );
}

export default Payment;
