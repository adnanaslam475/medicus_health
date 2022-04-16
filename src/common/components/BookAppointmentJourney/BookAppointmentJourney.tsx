import { LeftOutlined } from "@ant-design/icons";
import { Button, Modal, Steps } from "antd";
import React, { useRef, useState } from "react";
import {
  DoctorProfile,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import CurrentStepContent from "./CurrentStepContent";
import _classes from "./BookAppointmentJourney.module.scss";
import {
  BookAppointmentProvider,
  useBookAppointment,
} from "./BookAppointmentContext";

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
  const { data } = useBookAppointment();
  console.log("data", { data });

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
          onClick={onNext}
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
