import React, { useEffect, useState } from "react";
import { Checkbox, Upload, Form, UploadProps, notification, message } from "antd";
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
import zip from "../../../../../public/assets/images/zip.png";
import docx from "../../../../../public/assets/images/docx.png";
import doc from "../../../../../public/assets/images/doc.jpg";
import tiff from "../../../../../public/assets/images/tiff.png";
import bmp from "../../../../../public/assets/images/bmp.png";
import tga from "../../../../../public/assets/images/tga.png";
import { StarOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

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
    accept: ".doc,.docx, .pdf, image/jpg, image/jpeg,",
    name: "file",
    multiple: true,
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      let fileListing = info.fileList;

      const availableTypes: Object = {
        "application/pdf": pdf.src,
        "application/msword": doc.src,
        "application/doc": doc.src,
        "application/docx": docx.src,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          docx.src,
        "image/jpeg": jpg.src,
        "image/png": png.src,
        "image/tiff": tiff.src,
        "image/x-tga": tga.src,
        "image/bmp": bmp.src,
        "application/zip": zip.src,
      };
      const stepTwoFiles = fileListing?.map((item: any) => {
        return {
          ...item,
          thumbUrl:
            availableTypes[item.type as keyof typeof availableTypes] || pdf.src,
        };
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
  const beforeUpload = (file: RcFile) => {
    let in10MBLimit = file.size / 1024 / 1024 < 10;
    if (!in10MBLimit) {
      notification.error({ message: "File must smaller than 10 MB!" });
      message.error( "File must smaller than 10 MB!" );
    return true
    }
    return in10MBLimit;
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
            beforeUpload={(e) => beforeUpload(e)}
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
