import React from "react";
import { Avatar, Button } from "antd";
import Image from "next/image";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import { isChrome } from "utils/helper";

const HealthQuestionair = () => {
  return (
    <>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            <Avatar
              src={
                <Image
                  priority={true}
                  alt=""
                  src={yourImage}
                  width={64}
                  height={64}
                  className="border rounded border-gray-2"
                />
              }
            />
            <a href="void(0)" className="text-primary underline ml-3 text-xs">
              Update photo
            </a>
          </div>
          <Button type="default" className={`text-xs p-5 ${isChrome && 'antCustomBtn'}`} size="large">
            <span className="text-xs">Edit</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HealthQuestionair;
