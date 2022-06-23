import { Badge, Input, notification, Upload } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import Dragger from "antd/lib/upload/Dragger";

function MessageInput() {
  const [messageText, setMessageText] = useState<string>("");
  const { messageInfo, onMessage } = useMessageContext();
  const [image, setImage] = useState<string>("");
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [fileList, setFileList] = useState([]);

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  function onMessageTextChange(text: string) {
    setMessageText(text);
  }

  const fileUpload = async (files: File[]) => {
    try {
      if (files) {
        const urls = await mediaUploader.uploadMultiple(files);

        let uploadUrlsData = urls?.map((url: any) => ({
          url: url.location,
          name: url.key,
        }));
        return uploadUrlsData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onSendMessage() {
    const urls = await fileUpload(
      fileList?.map(
        ({ originFileObj }: { originFileObj: File }) => originFileObj
      )
    );

    // if (files.length > 0) {
    //   files.forEach((file) => {
    //     onMessage?.(file.name || "", "Media");
    //   });
    //   setFiles([]);
    // } else {
    //   onMessage?.(messageText);
    // }

    if (urls) {
      if (urls.length > 0) {
        urls.map((url) => {
          onMessage?.(url?.url, "File");
        });
        setFiles([]);
        setFileList([]);
      } else {
        onMessage?.(messageText);
      }
    }

    setMessageText("");
  }

  const isShowInput = !!messageInfo.currentChannel?.channelName;

  // For Attachment in Chat
  const fileChange = async (info: any) => {
    try {
      setFiles(info.fileList);
      setFileList(info.fileList);
    } catch (error) {
      console.log(error);
    }
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
            {files.map((file, index) => (
              <span
                className="box-border p-1 pt-3 mr-4 bg-gray-9 font-semibold text-white border rounded-md text-left left-0 mx-1"
                onClick={() => setFiles(files.splice(index, 1))}
              >
                <Badge
                  count={<CloseCircleOutlined style={{ color: "#F5222D" }} />}
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

          <span className="absolute right-14">
            <Dragger
              onChange={fileChange}
              // maxCount={1}
              multiple
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              fileList={files}
              customRequest={() => null}
              accept="image/jpg, image/jpeg,.doc, .pdf,"
            >
              <Image
                priority={true}
                alt=""
                width={25}
                height={25}
                src={attachIcon}
              />
            </Dragger>
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
