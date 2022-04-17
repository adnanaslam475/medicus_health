import { LeftOutlined } from "@ant-design/icons";
import { Button, Modal, Steps } from "antd";
import React, { useRef, useState } from "react";
import {
  DoctorProfile,
  useCreateAppointmentMutation,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import CurrentStepContent from "./CurrentStepContent";
import _classes from "./BookAppointmentJourney.module.scss";
import {
  BookAppointmentProvider,
  useBookAppointment,
} from "./BookAppointmentContext";
import { UploadChangeParam } from "antd/lib/upload";
import config from "../../../../config";
import ReactS3Client from "react-aws-s3-typescript";
import { AnyARecord } from "node:dns";
import { date } from "../../utils";
import { useRouter } from "next/router";

type Props = {
  visible?: boolean | undefined;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  doctorData?: DoctorProfile;
};

function BookAppointmentJourneyWithContext({
  visible,
  onOk,
  onCancel,
  doctorData,
}: Props) {
  const form: any = useRef();

  const [currentStepName, setCurrentStepName] = useState<string>("stepOne");
  const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);

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
  };

  const prev = (stepName: string) => {
    if (stepName === "stepOne") return;
    if (stepName === "stepOne") {
      //   setCurrentStepName("stepTwo");
    } else if (stepName === "stepTwo") {
      setCurrentStepName("stepOne");
    } else if (stepName === "stepThree") {
      setCurrentStepName("stepTwo");
    } else if (stepName === "stepFour") {
      setCurrentStepName("stepThree");
    }
    setCurrentStepNumber((prev) => prev - 1);
  };

  // const [data] = useGetAllAppointmentServiceTypesQuery();

  const { saveStepOne } = useBookAppointment();
  return (
    <BookAppointmentJourney>
      <Modal
        centered
        maskClosable={false}
        visible
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
          />
        </div>
        <BookAppointmentFooter
          stepName={currentStepName}
          onNext={() => next(currentStepName)}
          onPrevious={() => prev(currentStepName)}
        />
      </Modal>
    </BookAppointmentJourney>
  );
}

function BookAppointmentJourney({ children }: { children: JSX.Element }) {
  return <BookAppointmentProvider>{children}</BookAppointmentProvider>;
}

export default BookAppointmentJourneyWithContext;

function BookAppointmentFooter({
  onNext,
  onPrevious,
  stepName,
}: {
  onNext: () => void;
  onPrevious: () => void;
  stepName: string;
}) {
  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
  };

  const { data: appoinmentData } = useBookAppointment();
  console.log("data", appoinmentData);
  const { service: serviceId, requestedDate } = appoinmentData?.stepOne;
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

  const [data, executeCreateAppointmentMutation] =
    useCreateAppointmentMutation();

  async function createAppoinment() {
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
    <div className="steps-action">
      {stepName !== "stepOne" && (
        <Button type="link" onClick={onPrevious}>
          <LeftOutlined /> <span>Back</span>
        </Button>
      )}
      {stepName !== "stepFour" && (
        <Button
          type="primary"
          className={`${_classes["btn-next"]}`}
          onClick={onNext}
        >
          Next
        </Button>
      )}
      {stepName === "stepFour" && (
        <Button
          type="primary"
          className={`${_classes["btn-next"]}`}
          // onClick={onNext}
          onClick={createAppoinment}
        >
          Request an Appointment
        </Button>
      )}
    </div>
  );
}

function StepDots({ current }: { current: number }) {
  return (
    <Steps current={current}>
      <Steps.Step />
      <Steps.Step />
      <Steps.Step />
      <Steps.Step />
    </Steps>
  );
}
