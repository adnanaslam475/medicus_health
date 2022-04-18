import React, { useState } from "react";
import { Card, Divider, Avatar, Button, Steps, Modal } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import VideoCameraFilled from "../../../../public/assets/icon/video.svg";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorCard.module.scss";
import { date } from "../../utils";
import { LeftOutlined } from "@ant-design/icons";
// import AppointmentBookingStepOne from "../Appointments/booking/AppointmentBookingStepOne";
// import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";
// import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
// import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
// import SuccessMessage from "../Appointments/booking/SuccessMessage";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

type props = {
  id: number;
  name: string;
  language: string;
  specialization: string;
  aboutMe: string;
  yearOfExperience: number;
  professionalExperience: string;
  conditionTreated: string;
};

function DoctorCard({
  id,
  name,
  language,
  specialization,
  aboutMe,
  yearOfExperience,
  professionalExperience,
  conditionTreated,
}: props) {
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
      
      <Card className={`${_classes["doctorCard"]} rounded-xl`}>
        <div className="flex-none lg:flex">
          <div className="lg:w-4/6 flex-none sm:flex">
            <div className="docAvatarCover pr-3">
              <Avatar
                size={86}
                src="../assets/images/doc-pic.png"
                className=""
              ></Avatar>
            </div>
            <div className="lg:pr-5">
              <div className="flex-row md:flex">
                <h2 className="font-bold mb-0 mr-3">
                  <span>Dr. {name}</span>
                </h2>
                <div className="flex">
                  <div className="flagAvatar engFlag pr-2">
                    {FLAG_BY_LANGUAGE[language] && (
                      <Image
                        src={FLAG_BY_LANGUAGE[language]}
                        alt={language || "flag"}
                        width={25}
                        height={25}
                      />
                    )}
                  </div>
                </div>
              </div>
              <h5 className="text-primary text-xs mb-1">{specialization}</h5>
              <span className="text-secondary text-sm">
                {yearOfExperience} years of experience
              </span>
              <h6 className="font-rubik text-gray mt-3">{aboutMe}</h6>
              <Divider />

              <h6 className="text-gray font-normal">
                <span className="text-sm font-rubik">CONDITIONS TREATED </span>
              </h6>
              <h6>{conditionTreated}</h6>
            </div>
          </div>
          <div className="card-actionBtns lg:w-2/6">
            <Link passHref href={`/patient/physicians/profile/${id}`}>
              <a className="mb-3 w-full bg-transparent border border-primary rounded-md flex items-center justify-center h-12">
                View Profile
              </a>
            </Link>

            <Button type="primary" className="w-full">
              <Image
                src={VideoCameraFilled}
                alt="espanolFlag"
                width={20}
                height={11}
              />
              <span className="ml-2">Request an Appointment</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default DoctorCard;
