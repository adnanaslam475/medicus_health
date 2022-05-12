import React from "react";
import { Modal, Button } from "antd";
import { date } from "../../../../../src/common/utils";
import { VideoCameraFilled } from "@ant-design/icons";
import _classes from "./CalendarModal.module.scss";

type Props =
  | {
      modalVisible: boolean;
      closeModal: () => void;
      data: {
        id: number;
        doctor: string;
        patient: {
          first_name: string;
        };
        serviceType: {
          name: string;
        };
        dateValue: Date;
      };
      okText: string;
    }
  | undefined
  | any;
function CalendarModalComponent(props: Props) {
  const { modalVisible, closeModal, data, okText } = props;
  const { id, doctor, patient, serviceType, dateValue, charges } = data;
  return (
    <Modal
      title=""
      centered
      visible={modalVisible}
      onCancel={closeModal}
      footer={null}
    >
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">ID</p>
        <h4 className="text-base">{id}</h4>
      </div>
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 "> Patient</p>
        <h4 className="text-xl">{patient}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">ServiceType</p>
        <h4 className="text-xl">{serviceType}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Date</p>
        <h4 className="text-xl">{date.formatMMMMDDYYYY(dateValue)}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Time</p>
        <h4 className="text-xl">{`${date.formathhmma(
          dateValue
        )}  -  ${date.formathhmma(dateValue)}`}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Total</p>
        <h4 className="text-xl"> ${charges}</h4>
      </div>

      <div className="flex items-center justify-end border-0 pt-4">
        <Button
          type="primary"
          shape="circle"
          icon={<VideoCameraFilled />}
          className={`${_classes["join-now-btn"]}`}
        >
          Join Now
        </Button>
        <Button
          key="link"
          type="primary"
          className={`${_classes["details-btn"]}`}
        >
          Details
        </Button>
      </div>
    </Modal>
  );
}

export default CalendarModalComponent;

CalendarModalComponent.defaultProps = {
  modalVisible: false,
  closeModal: () => null,
  data: {},
  onOk: () => null,
  okText: "OK",
  footer: {},
};
