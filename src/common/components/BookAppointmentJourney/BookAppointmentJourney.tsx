import { FormInstance, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  DoctorProfile,
  useCreateAppointmentMutation,
  useDoctorSchedulesQuery,
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
import { getUserData } from "../../utils/userData";
import SuccessMessage from "../Appointments/booking/SuccessMessage";
import { useMediaUploader } from "common/hooks/media";

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
        visible={visible}
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
  const [successModal, setSuccessModal] = React.useState<boolean>(false);

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  //   GET ID FROM URL
  const { query } = useRouter();

  const { data: appoinmentData } = useBookAppointment();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [data, executeCreateAppointmentMutation] =
    useCreateAppointmentMutation();

  useEffect(() => {
    if (visible) {
      setCurrentStepName("stepOne");
      setCurrentStepNumber(0);
    }
  }, [visible]);

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

  const { service: serviceId, requestedDate } = appoinmentData?.stepOne || {};

  const fileUpload = async (files: File[]) => {
    try {
      if (files) {
        let allUrl: any = [];
        const urls = await mediaUploader.uploadMultiple(files);
        allUrl.push(urls?.map((url: any) => url.location));
        return allUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onRequestAppointment() {
    try {
      const urls = await fileUpload(
        appoinmentData?.stepTwo?.map(
          ({ originFileObj }: { originFileObj: File }) => originFileObj
        )
      );

      const res = await executeCreateAppointmentMutation({
        createAppointment: {
          patientId: id as number,
          doctorId: Number(query?.id),
          serviceId: serviceId,
          scheduleId: Number(appoinmentData?.stepOne?.availability),
          requestedDate: date?.convertToUTC(requestedDate),
          reportUrl: JSON.stringify(urls),
          questionnaire: JSON.stringify(appoinmentData?.stepThree),
        },
      });

      if (res?.data?.createAppointment) {
        setSuccessModal(true);
      }
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
      {successModal ? (
        <SuccessMessage />
      ) : (
        <>
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
        </>
      )}
    </Modal>
  );
}

export default BookAppointmentJourney;
