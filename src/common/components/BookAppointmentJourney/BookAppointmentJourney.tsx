import { FormInstance, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  Appointment,
  DoctorProfile,
  useCreateAppointmentMutation,
  usePatientHealthHistoryQuery,
  User,
} from "../../../generated/graphql";
import CurrentStepContent from "./CurrentStepContent";
import _classes from "./BookAppointmentJourney.module.scss";
import {
  BookAppointmentProvider,
  useBookAppointment,
} from "./BookAppointmentContext";

import { date } from "../../utils";
import { useRouter } from "next/router";
import StepDots from "../StepDots/StepDots";
import BookAppointmentFooter from "./BookAppointmentFooter";
import { getUserData } from "../../utils/userData";
import SuccessMessage from "../Appointments/booking/SuccessMessage";
import { useMediaUploader } from "common/hooks/media";
import { GraphQLError } from "graphql";

type AdminData = {
  patientList: User[];
  physicianList: User[];
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

type Props = {
  visible?: boolean | undefined;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  doctorData?: DoctorProfile | undefined | null;
  adminData?: AdminData;
  patientData?: User[] | undefined;
  adminApp_Details?: DoctorData;
  rebookData?: Appointment;
};

function BookAppointmentJourney({
  visible,
  onOk,
  onCancel,
  doctorData,
  adminData,
  patientData,
  adminApp_Details,
  rebookData,
}: Props) {
  return (
    <BookAppointmentProvider>
      <BookAppointmentModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        doctorData={doctorData}
        adminData={adminData}
        patientData={patientData}
        adminApp_Details={adminApp_Details}
        rebookData={rebookData}
      />
    </BookAppointmentProvider>
  );
}

function BookAppointmentModal({
  visible,
  onOk,
  onCancel,
  doctorData,
  adminData,
  patientData,
  adminApp_Details,
  rebookData,
}: Props) {
  const form = useRef<FormInstance>();
  const [currentStepName, setCurrentStepName] = useState<string>("stepOne");
  const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);
  const [successModal, setSuccessModal] = React.useState<boolean>(false);

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  //   GET ID FROM URL
  const { query } = useRouter();

  const {
    data: appoinmentData,
    saveStepOne,
    saveStepTwo,
    saveStepThree,
  } = useBookAppointment();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const [result, executeCreateAppointmentMutation] =
    useCreateAppointmentMutation();
  const { fetching } = result || {};

  useEffect(() => {
    if (visible) {
      setCurrentStepName("stepOne");
      setCurrentStepNumber(0);
    }
  }, [visible]);

  const closeModal = () => {
    setCurrentStepName("stepOne");
    setSuccessModal(false);
  };

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
  const adminPhysicianId = appoinmentData?.stepOne?.physician?.split(":")[0];
  const adminPatientId = appoinmentData?.stepOne?.patient?.split(":")[0];

  const fileUpload = async (files: File[]) => {
    try {
      if (files) {
        let allUrl: any = [];
        const urls = await mediaUploader.uploadMultiple(files);

        allUrl.push(
          urls?.map((url: any) => ({ url: url.location, name: url.key }))
        );
        return allUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const patientIdforCreateAppointment =
    Number(rebookData?.patientId) ||
    Number(adminApp_Details?.patient?.patient_id) ||
    Number(adminPatientId) ||
    (id as number);
  async function onRequestAppointment() {
    try {
      const urls = await fileUpload(
        appoinmentData?.stepTwo?.map(
          ({ originFileObj }: { originFileObj: File }) => originFileObj
        )
      );

      const doctorIdforCreateAppointment =
        Number(rebookData?.doctorId) ||
        Number(doctorData?.doctor_id) ||
        Number(adminApp_Details?.doctor?.doctor_Id) ||
        Number(adminPhysicianId) ||
        Number(query?.id);

      const res = await executeCreateAppointmentMutation({
        createAppointment: {
          patientId: patientIdforCreateAppointment,
          doctorId: doctorIdforCreateAppointment,
          serviceId: serviceId,
          scheduleId: Number(appoinmentData?.stepOne?.availability),
          requestedDate: date?.convertToUTC(requestedDate),
          reportUrl: JSON.stringify(urls),
          questionnaire: JSON.stringify(appoinmentData?.stepThree),
        },
      });

      if (res?.data?.createAppointment) {
        setSuccessModal(true);
        saveStepOne?.({});
        saveStepTwo?.({});
        saveStepThree?.({});
      } else if (res?.error?.graphQLErrors) {
        let graphQLError = res?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = res?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
    } catch (error) {}
  }

  const [{ data: patientHealthData }, executeUsePatientHealthHistoryQuery] =
    usePatientHealthHistoryQuery({
      variables: { input: patientIdforCreateAppointment as number },
    });
  const { patientHealthHistory } = patientHealthData || {};

  useEffect(() => {
    executeUsePatientHealthHistoryQuery({ requestPolicy: "network-only" });
  }, [currentStepName === "stepTwo"]);
  const NextClickHandler = () => {
    const stepOneFields = form?.current?.getFieldsValue([
      "physician",
      "availability",
      "requestedDate",
      "service",
    ]);
    const stepThreeFields = form?.current?.getFieldsValue();
    if (
      currentStepName === "stepOne" &&
      Object.values(stepOneFields).some((value) => !value)
    ) {
      return form.current?.submit();
    } else if (currentStepName === "stepTwo" && !patientHealthHistory?.id) {
      return form.current?.submit();
    } else if (
      currentStepName === "stepThree" &&
      Object.values(stepThreeFields).some(
        (item) => item === "" || item === undefined
      )
    ) {
      return form.current?.submit();
    } else {
      return next(currentStepName);
    }
  };
  return (
    <Modal
      centered
      maskClosable={false}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      className={`${_classes["steps-style"]}`}
      afterClose={closeModal}
    >
      {successModal ? (
        <SuccessMessage onCancel={onCancel} />
      ) : (
        <>
          <StepDots current={currentStepNumber} />
          <div className="steps-content">
            <CurrentStepContent
              stepName={currentStepName}
              doctorData={doctorData}
              ref={form}
              adminData={adminData}
              patientData={patientData}
              adminApp_Details={adminApp_Details}
              rebookData={rebookData}
            />
          </div>
          <BookAppointmentFooter
            stepName={currentStepName}
            onNext={() => NextClickHandler()}
            onPrevious={() => prev(currentStepName)}
            onRequestAppointment={onRequestAppointment}
            loading={fetching}
          />
        </>
      )}
    </Modal>
  );
}

export default BookAppointmentJourney;
