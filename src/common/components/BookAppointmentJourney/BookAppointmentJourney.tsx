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
import { graphqlError } from "utils/helper";

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
  const [clear, setClear] = React.useState<boolean>(false);
  const [currentStepName, setCurrentStepName] = useState<string>("stepOne");
  const [currentStepNumber, setCurrentStepNumber] = React.useState<number>(0);
  const [successModal, setSuccessModal] = React.useState<boolean>(false);

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  //   GET ID FROM URL
  const { query } = useRouter();

  const { data: appoinmentData, clearBookingContext } = useBookAppointment();

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
      setClear(false);
    }
  }, [visible]);

  const closeModal = () => {
    setCurrentStepName("stepOne");
    setSuccessModal(false);
  };

  const next = (stepName: string) => {
    const allSteps: AllSteps = {
      stepOne: "stepTwo",
      stepTwo: "stepThree",
      stepThree: "stepFour",
      stepFour: "",
    };
    if (allSteps[stepName as keyof AllSteps])
      setCurrentStepName(
        allSteps[stepName as keyof AllSteps] as keyof AllSteps
      );
    setCurrentStepNumber((prev) => prev + 1);
    form.current?.submit();
  };

  type AllSteps = {
    stepOne: String;
    stepTwo: String;
    stepThree: String;
    stepFour: String;
  };
  const prev = (stepName: string) => {
    const allSteps: AllSteps = {
      stepOne: "",
      stepTwo: "stepOne",
      stepThree: "stepTwo",
      stepFour: "stepThree",
    };
    if (allSteps[stepName as keyof AllSteps])
      setCurrentStepName(
        allSteps[stepName as keyof AllSteps] as keyof AllSteps
      );
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
        setClear(true);
        setSuccessModal(true);
        clearBookingContext?.({});
      } else if (res?.error?.graphQLErrors) {
        const errorMessage = graphqlError(res);
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
  const onCancelHandler = (e: any) => {
    form?.current?.setFields([
      {
        name: "charges",
        errors: [],
        value: null,
      },
      {
        name: "physician",
        errors: [],
      },
      {
        name: "availability",
        errors: [],
      },
      {
        name: "requestedDate",
        errors: [],
      },
      {
        name: "service",
        errors: [],
      },
    ]);
    setClear(true);
    clearBookingContext?.({});
    onCancel?.(e);
  };

  return (
    <Modal
      centered
      maskClosable={false}
      visible={visible}
      onOk={onOk}
      onCancel={onCancelHandler}
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
              clear={clear}
              setClear={setClear}
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
