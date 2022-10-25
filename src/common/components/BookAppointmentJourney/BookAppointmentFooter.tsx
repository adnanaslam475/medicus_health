import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { isChrome } from "utils/helper";
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
        <Button type="link" onClick={onPrevious} className={`${isChrome && 'antCustomBtn'}`}>
          <LeftOutlined /> <span>Back</span>
        </Button>
      )}
      {stepName !== "stepFour" && (
        <Button
          type="primary"
          className={`${_classes["btn-next"]} ${isChrome && 'antCustomBtn'}`}
          onClick={onNext}
        >
          Next
        </Button>
      )}
      {stepName === "stepFour" && (
        <Button type="primary" onClick={onRequestAppointment} loading={loading} className={`${isChrome && 'antCustomBtn'}`}>
          Request an appointment
        </Button>
      )}
    </div>
  );
}

export default BookAppointmentFooter;
