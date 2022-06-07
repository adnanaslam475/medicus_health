import Image from "next/image";
import React from "react";
import yourImage from "../../../../public/assets/images/doc-pic-big.png";

type props = {
  name: string | undefined;
  serviceName: string | undefined;
  imageUrl: string | undefined;
};

function ProfileImageWithInfo({ name, serviceName, imageUrl }: props) {
  return (
    <div className="w-full  my-3 flex gap-6 items-center">
      <div className="relative">
        <Image
          alt="Profile Image"
          height="74"
          width="74"
          onError={(e) => console.log(e)}
          src={imageUrl || yourImage}
          className="bg-gray border rounded-full border-gray"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="mb-0">{name}</h2>
        <span className="block">{serviceName}</span>
      </div>
    </div>
  );
}

export default ProfileImageWithInfo;
