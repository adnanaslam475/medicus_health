import { FormInstance, Modal } from "antd";
import React, { useRef, useState } from "react";
import {
  DoctorProfile,
  useCreateAppointmentMutation,
} from "../../../generated/graphql";
import CurrentStepContent from "./CurrentStepContent";
import _classes from "./BookAppointmentJourney.module.scss";
import {
  BookAppointmentProvider,
  useBookAppointment,
} from "./BookAppointmentContext";
import config from "../../../../config";
import ReactS3Client from "react-aws-s3-typescript";
import { date } from "../../utils";
import { useRouter } from "next/router";
import StepDots from "../StepDots/StepDots";
import BookAppointmentFooter from "./BookAppointmentFooter";

type Props = {
  visible?: boolean | undefined;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  doctorData?: DoctorProfile;
};

function BookAppointmentJourney({
  visible,
  onOk,
  onCancel,
  doctorData,
}: Props) {
  return (
    <BookAppointmentProvider>
      <BookAppointmentModal
        visible={true || visible}
        onOk={onOk}
        onCancel={onCancel}
        doctorData={doctorData}
      />
    </BookAppointmentProvider>
  );
}

function BookAppointmentModal({ visible, onOk, onCancel, doctorData }: Props) {
  const form = useRef<FormInstance>();
  const [currentStepName, setCurrentStepName] = useState<string>("stepOne");
  const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);
  const { data: appoinmentData } = useBookAppointment();

  console.log("data",appoinmentData)

  const [data, executeCreateAppointmentMutation] =
    useCreateAppointmentMutation();

  const next = (stepName: string) => {
    if (stepName === "stepFour") return;
    if (stepName === "stepOne") {
      setCurrentStepName("stepTwo");
    } else if (stepName === "stepTwo") {
      setCurrentStepName("stepThree");
    } else if (stepName === "stepThree") {
      setCurrentStepName("stepFour");
    }
    setCurrentStepNumber((prev) => prev + 1);
    form.current?.submit();
  };
  const prev = (stepName: string) => {
    if (stepName === "stepOne") return;
    else if (stepName === "stepTwo") {
      setCurrentStepName("stepOne");
    } else if (stepName === "stepThree") {
      setCurrentStepName("stepTwo");
    } else if (stepName === "stepFour") {
      setCurrentStepName("stepThree");
    }
    setCurrentStepNumber((prev) => prev - 1);
  };

  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
  };

  const { service: serviceId, requestedDate } = appoinmentData?.stepOne || {};
  //   GET ID FROM URL
  const { query } = useRouter();

  const fileUpload = async (info: any) => {
    console.log("info", info);
    const s3 = new ReactS3Client(configS3);
    try {
      if (info) {
        let allUrl: any = [];

        const urls = await Promise.all(
          info.map((file: any) => s3.uploadFile(file.originFileObj as File))
        );
        console.log("urls", urls);
        allUrl.push(urls?.map((url: any) => url.location));
        console.log("allUrl", allUrl);
        return allUrl;
      }
    } catch (error) {
      console.log("error", error);
    }
    // if (error) {
    //   notification.error({
    //     message: error?.graphQLErrors[0]?.message || "Something went wrong",
    //   });
    // }
  };

  async function onRequestAppointment() {
    try {
      const urls = await fileUpload(appoinmentData?.stepTwo);
      console.log("fileUpload", urls);

      const res = await executeCreateAppointmentMutation({
        createAppointment: {
          patientId: 401,
          doctorId: Number(query?.id),
          serviceId: serviceId,
          scheduleId: 1,
          requestedDate: date?.convertToUTC(requestedDate),
          reportUrl: urls,
          questionnair: [
            '{question:"questionno1",type:"radio",options:["yes","no"],answer:"yes"}',
          ],
        },
      });

      // console.log("res", res);
    } catch (error) {}
  }

  return (
    <Modal
      centered
      maskClosable={false}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      className={`${_classes["steps-style"]}`}
    >
      <StepDots current={currentStepNumber} />
      <div className="steps-content">
        <CurrentStepContent
          stepName={currentStepName}
          doctorData={doctorData}
          ref={form}
        />
      </div>
      <BookAppointmentFooter
        stepName={currentStepName}
        onNext={() => next(currentStepName)}
        onPrevious={() => prev(currentStepName)}
        onRequestAppointment={onRequestAppointment}
      />
    </Modal>
  );
}

export default BookAppointmentJourney;
