import React from "react";
import Image from "next/image";
import _classes from "./../AppointmentCard.module.scss";
import camera from "../../../../../public/assets/images/camera.svg";
import { Button, Card, Space } from "antd";
import { AppointmentTimeSlots } from "../../../../generated/graphql";
import { date } from "../../../utils";
import { MessageOutlined } from "@ant-design/icons";
import Router  from "next/router";

type Props = {
  appointmentId: number | undefined;
  requestedDate: string;
  status: string | null | undefined;
  serviceType: string | undefined;
  doctor: string | undefined;
  appointmentTimeSlots: AppointmentTimeSlots[] | undefined | null;
  setShowModal?: (id: boolean) => void;
  onViewSuggestedSlots: () => void;
};

function AppointmnetCurrentCard({
  appointmentId,
  requestedDate,
  status,
  serviceType,
  doctor,
  appointmentTimeSlots,
  setShowModal,
  onViewSuggestedSlots,
}: Props) {
  return (
    <Card className={`${_classes["appointment-card"]}`}>
      {/* replce appoint id wit id comming from api */}
         <h3 className="mb-0"> {appointmentId ||"Appointment-id"}</h3> 
       <h3 className="mb-0">Dr. {doctor}</h3>
      <span className="text-gray text-base block">{serviceType}</span>
      <Space direction="vertical" size="middle" />
      <span className="text-sm">Date</span>
      <h6>{date.formatMMMMDDYYYY(requestedDate)}</h6>
      <Space direction="vertical" size="middle" />
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
      <Space direction="vertical" size="middle" />
      <span className="text-base text-green-3 font-bold ">{status}</span>
      <Space direction="vertical" size="middle" />
      <div className="flex">
      <Button
					type="primary"
					className={`${_classes["appointments-btn"]} bg-current mr-3`}
				
				>
					<Image
						src={camera}
						width={15}
						height={15}
						className="mb-0"
						alt="camera"
					/>
					<span className="ml-2 mt-1">Join Now</span>
				</Button>
        <Button
					type="default"
					className={`${_classes["appointments-btn"]} bg-current mr-3`}
          onClick={()=>Router.push(`/patient/appointments/detail`)}
				
				>
					<span className="ml-2 mt-1">Detail</span>
				</Button>
      </div> 
        <div className=" flex">
      <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn-message"]} mr-3 my-2 text-xs`}
              // onClick={() =>
              //   Router.push({
              //     pathname: "/physician/messages",
              //     query: {
              //       chat: "admin",
              //       doctorId: doctorId,
              //       patientId: patientId,
              //     },
              //   })
              // }
            >
              Message Admin
            </Button>
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn-message"]} mr-3 my-2`}
              // onClick={() =>
              //   Router.push({
              //     pathname: "/physician/messages",
              //     query: {
              //       chat: "admin",
              //       doctorId: doctorId,
              //       patientId: patientId,
              //     },
              //   })
              // }
            >
              Message physician
            </Button>
            </div>
    </Card>
  );
}

export default AppointmnetCurrentCard;
