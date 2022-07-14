import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import _classes from "./BookAppointmentJourney.module.scss";

type Props = {
  onNext: () => void;
  onPrevious: () => void;
  onRequestAppointment: () => void;
  stepName: string;
  loading?: boolean;
};
function BookAppointmentFooter({
  onNext,
  onPrevious,
  onRequestAppointment,
  stepName,
  loading,
}: Props) {
  return (
    <div className={_classes["book-appointment-footer"]}>
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
<<<<<<< HEAD
        <Button
          type="primary"
          onClick={onRequestAppointment}
        >
          Request an appointment
=======
        <Button type="primary" onClick={onRequestAppointment} loading={loading}>
          Request an Appointment
>>>>>>> e4cd5c5739aaa79fc764b8ae15298fc5fc7c03ed
        </Button>
      )}
    </div>
  );
}

export default BookAppointmentFooter;
