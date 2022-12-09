import React from "react";
import Image from "next/image";
import {StaticImageData} from "next/image";
import { Checkbox } from "antd";

type Prop = {
  end: StaticImageData;
  title: string;
  check: boolean;
  disable: boolean;
};
function Language(props: Prop) {
  const { end, title, check, disable } = props;
  console.log(props);

  return (
    <div className="border flex rounded border-gray px-4 py-2 mr-3">
      <Image
        priority={true}
        height={20}
        width={20}
        src={end}
        className="px-1"
      />
      <span className=" pl-1 pr-10">{title}</span>
      {disable && <Checkbox checked={check}></Checkbox>}
    </div>
  );
}
export default Language;
