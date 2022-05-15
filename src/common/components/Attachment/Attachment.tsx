import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import threeDot from '../../../../public/assets/images/threedot.svg'
type Props = {
  src: StaticImageData;
  name?: string | null | undefined;
  enable:boolean
};
function Attachment(props: Props) {
  const { src, name ,enable} = props;
function handleFile(){
  console.log("ds")
}
  return (
    <div className="block">
      <div className="inline-flex items-center  bg-gray-4  pl-4 py-4 my-3 border-gray-9 border rounded">
        <Image
          alt=""
          src={src}
          width={24}
          height={24}
          className="border rounded border-gray-2 "
        />

        <span className="pl-3 ml-2 mr-4">{name}</span>
        {enable && <Popover
        placement="bottomRight"
          content={
            <div>
            
              <p className="pb-0 mb-0 text-red leading-none flex gap-x-2"  onClick={handleFile}><CloseOutlined /><span>Delete</span> </p>

            </div>
          }
        
          trigger="click"
          // visible={this.state.clicked}
          // onVisibleChange={this.handleClickChange}
        >
        <Image
          alt=""
          src={threeDot}
          width={20}
          height={20}
          className="border rounded border-gray-2 rotate-90"
        />
           </Popover>}
      </div>
    </div>
  );
}

export default Attachment;
