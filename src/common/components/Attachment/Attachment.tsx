import Image from "next/image";
import React from "react";

type Props = {
  src: StaticImageData;
  name?: string | null | undefined;
};
function Attachment(props: Props) {
  const { src, name } = props;

  return (
    <div className="block">
      <div className="inline-flex bg-gray-4 p-4 my-3 border-gray-9 border rounded">
        <Image
          alt=""
          src={src}
          width={24}
          height={24}
          className="border rounded border-gray-2"
        />

        <span className="pl-3">{name}</span>
      </div>
    </div>
  );
}

export default Attachment;
