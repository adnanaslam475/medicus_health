import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button } from "antd";
import { date } from "../../../../../src/common/utils";
import { VideoCameraFilled } from "@ant-design/icons";
import _classes from "./CalendarModal.module.scss";
import { isAppointmentTimeValid } from "common/utils/date";
import { AppointmentTimeSlots } from "generated/graphql";
import Image from "next/image";
import camera from "../../../../../public/assets/images/camera.svg";
import Router from "next/router";
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
  const {
    id,
    doctor,
    patient,
    serviceType,
    dateValue,
    charges,
    appointmentTimeSlots,
  } = data;
  const selectedAppointment: AppointmentTimeSlots | undefined = useMemo(
    () =>
      appointmentTimeSlots?.find((item: AppointmentTimeSlots) => item.selected),
    [appointmentTimeSlots]
  );
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    isAppointmentTimeValid(selectedAppointment, disabled, setDisabled);
  }, [selectedAppointment, disabled]);
  return (
    <Modal
      title=""
      centered
      visible={modalVisible}
      onCancel={closeModal}
      footer={null}
    >
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">ID#</p>
        <h4 className="text-base">ID# {id}</h4>
      </div>
      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 "> Patient name</p>
        <h4 className="text-xl">{patient}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Appointment type</p>
        <h4 className="text-xl">{serviceType}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Appointment date</p>
        <h4 className="text-xl">
          {date.formatDAYMMDDYY(selectedAppointment?.startTime || dateValue)}
        </h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Appointment time</p>
        <h4 className="text-xl">{`${date.formathhmma(
          selectedAppointment?.startTime || dateValue
        )}  -  ${date.formathhmma(
          selectedAppointment?.endTime || dateValue
        )}`}</h4>
      </div>

      <div className="border-b pb-0 pt-2">
        <p className="text-grey-4 ">Total amount</p>
        <h4 className="text-xl"> ${charges}</h4>
      </div>

      <div className="flex justify-between">
        <div className="items-center justify-start pt-4">
          <Button onClick={() => Router.push(`upcoming/${id}`)}>Details</Button>
        </div>
        <div className="items-center justify-end border-0 pt-4">
          <Button
            type="primary"
            className={`${_classes["appointments-btn"]} bg-current mr-3`}
            disabled={disabled}
          >
            <Image
              priority={true}
              src={camera}
              width={15}
              height={15}
              className="mb-0"
              alt="camera"
            />
            <span className="ml-2 mt-1">Join now</span>
          </Button>
        </div>
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
  okText: "Ok",
  footer: {},
};
