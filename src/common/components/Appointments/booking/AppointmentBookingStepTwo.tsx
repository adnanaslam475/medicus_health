import React, { useEffect, useState } from "react";
import { Checkbox, Upload, Form, UploadProps } from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import Image from "next/image";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import GeneralHealthQuesionnairModal from "./GeneralHealthQuesionnairModal";
import {
  Appointment,
  DoctorProfile,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import pdf from "../../../../../public/assets/images/word-file.svg";
import jpg from "../../../../../public/assets/images/jpg.svg";
import png from "../../../../../public/assets/images/png.png";
import zip from "../../../../../public/assets/images/zip.jpeg";
import docx from "../../../../../public/assets/images/docx.png";
import doc from "../../../../../public/assets/images/doc.jpg";
import { StarOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
type Props = {
  physicianData?: DoctorProfile | undefined | null;
  adminApp_Details?: DoctorData;
  rebookData?: Appointment;
};

type DoctorData = {
  doctor: {
    doctor_Id: number;
    doctor_first_name: string;
    doctor_last_name: string;
  };
  patient: {
    patient_id: number;
  };
};

const StepTwo = React.forwardRef(function StepTwo(props: Props, ref: any) {
  const { data, saveStepTwo } = useBookAppointment();
  const { physicianData, adminApp_Details, rebookData } = props || {};
  const { user } = getUserData();
  const [formInstance] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const patientId =
    rebookData?.patientId || user?.role === "User"
      ? Number(user?.id)
      : Number(data?.stepOne?.patient?.split(":")[0]);
  const [{ data: patientHealthData }] = usePatientHealthHistoryQuery({
    variables: { input: patientId },
    pause: !patientId,
  });
  const { patientHealthHistory } = patientHealthData || {};
  const [checked, setChecked] = useState(
    data?.stepTwo?.length > 0 ? false : true
  );

  const attachmentProps: UploadProps = {
    accept: ".doc, .pdf, image/jpg, image/jpeg,",
    name: "file",
    multiple: true,
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      let fileListing = info.fileList;

      const stepTwoFiles = fileListing?.map((item: any) => {
        if (fileListing.length) {
          switch (item?.type) {
            case "application/pdf":
              return { ...item, thumbUrl: pdf?.src };
            case "application/doc":
              return { ...item, thumbUrl: doc?.src };
            case "application/docx":
              return { ...item, thumbUrl: docx?.src };
            case "image/jpeg":
              return { ...item, thumbUrl: jpg?.src };
            case "image/png":
              return { ...item, thumbUrl: png?.src };
            case "application/zip":
              return { ...item, thumbUrl: zip?.src };
            default:
              return { ...item, thumbUrl: pdf?.src };
          }
        }
      });
      setFileList(stepTwoFiles);
      saveStepTwo?.(stepTwoFiles);

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
    fileList: data?.stepTwo || fileList,
    onDrop(e: { dataTransfer: { files: any } }) {
      // saveStepTwo?.(e.dataTransfer.files);
    },
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: "X",
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <h2>Request an Appointment</h2>
      <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
        <Form.Item label="Medical History*">
          <Dragger
            {...attachmentProps}
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
              Max 10mb upload limit.
            </span>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="General Health Questionnaire*"
          name="questionnair"
          rules={[
            {
              required: !patientHealthHistory?.id ? true : false,
              message: "General Health Questionnaire is required",
            },
          ]}
        >
          <div className="w-full bg-gray-4 rounded flex items-center p-3">
            <Checkbox
              onChange={handlechecked}
              defaultChecked={patientHealthHistory?.id ? true : false}
              disabled={true}
            >
              <span className="text-gray-2">
                Health Questionnaire is attached
              </span>
            </Checkbox>
          </div>
        </Form.Item>
        <p className="text-gray-2">
          If you wish to update the make changes in your current Health
          questionnaire,
          <a onClick={() => setIsModalVisible(true)}>Click Here.</a>
        </p>
      </Form>
      {isModalVisible && (
        <GeneralHealthQuesionnairModal
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          ref={ref}
          physicianData={physicianData}
          adminApp_Details={adminApp_Details}
          rebookData={rebookData}
        />
      )}
    </>
  );
});

export default StepTwo;
