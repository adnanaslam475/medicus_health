import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  title: string;
  value: number | string;
};

function StatisticsCard({ src, title, value }: Props) {
  return (
    <div
      className={`bg-gray-4 border border-gray-4 flex flex-col py-20 px-4 mx-4 my-3`}
    >
      <div className="rounded-full bg-white px-3 border border-gray-4 mx-auto p-2 pb-1 shadow-md text-center  ">
        <Image
          priority={true}
          unoptimized
          alt=""
          className="dashboardIcons m-h-[30px]"
          height={30}
          width={28}
          src={src}
        />
      </div>

      <div className="xs:text-2xl sm:text-6xl mx-auto px-auto text-center py-2 font-circular ">
        {value}
      </div>
      <div className="text-center xs:text-sm sm:text-xl">{title} </div>
    </div>
  );
}

export default StatisticsCard;
