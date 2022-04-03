import React from "react";
import {
  Layout,
  Checkbox,
  Upload,
  message,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import {
  FilePdfOutlined,
  FileJpgOutlined,
  CloseOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { FormInstance } from "antd/es/form";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: { dataTransfer: { files: any } }) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
function StepTwo() {
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Doctor*">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon mb-0">
              <InboxOutlined />
            </p>
            <span className="ant-upload-text block">
              Drag your files here or
            </span>
            <span className="ant-upload-text text-white text-sm p-1 px-3 mt-1 mb-3 rounded inline-block bg-primary">
              Upload
            </span>
            <span className="ant-upload-hint block text-gray-1">
              Max 3 files and 10mb upload limit.
            </span>
          </Dragger>
          <div className="w-full bg-gray-4 border border-gray-3 rounded-lg flex items-center justify-between p-3 mt-3 mr-3 mb-3">
            <span className="flex items-center">
              <FileJpgOutlined />
              <span className="ml-2">test_reports.pdf</span>
            </span>
            <button className="text-xs">
              <CloseOutlined />
            </button>
          </div>
          <div className="w-full bg-gray-4 border border-gray-3 rounded-lg flex items-center justify-between p-3 mt-3 mr-3 mb-3">
            <span className="flex items-center">
              <FilePdfOutlined />
              <span className="ml-2">test_reports.pdf</span>
            </span>
            <button className="text-xs">
              <CloseOutlined />
            </button>
          </div>
        </Form.Item>
        <Form.Item label="General Health Questionnaire*">
          <div className="w-full bg-gray-4 border border-gray-3 rounded flex items-center p-3">
            <Checkbox value="0">
              <span className="text-gray-2">Health Questionnaire attached</span>
            </Checkbox>
          </div>
        </Form.Item>
        <p className="text-gray-2">
          If you wish to update the make changes in your current Health
          questionnaire, <a href="#">Click Here.</a>
        </p>
      </Form>
    </>
  );
}
export default StepTwo;
