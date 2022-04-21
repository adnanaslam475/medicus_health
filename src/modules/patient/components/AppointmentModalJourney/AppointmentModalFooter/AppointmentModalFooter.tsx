import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { StringValueNode } from "graphql";
import React from "react";
import _classes from "../AppointmentReschedule/AppointmentReschedule.module.scss";

type Props = {
  onNext: () => void;
  onPrevious: () => void;
  onRequestAppointment: () => void;
  stepName: string;
  setCurrentStepName: (param: string) => void;
};
function AppointmentModalFooter({
  onNext,
  onPrevious,
  onRequestAppointment,
  setCurrentStepName,
  stepName,
}: Props) {
  return (
    <div>
      {stepName === "stepOne" && (
        <div className="flex justify-end gap-2">
          <Button
            type="primary"
            className={`${_classes["button-border"]}`}
            onClick={onNext}
          >
            Reject
          </Button>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={onNext}
          >
            Proceed To Payment
          </Button>
        </div>
      )}
      {stepName == "stepTwo" && (
        <div className="flex justify-between ">
          <div className="flex items-center text-primary" onClick={onNext}>
            <PlusOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary">Add Payment Method</span>
          </div>
          <Button
            type="primary"
            onClick={() => setCurrentStepName("stepFour")}
            className={`${_classes["button-background-color"]}`}
          >
            Pay $5900
          </Button>
        </div>
      )}
      {stepName === "stepThree" && (
        <div className="flex justify-between items-center">
          <div className="flex items-center text-primary" onClick={onPrevious}>
            <LeftOutlined className={`${_classes["icon-color"]}`} />
            <span className="text-primary">Previous</span>
          </div>
          <Button
            type="primary"
            className={`${_classes["button-background-color"]}`}
            onClick={onNext}
          >
            Pay $5900
          </Button>
        </div>
      )}

      {stepName === "stepFour" && (
        <div className="flex justify-center mt-5">
          <Button
            type="primary"
            onClick={onRequestAppointment}
            className={`${_classes["button-background-color"]}`}
          >
            Upcoming Appointments
          </Button>
        </div>
      )}
    </div>
  );
}

export default AppointmentModalFooter;
