import React, { useEffect, useState } from "react";
import { Form, notification, UploadProps } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import Image from "next/image";
import { useMediaUploader } from "common/hooks/media";
import { useUpdateAppointmentAttachmentsMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { AttachmentObject } from "common/types/types";

type Props = {
  urlArr?: AttachmentObject[];
  appointmentsLoading?: boolean;
};
const AttachmentDragger = (props: Props) => {
  const { urlArr, appointmentsLoading } = props || {};
  const [fileList, setFileList] = useState([]);
  const mediaUploader = useMediaUploader();
  const [loading, setLoading] = useState(false);

  const [_, executeUseUpdateAppointmentAttachmentsMutation] =
    useUpdateAppointmentAttachmentsMutation();

  const fileUpload = async (files: File[]) => {
    try {
      if (files) {
        let allUrl: any = [];
        const urls = await mediaUploader.uploadMultiple(files);

        allUrl.push(
          urls?.map((url: any) => {
            let fileName = `${url?.key?.split(".")[0]}.${
              url?.key?.split(".")[1]
            }`;
            return { url: url.location, name: fileName };
          })
        );
        return allUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fileUploadFunc(filesList: any) {
    const urls = await fileUpload(
      filesList?.map(
        ({ originFileObj }: { originFileObj: File }) => originFileObj
      )
    );
    return urls;
  }

  const attachmentProps: UploadProps | Object = {
    accept:
      ".doc,.docx,.pdf,.zip,.tiff,.tga,image/jpg,image/jpeg,image/jpg,image/bmp,image/x-tga,image/png,image/tga,application/msword,",
    name: "file",
    multiple: true,
    onChange(info: { file: { name?: string; size: number }; fileList: any }) {
      let in10MBLimit = info?.file?.size / 1024 / 1024 < 10;
      if (!in10MBLimit) {
        return notification.error({ message: "File must smaller than 10 MB!" });
      }
      if (in10MBLimit) {
        setLoading(true);
        return fileUploadFunc(info?.fileList).then((res) => {
          setFileList(res);
          setLoading(false);
        });
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      // saveStepTwo?.(e.dataTransfer.files);
    },
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: "X",
    },
  };

  const { query } = useRouter();

  useEffect(() => {
    if (fileList?.flat(1)?.length && fileList?.flat(1)[0] !== undefined) {
      let localList = urlArr?.length
        ? [...urlArr, ...fileList.flat(1)]
        : fileList.flat(1);
      let filteredArray = localList.filter(
        (v, i, a) => a.findIndex((v2) => v2.name === v.name) === i
      );
      executeUseUpdateAppointmentAttachmentsMutation({
        updateAppointmentAttachmentsInput: {
          id: Number(query?.id),
          reportUrl: JSON.stringify(filteredArray),
        },
      });
    }
  }, [fileList]);

  const beforeUpload = () => {
    return false;
  };
  return (
    <div className="xl:w-3/5 mb-3">
      <Form layout="vertical">
        <Form.Item>
          <Dragger
            {...attachmentProps}
            showUploadList={false}
            customRequest={({ onSuccess }) => onSuccess?.({})}
            beforeUpload={beforeUpload}
          >
            <p className="ant-upload-drag-icon mb-0">
              <Image
                priority={true}
                alt=""
                className=""
                height={32}
                width={36}
                src="/assets/icon/upload-icon.svg"
              />
            </p>
            <span className="ant-upload-text text-sm block">
              Drag your files here or
            </span>
            <span
              className={`font-circular text-xs ant-upload-text text-white p-1 px-3 mt-1 mb-3 rounded inline-block ${
                loading ? "bg-gray" : "bg-primary"
              }`}
            >
              {loading ? "Uploading" : "Upload"}
            </span>
            <span className=" ant-upload-hint block text-xs text-gray-1">
              Max 10mb upload limit.
            </span>
          </Dragger>
        </Form.Item>
        <span className=" ant-upload-hint block text-xs text-gray-1 text-center -mt-4">
          Please upload files that are relevant to your appointment.
        </span>
      </Form>
    </div>
  );
};

export default AttachmentDragger;
