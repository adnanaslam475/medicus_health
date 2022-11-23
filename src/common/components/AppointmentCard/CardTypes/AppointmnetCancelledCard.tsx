import { Button, Card } from "antd";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import React, { useState } from "react";
import { isChrome } from "utils/helper";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentTimeSlots,
  DoctorProfile,
  Transaction,
} from "../../../../generated/graphql";
import { date } from "../../../utils";
import _classes from "./../AppointmentCard.module.scss";

type Props = {
  appointmentId: number | null | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  doctorProfile?: DoctorProfile | undefined | null;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  transaction?: Transaction | undefined;
  appointmentDetail?: Appointment | undefined;
  specialization: string;
  timeZone: string;
  appointmentDateTime?: AppointmentDateTimeResponse;
};

function AppointmnetCancelledCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  doctorProfile,
  appointmentTimeSlots,
  transaction,
  appointmentDetail,
  specialization,
  timeZone,
  appointmentDateTime,
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
  let formatedDoctorName = `${
    doctor?.includes("Dr.") ? doctor : `Dr. ${doctor}`
  }`;

  let formatedStartTime = date.formathhmma(
    String(appointmentDetail?.appointmentDateTime?.startTime),
    timeZone
  );
  let formatedEndTime = date.formathhmma(
    String(appointmentDetail?.appointmentDateTime?.endTime),
    timeZone
  );

  const serviceTypeName =
    appointmentDetail?.appointmentTypeProposed?.type || serviceType || "-";
  return (
    <>
      <Card className={`${_classes["appointment-card"]}`}>
        <span className="text-sm mb-0">ID# {appointmentId || ""}</span>
        <h3 className="mb-0 capitalize  ">{formatedDoctorName}</h3>
        <span className="text-primary text-base block mb-6  ">
          {specialization}
        </span>
        <span className="text-sm ">Appointment type</span>
        <div className="text-sm text-gray mb-3  ">{serviceTypeName}</div>
        <span className="text-sm">Appointment date</span>
        <h6>{date.formatDAYMMDDYY(requestedDate, timeZone)}</h6>
        <span className="text-sm">Appointment time</span>

        {/* {appointmentTimeSlots?.length ? (
          appointmentTimeSlots?.map((item) => (
            <div className="text-cyan font-semibold text-sm">{`${date.formathhmma(
              item.startTime,
              timeZone
            )} - ${date.formathhmma(item.endTime, timeZone)}`}</div>
          ))
        ) : appointmentDetail?.appointmentDateTime?.startTime ? (
          <div className="text-cyan font-semibold text-sm">
            {formatedStartTime} - {formatedEndTime}
          </div>
        ) : (
          <div className="text-cyan font-semibold">{" - "}</div>
        )} */}
        <div className="text-cyan">
          {appointmentDateTime?.endTime && appointmentDateTime?.startTime
            ? `${date.formathhmma(appointmentDateTime.startTime, timeZone)}
             - ${date.formathhmma(appointmentDateTime.endTime, timeZone)}`
            : "--"}
        </div>
        <div className="inline-block mr-24">
          <span className="text-sm">Appointment status</span>
          <span className="flex text-base text-red font-bold ">{status}</span>
        </div>
        <div className="inline-block">
          <span className="text-sm">Payment status</span>
          {transaction ? (
            <span className="flex text-base text-yellow font-bold ">
              {transaction?.status}
            </span>
          ) : (
            <span className="flex text-base text-yellow font-bold ">
              Unpaid
            </span>
          )}
        </div>

        <div className="flex">
          <Button
            type={"primary"}
            className={`${_classes["card-btn"]} mr-3 ${
              isChrome && "antCustomBtn"
            }`}
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
        rebookData={appointmentDetail}
      />
    </>
  );
}

export default AppointmnetCancelledCard;
