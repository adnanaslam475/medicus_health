import React, { useEffect, useState } from "react";
import { Checkbox, Upload, Form } from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import Image from "next/image";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Dragger } = Upload;

const StepTwo = React.forwardRef(function StepTwo({}, ref: any) {
  const { data, saveStepTwo } = useBookAppointment();
  const [formInstance] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [checked, setChecked] = useState(
    data?.stepTwo?.length > 0 ? false : true
  );

  const props = {
    accept: ".doc, .pdf, image/jpg, image/jpeg,",
    name: "file",
    multiple: true,
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      setFileList(info.fileList);
      saveStepTwo?.(info.fileList);
      const { status } = info?.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    defaultFileList: data?.stepTwo && data?.stepTwo,
    onDrop(e: { dataTransfer: { files: any } }) {
      // saveStepTwo?.(e.dataTransfer.files);
    },
  };

  function onFinishLocal(values: any) {
    saveStepTwo?.(data?.stepTwo || fileList);
  }

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
  }, []);

  const handlechecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <h2>Request an Appointment</h2>
      <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
        <Form.Item label="Medical History*">
          <Dragger
            {...props}
            customRequest={({ onSuccess }) => onSuccess?.({})}
            listType="picture"
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
            <span className="font-circular text-xs ant-upload-text text-white p-1 px-3 mt-1 mb-3 rounded inline-block bg-primary">
              Upload
            </span>
            <span className=" ant-upload-hint block text-xs text-gray-1">
              Max 3 files and 10mb upload limit.
            </span>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="General Health Questionnaire*"
          name="questionnair"
          rules={[
            {
              required: !checked,
              message: "General Health Questionnaire is required",
            },
          ]}
        >
          <div className="w-full bg-gray-4 rounded flex items-center p-3">
            <Checkbox onChange={handlechecked}>
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
