import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Image from "next/image";
import React from "react";
import threeDot from "../../../../public/assets/images/threedot.svg";
import MediaFile from "./DynamicAttachment";
import _classes from "./Attachment.module.scss";
import { AttachmentObject } from "common/types/types";

type Props = {
  item?: AttachmentObject;
  enable: boolean;
};
function Attachment(props: Props) {
  const { item, enable } = props;
  const { name, url } = item || {};
  function handleFile() {
    console.log("ds");
  }
  let attachementExtension = item?.name && item?.name?.split(".")[1];
  return (
    <div className="block">
      <div className="inline-flex items-center  bg-gray-4  pl-4 py-4 my-3 border-gray-9 border rounded">
        <a
          href={url}
          download
          target="_blank"
          rel="noreferrer"
          className={`${_classes["attachment"]} `}
        >
          <MediaFile type={attachementExtension} />
          <span className="pl-3 ml-2 mr-4">{name}</span>
        </a>
        {enable && (
          <Popover
            placement="bottomRight"
            content={
              <div>
                <p
                  className="pb-0 mb-0 text-red leading-none flex gap-x-2"
                  onClick={handleFile}
                >
                  <CloseOutlined />
                  <span>Delete</span>
                </p>
              </div>
            }
            trigger="click"
          >
            <Image
              alt=""
              src={threeDot}
              width={20}
              height={20}
              className="border rounded border-gray-2 rotate-90"
            />
          </Popover>
        )}
      </div>
    </div>
  );
}

export default Attachment;
