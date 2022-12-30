import React, { useState } from "react";
import _classes from "./RequestAppointmentModal.module.scss";

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
    //   title="Request an appointment"
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
    //         Request an appointment
    //       </Button>
    //     )}
    //   </div>
    // </Modal>
  );
};

export default RequestAppointmentModal;
