import React from "react";
import { Modal, Button } from "antd";

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
        date: Date;
      };
      okText: string;
    }
  | undefined
  | any;
function CalendarModalComponent(props: Props) {
  const { modalVisible, closeModal, data, okText } = props;
  const { id, doctor, patient, serviceType, date } = data;
  return (
    <Modal title="" centered visible={modalVisible} onCancel={closeModal} footer={null}>
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">ID</p>
        <h4 className="text-base">{id}</h4>
      </div>
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Doctor</p>
        <h4 className="text-xl">{doctor}</h4>
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
        <div className="flex justify-between font-semibold">
          <div className="flex items-center">
            <p className="pl-2 ">{date}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-0 pt-2">
        <Button key="link" type="primary">
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
  footer:{}
};
