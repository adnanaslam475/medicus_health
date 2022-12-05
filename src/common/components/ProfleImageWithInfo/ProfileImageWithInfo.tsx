import Image from "next/image";
import React from "react";
import yourImage from "../../../../public/assets/images/profile.jpg";
import MDNextImage from "../MDNextImage/MDNextImage";

type props = {
  name: string | undefined;
  serviceName: string | undefined;
  imageUrl: string | undefined | null;
};

function ProfileImageWithInfo({ name, serviceName, imageUrl }: props) {
  return (
    <div className="w-full  my-3 flex gap-6 items-center">
      <div className="relative">
        <MDNextImage
          priority={true}
          alt="Profile Image"
          objectFit="cover"
          src={imageUrl || ""}
          layout="fixed"
          width={74}
          height={74}
          className="bg-gray border rounded-full border-gray"
          fallbackImage="/assets/images/profile.svg"
        />
        {/* <Image
          priority={true}
          alt="Profile Image"
          height="74"
          width="74"
          onError={(e) => console.log(e)}
          src={imageUrl || yourImage}
          className="bg-gray border rounded-full border-gray"
          objectFit="cover"
        /> */}
      </div>

      <div className="flex flex-col">
        <h2 className="mb-0">{name}</h2>
        <span className="block">{serviceName}</span>
      </div>
    </div>
  );
}

export default ProfileImageWithInfo;
