import { Badge, Input, notification, Upload } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import _classes from "./MessageInput.module.scss";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import smile from "./../../../../../../public/assets/images/smile.svg";
import send from "./../../../../../../public/assets/images/send.svg";
import { useMessageContext } from "../MessageDetail/MessageContext";
import { useMediaUploader } from "common/hooks/media";
import { UploadChangeParam } from "antd/lib/upload";
import error from "next/error";
import { UploadFile } from "antd/lib/upload/interface";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";
import { CloseCircleOutlined } from "@ant-design/icons";

function MessageInput() {
  const [messageText, setMessageText] = useState<string>("");
  const { messageInfo, onMessage } = useMessageContext();
  const [image, setImage] = useState<string>("");
  const [files, setFiles] = useState<UploadFile<any>[]>([]);

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  function onMessageTextChange(text: string) {
    setMessageText(text);
  }

  console.log(files, "usama");

  function onSendMessage() {
    if (files.length > 0) {
      files.forEach((file) => {
        onMessage?.(file.name || "", "Media");
      });
      setFiles([]);
    } else {
      onMessage?.(messageText);
    }

    setMessageText("");
  }
  const isShowInput = !!messageInfo.currentChannel?.channelName;

  // For Attachment in Chat
  const fileChange = async (info: UploadChangeParam) => {
    try {
      console.log({ info });
      setFiles(info.fileList);
      // const url = await mediaUploader.upload(info.file.originFileObj as File);
      // if (url) {
      // setImage(url?.location);
      // }
    } catch (error) {}
    // if (error) {
    //   notification.error({
    //     message: error?.graphQLErrors[0]?.message || "Something went wrong",
    //   });
    // }
  };

  const onBeforeUpload = (file: File) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg";
    return isPNG || isJPG || Upload.LIST_IGNORE;
  };

  return (
    <div className={`${_classes["message-input"]} relative`}>
      {isShowInput && (
        <>
          <Input
            placeholder="Type a new message"
            onChange={({ target }) => onMessageTextChange(target.value)}
            onPressEnter={onSendMessage}
            value={messageText}
          />
          <div className="absolute left-0 top-2 bg-gray-5">
            {files.map((file) => (
              <span className="box-border p-1 pt-3 bg-gray-9 font-semibold text-white border rounded-md text-left left-0 mx-1">
                {/* {files?.length} */}
                <Badge
                  count={
                    <CloseCircleOutlined
                      // onclick={}
                      style={{ color: "#F5222D" }}
                    />
                  }
                >
                  <Image
                    priority={true}
                    alt=""
                    width={25}
                    height={25}
                    src={fileIcon}
                  />
                </Badge>
              </span>
            ))}
          </div>

          <span className="absolute top-3 right-14">
            <Upload
              onChange={fileChange}
              // maxCount={1}
              multiple
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              fileList={files}
              customRequest={() => null}
              accept="image/jpg, image/jpeg,"
            >
              <Image
                priority={true}
                alt=""
                width={25}
                height={25}
                src={attachIcon}
              />
            </Upload>
          </span>
          {/* <span className="absolute top-3 right-14">
            <Image priority={true} alt="" width={25} height={25} src={smile} />
          </span> */}
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={onSendMessage}
          >
            <Image
              priority
              unoptimized
              alt=""
              width={25}
              height={25}
              src={send}
            />
          </span>
        </>
      )}
    </div>
  );
}

export default MessageInput;
