import React from "react";
import Image from "next/image";
import flag from './../../../../../public/assets/images/engFlag.png'
import { Checkbox } from "antd";

function Language() {
    return (
      
            <div className="border flex rounded border-gray px-4 py-2 mr-3">
                <Image
                height={20}
                width={16}
                src={flag}
                className="px-1"
              />
                <span className=" pl-1 pr-10">English</span>
                <Checkbox checked></Checkbox>
            </div>
       
    );
}
export default Language;
