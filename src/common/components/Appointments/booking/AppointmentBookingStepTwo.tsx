import React, { useEffect, useState } from "react";
import { Checkbox, Upload, message, Form, Image, Button } from "antd";
import {
  FilePdfOutlined,
  FileJpgOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import config from "../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import ReactS3Client from "react-aws-s3-typescript";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";

const { Dragger } = Upload;

const StepTwo = React.forwardRef(function StepTwo({}, ref: any) {
  const { saveStepTwo } = useBookAppointment();
  const [formInstance] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const props = {
    accept: ".doc, .pdf, image/jpg, image/jpeg,",
    name: "file",
    multiple: true,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      setFileList(info.fileList);
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
  };

  function onFinishLocal(values: any) {
    saveStepTwo?.(fileList);
  }

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
  }, []);

  return (
    <>
      <h2>Request an Appointment</h2>
      <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
        <Form.Item label="Medical History*">
          <Dragger
            {...props}
            customRequest={({ onSuccess }) => onSuccess?.({})}
          >
            <p className="ant-upload-drag-icon mb-0">
              <Image
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
            <span className="font-circular text-xs ant-upload-text text-white p-1 px-3 mt-1 mb-3 rounded inline-block bg-primary">
              Upload
            </span>
            <span className="hidden ant-upload-hint block text-xs text-gray-1">
              Max 3 files and 10mb upload limit.
            </span>
          </Dragger>
        </Form.Item>

        <Form.Item label="General Health Questionnaire*">
          <div className="w-full bg-gray-4 rounded flex items-center p-3">
            <Checkbox value="0">
              <span className="text-gray-2">Health Questionnaire attached</span>
            </Checkbox>
          </div>
        </Form.Item>
        <p className="text-gray-2">
          If you wish to update the make changes in your current Health
          questionnaire, <a href="#">Click Here.</a>
        </p>

        {/* <Form.Item>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item> */}
      </Form>
    </>
  );
});

export default StepTwo;
