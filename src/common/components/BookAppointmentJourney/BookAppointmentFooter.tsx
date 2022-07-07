import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import _classes from "./BookAppointmentJourney.module.scss";

type Props = {
  onNext: () => void;
  onPrevious: () => void;
  onRequestAppointment: () => void;
  stepName: string;
};
function BookAppointmentFooter({
  onNext,
  onPrevious,
  onRequestAppointment,
  stepName,
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
        <Button type="primary" onClick={onRequestAppointment}>
          Request an Appointment
        </Button>
      )}
    </div>
  );
}

export default BookAppointmentFooter;
