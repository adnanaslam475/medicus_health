import { Button, Card } from "antd";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import React, { useState } from "react";
import {
  AppointmentTimeSlots,
  DoctorProfile,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";

type Props = {
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  doctorProfile?: DoctorProfile | undefined | null;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
};

function AppointmnetCancelledCard({
  requestedDate,
  status,
  serviceType,
  doctor,
  doctorProfile,
  appointmentTimeSlots,
}: Props) {

  // function onRebookAppointment(id: number) {
  //   setCurrentAppointmentId(id);
  //   setShowModal(true);
  //   setIsModalVisible(true);
  // }

  const [currentAppointmentId, setCurrentAppointmentId] = useState<number>();
  // const [showModal, setShowModal] = useState<boolean>(false);

  // FOR REQUEST AN APPOINTMENT
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
    <>
      <Card className={`${_classes["appointment-card"]}`}>
        <h3 className="mb-0">Dr. {doctor}</h3>
        <span className="text-gray text-base block">{serviceType}</span>
        <span className="text-sm">Date</span>
        <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
        <span className="text-sm">Time</span>
        {appointmentTimeSlots?.length === 0 ? (
          <div className="text-cyan font-semibold">{" - "}</div>
        ) : (
          appointmentTimeSlots?.map((item) => (
            <div className="text-cyan font-semibold">{`${date.formathhmma(
              item.startTime
            )} - ${date.formathhmma(item.endTime)}`}</div>
          ))
        )}
        <span className="text-base text-red font-bold ">{status}</span>
        <div className="flex">
          <Button
            type={"primary"}
            className={`${_classes["card-btn"]} mr-3`}
            onClick={showModal}
          >
            Rebook
          </Button>
        </div>
      </Card>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        doctorData={doctorProfile}
      />
    </>
  );
}

export default AppointmnetCancelledCard;
