import React, { useEffect, useState, useRef } from "react";
import {
  Badge,
  Input,
  message,
  notification,
  Progress,
  Spin,
  Upload,
} from "antd";
import Image, { StaticImageData } from "next/image";
import _classes from "./MessageInput.module.scss";
import attachIcon from "./../../../../../../public/assets/images/attach.svg";
import smile from "./../../../../../../public/assets/images/smile.svg";
import send from "./../../../../../../public/assets/images/send.svg";
import { useMessageContext } from "../MessageDetail/MessageContext";
import { useMediaUploader } from "common/hooks/media";
import fileIcon from "./../../../../../../public/assets/icon/file-icon.svg";
import { CloseCircleOutlined, FastForwardOutlined } from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";
import { getFileImageIcon, hasValidMessage } from "common/utils/helper";
import TextArea from "antd/lib/input/TextArea";

function MessageInput() {
  const [messageText, setMessageText] = useState<string>("");
  const [enabled, setEnabled] = useState(true);
  const [loader, setLoader] = React.useState<boolean>(false);
  const {
    messageInfo,
    onMessage,
    createChatFetching,
    markMessageAsReadHandler,
  } = useMessageContext();

  const [fileList, setFileList] = useState([]);
  const inputRef: any = useRef<null | HTMLElement>(null);
  // const idRef: any = useRef<null | HTMLElement>(null);

  const [messageType, setMessageType] = useState("");
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
    setLoader(true);
    setEnabled(false);
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
        setMessageType("Media");
        setFileList([]);
      } else {
        //checking if message contains Aplhanumeric and special characters and not contain only white spaces
        if (hasValidMessage(messageText)) {
          console.log("messageText", messageText);
          onMessage?.(messageText, "Text");
          setMessageType("Text");
        }
      }
    }
    setEnabled(true);
    setMessageText("");
    setLoader(false);
    if (inputRef.current && messageInfo.currentChannel) {
      markMessageAsReadHandler?.(messageInfo.currentChannel?.id);
    }
  }

  const isShowInput = !!messageInfo.currentChannel?.channelName;

  useEffect(() => {
    inputRef.current && inputRef?.current.focus();
    if (inputRef.current && messageInfo.currentChannel) {
      markMessageAsReadHandler?.(messageInfo.currentChannel?.id);
    }
  }, [messageInfo.currentChannel?.id]);

  // For Attachment in Chat
  const fileChange = async (info: any) => {
    try {
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
  };

  return (
    <div className={`${_classes["message-input"]} relative`}>
      {createChatFetching && messageType === "Media" ? (
        <div className="">
          <Progress
            percent={100}
            showInfo={true}
            strokeColor={{
              "0%": "#1a82fe",
              "100%": "#1a82fe",
            }}
          />
        </div>
      ) : (
        isShowInput && (
          <>
            <TextArea
              rows={2}
              placeholder="Type a new message"
              ref={inputRef}
              onChange={({ target }) => onMessageTextChange(target.value)}
              onKeyPress={(eve) => {
                if (
                  eve.nativeEvent.shiftKey &&
                  eve.nativeEvent.key === "Enter"
                ) {
                  onSendMessage();
                } else {
                }
              }}
              value={messageText}
            />
            <div className="absolute left-0 top-2 bg-gray-5">
              {fileList.map((file: any, index) => (
                <>
                  <span
                    className="box-border p-1 pt-3 mr-4 bg-gray-9 font-semibold text-white border rounded-md text-left left-0 mx-1"
                    onClick={() => deleteFile(index)}
                  >
                    <Badge
                      count={
                        <CloseCircleOutlined style={{ color: "#F5222D" }} />
                      }
                    >
                      <Image
                        priority={true}
                        alt=""
                        width={25}
                        height={25}
                        // src={fileIcon}
                        src={
                          getFileImageIcon(file?.name) as
                            | string
                            | StaticImageData
                        }
                      />
                    </Badge>
                  </span>
                </>
              ))}
            </div>

            <span className="absolute top-4 right-14">
              <span className="h-10">
                <Dragger
                  onChange={fileChange}
                  // maxCount={1}
                  multiple
                  beforeUpload={onBeforeUpload}
                  itemRender={() => <div />}
                  fileList={fileList}
                  customRequest={() => null}
                  accept=".doc,.csv,.docx,.pdf,.zip,.tiff,.tga,image/jpg,image/jpeg,image/jpg,image/bmp,image/x-tga,image/png,image/tga,application/msword,"
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
            <span
              className="absolute top-7 right-4 cursor-pointer"
              onClick={enabled ? onSendMessage : () => null}
            >
              {/* {loader && messageType === "Media" ? (
              // <Spin />
              <Progress percent={50} status="active" />
            ) : ( */}
              <Image
                priority
                unoptimized
                alt=""
                width={25}
                height={25}
                src={send}
              />
              {/* )} */}
            </span>
          </>
        )
      )}
    </div>
  );
}

export default MessageInput;
