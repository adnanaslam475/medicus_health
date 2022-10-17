import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import { notification, Popover } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import threeDot from "../../../../public/assets/images/threedot.svg";
import MediaFile from "./DynamicAttachment";
import _classes from "./Attachment.module.scss";
import { AttachmentObject } from "common/types/types";

type Props = {
  item?: AttachmentObject;
  enable: boolean;
  setDeletedUrl?: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
};
function Attachment(props: Props) {
  const { item, enable, setDeletedUrl, loading } = props;
  const { name, url } = item || {};
  function handleFile() {
    if (url) {
      notification.success({ message: "Attachment deleted" });
      setVisible(false);
      setDeletedUrl?.(url);
    }
  }
  let attachementExtension = item?.name && item?.name?.split(".")[1];

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <div className="block">
      <div className="inline-flex items-center  bg-gray-4  pl-4 py-4 my-3 border-gray-9 border rounded">
        <a
          href={url}
          // download
          target="_blank"
          rel="noreferrer"
          className={`${_classes["attachment"]} `}
        >
          <MediaFile type={attachementExtension} />
          <span className="pl-0 md:pl-3 ml-2 mr-4">{name}</span>
        </a>
        {enable && (
          <Popover
            placement="bottomRight"
            destroyTooltipOnHide={{
              keepParent: false,
            }}
            visible={visible}
            onVisibleChange={handleVisibleChange}
            content={
              <div>
                <p
                  className="pb-0 mb-0 text-red leading-none flex gap-x-2"
                  onClick={handleFile}
                >
                  <CloseOutlined />
                  <span className="cursor-pointer">
                    {loading ? "Deleting" : "Delete"}
                  </span>
                </p>
              </div>
            }
            trigger="click"
          >
            <Image
              priority={true}
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
