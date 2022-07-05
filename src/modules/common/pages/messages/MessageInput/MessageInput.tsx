import { Badge, Input, notification, Upload } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import _classes from "./MessageInput.module.scss";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import smile from "./../../../../../../public/assets/images/smile.svg";
import send from "./../../../../../../public/assets/images/send.svg";
import { useMessageContext } from "../MessageDetail/MessageContext";
import { useMediaUploader } from "common/hooks/media";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";
import { CloseCircleOutlined } from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";

function MessageInput() {
  const [messageText, setMessageText] = useState<string>("");
  const { messageInfo, onMessage } = useMessageContext();
  const [fileList, setFileList] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);

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

    if (urls) {
      if (urls.length > 0) {
        urls.map((url) => {
          onMessage?.(url?.url, "Media");
        });
        setFileList([]);
      } else {
        onMessage?.(messageText, "Text");
      }
    }

    setMessageText("");
  }

  const isShowInput = !!messageInfo.currentChannel?.channelName;

  // For Attachment in Chat
  const fileChange = async (info: any) => {
    try {
      let compareFiles = info.fileList?.filter(
        (item: any, index: any) => item?.name == filteredFiles[index]?.name
      );
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

  const deleteFile = (index: number) => {
    let filteredFiles = fileList.filter(
      (item, itemIndex) => itemIndex != index
    );
    setFileList(filteredFiles);
    setFilteredFiles(filteredFiles);
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
            {fileList.map((file, index) => (
              <span
                className="box-border p-1 pt-3 mr-4 bg-gray-9 font-semibold text-white border rounded-md text-left left-0 mx-1"
                onClick={() => deleteFile(index)}
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
            <span className="h-10">
              <Dragger
                onChange={fileChange}
                // maxCount={1}
                multiple
                beforeUpload={onBeforeUpload}
                itemRender={() => <div />}
                fileList={fileList}
                customRequest={() => null}
                accept="image/jpg, image/jpeg,.doc, .pdf,"
                className={`${_classes["attachment-upload-btn"]} py-0`}
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
