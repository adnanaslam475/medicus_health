import React, { useState } from "react";
import { Modal, Card, Button, Divider, Avatar, Collapse } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { VideoCameraFilled, ArrowLeftOutlined } from "@ant-design/icons";
import VideoCamera from "../../../../public/assets/icon/video.svg";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorProfileCard.module.scss";
import AppointmentBookingStepOne from "../../../common/components/Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepTwo from "../../../common/components/Appointments/booking/AppointmentBookingStepTwo";
import AppointmentBookingStepThree from "../../../common/components/Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepFour from "../../../common/components/Appointments/booking/AppointmentBookingStepFour";
import SuccessMessage from "../../../common/components/Appointments/booking/SuccessMessage";
import { DoctorProfile } from "../../../generated/graphql";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

type Props = {
  doctorData: DoctorProfile;
};

const { Panel } = Collapse;

function DoctorProfileCard(props: Props) {
  const { doctorData } = props || {};

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

  const { first_name, last_name } = doctorData?.user || {};

  return (
    <>
      <Modal
        title="Request an Appointment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AppointmentBookingStepOne />
        <AppointmentBookingStepTwo />
        <AppointmentBookingStepThree />
        <AppointmentBookingStepFour />
        <SuccessMessage/>
      </Modal>
      <Card className={`${_classes["doctorProfileCard"]} rounded-xl`}>
        <div className="flex-none sm:flex">
          <div className="docAvatarCover pr-3">
            <Avatar
              size={150}
              src="../assets/images/doc-pic.png"
              className=""
            ></Avatar>
          </div>
          <div className="lg:pr-5 w-full mb-5">
            <div className="flex-row md:flex items-center">
              <h2 className="font-bold mb-0 mr-3">
                <span>Dr. {first_name + " " + last_name}</span>
              </h2>
              <div className="flex">
                <div className="flagAvatar engFlag pr-2">
                  {FLAG_BY_LANGUAGE[doctorData?.language] && (
                    <Image
                      src={FLAG_BY_LANGUAGE[doctorData?.language]}
                      // src={espanolFlag}
                      alt={doctorData?.language || "flag"}
                      width={25}
                      height={25}
                    />
                  )}
                </div>
              </div>
            </div>
            <h5 className="text-primary text-xs mb-1">
              {doctorData?.specialization}
            </h5>
            <span className="text-secondary text-sm block mb-2">
              {doctorData?.year_of_experience + " "}years of experience
            </span>
            <Collapse className="lg:w-4/5">
              <Panel
                key="1"
                header={
                  <div className="flex-none sm:flex flex-grow justify-between">
                    <div className="ant-collapse-available">
                      Available Today
                    </div>
                    <span className="ant-collapse-time">
                      12:00 pm - 09:00 pm
                    </span>
                  </div>
                }
              >
                <div className="ant-collapse-time-body">
                  {doctorData?.user?.doctorSchedules?.map((item, index) => (
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                      <span>{item?.day}</span>
                      <div>
                        <span>
                          {item?.startTime}- {item?.endTime}
                        </span>
                        {/* <span>12:00 PM - 03:00 PM</span>
                        <span>07:00 PM - 09:00 PM</span> */}
                      </div>
                    </div>
                  ))}

                  {/* <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Tuesday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Wednesday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Thursday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Friday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Saturday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex-none sm:flex flex-grow justify-between mb-2">
                        <span>Sunday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div> */}
                </div>
              </Panel>
            </Collapse>
            <div className="flex-none md:flex mt-3">
              <Button type="primary" onClick={showModal}>
                <Image
                  src={VideoCamera}
                  alt="espanolFlag"
                  width={20}
                  height={11}
                />
                <span className="ml-2">Request an Appointment</span>
              </Button>
              <div className="flex-none sm:flex">
                <Button
                  className="highlighted-button btn-transparent mt-3 md:mt-0 md:ml-3"
                  icon={<VideoCameraFilled />}
                >
                  <span className="hidden">Message Admin</span>
                </Button>
                <Button
                  className="highlighted-button button-phy btn-transparent mt-3 md:mt-0 sm:ml-3"
                  icon={<VideoCameraFilled />}
                >
                  <span className="hidden">Message Physician</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <h4 className="font-bold mb-1">About Me</h4>
        <div className="text-gray text-base">{doctorData?.about_me}</div>
        <Divider />
        <h4 className="font-bold mb-1">Conditions Treated</h4>
        <p className="text-base text-secondary">
          {doctorData?.condition_treated}
        </p>
        <Divider />
        <h4 className="font-bold mb-1">Professional Background</h4>
        <div className="text-base text-secondary">
          {doctorData?.professional_experience}
        </div>
        <Divider />
        <h4 className="font-bold mb-1">Educational Background</h4>
        <div className="text-base text-secondary">
          {doctorData?.educational_background}
        </div>
        <Divider />
        <a
          href="#"
          className="text-base flex items-center"
          onClick={() => Router.push("/patient/physicians")}
        >
          <ArrowLeftOutlined /> <span className="ml-2">Back to Physicians</span>
        </a>
      </Card>
    </>
  );
}

export default DoctorProfileCard;
