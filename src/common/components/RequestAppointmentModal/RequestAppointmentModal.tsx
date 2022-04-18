import React, { useState, useEffect, useRef } from "react";
import { Tabs, Button, Alert, notification, Modal, Steps } from "antd";
import Router from "next/router";
import Image from "next/image";
// import AppointmentBookingStepOne from "../Appointments/booking/AppointmentBookingStepOne";
// import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";
// import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
// import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import SuccessMessage from "../Appointments/booking/SuccessMessage";
import { LeftOutlined } from "@ant-design/icons";
import _classes from "./RequestAppointmentModal.module.scss";

// const { Step } = Steps;
// const steps = [
//   {
//     title: "",
//     content: <AppointmentBookingStepOne />,
//   },
//   {
//     title: "",
//     content: <AppointmentBookingStepTwo />,
//   },
//   {
//     title: "",
//     content: <AppointmentBookingStepThree />,
//   },
//   {
//     title: "",
//     content: <AppointmentBookingStepFour />,
//   },
//   {
//     title: "",
//     content: <SuccessMessage />,
//   },
// ];
const RequestAppointmentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [current, setCurrent] = React.useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
      <></>
    // <Modal
    //   title="Request an Appointment"
    //   visible={isModalVisible}
    //   onOk={handleOk}
    //   onCancel={handleCancel}
    //   footer={null}
    //   className={`${_classes["steps-style"]}`}
    // >
    //   <Steps current={current}>
    //     {steps.map((item) => (
    //       <Step key={item.title} title={item.title} />
    //     ))}
    //   </Steps>
    //   <div className="steps-content">{steps[current].content}</div>
    //   <div className="steps-action">
    //     {current > 0 && current < steps.length - 1 && (
    //       <Button type="link" onClick={() => prev()}>
    //         <LeftOutlined /> <span>Back</span>
    //       </Button>
    //     )}
    //     {current < steps.length - 2 && (
    //       <Button
    //         type="primary"
    //         className={`${_classes["btn-next"]}`}
    //         onClick={() => next()}
    //       >
    //         Next
    //       </Button>
    //     )}
    //     {current === steps.length - 2 && (
    //       <Button
    //         type="primary"
    //         className={`${_classes["btn-next"]}`}
    //         onClick={() => next()}
    //       >
    //         Request an Appointment
    //       </Button>
    //     )}
    //   </div>
    // </Modal>
  );
};

export default RequestAppointmentModal;
