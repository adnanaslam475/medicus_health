import React, { useState } from "react";
import Link from "next/link";
import {
  Steps,
  message,
  Modal,
  Card,
  Button,
  Divider,
  Avatar,
  Collapse,
} from "antd";
import Router, { useRouter } from "next/router";
import {
  LeftOutlined,
  VideoCameraFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
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
import {
  AppointmentServiceType,
  DoctorProfile,
  DoctorSchedule,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

const { Panel } = Collapse;

const { Step } = Steps;

type Props = {
  doctorData: DoctorProfile;
};

function DoctorProfileCard(props: Props) {
  const { doctorData } = props || {};
  const { first_name, last_name } = doctorData?.user || {};

  const [data] = useGetAllAppointmentServiceTypesQuery();

  const steps = [
    {
      title: "",
      content: (
        <AppointmentBookingStepOne
          physicianData={doctorData}
          allAppoinments={data?.data?.appointmentServiceTypes}
        />
      ),
    },
    {
      title: "",
      content: <AppointmentBookingStepTwo />,
    },
    {
      title: "",
      content: <AppointmentBookingStepThree />,
    },
    {
      title: "",
      content: <AppointmentBookingStepFour />,
    },
    {
      title: "",
      content: <SuccessMessage />,
    },
  ];

  const { language } = doctorData || "english";

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

  const todayDate = new Date();
  let today = todayDate.getDay();

  let matchDay = doctorData?.user?.doctorSchedules?.find(
    (item) => item.day == today
  );

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className={`${_classes["steps-style"]}`}
      >
        {current < steps.length - 1 && (
        <Steps>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        )}
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && current < steps.length - 1 && (
            <Button type="link" onClick={() => prev()}>
              <LeftOutlined /> <span>Back</span>
            </Button>
          )}
          {current < steps.length - 2 && (
            <Button
              type="primary"
              className={`${_classes["btn-next"]}`}
              onClick={() => next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 2 && (
            <Button
              type="primary"
              className={`${_classes["btn-next"]}`}
              onClick={() => next()}
            >
              Request an Appointment
            </Button>
          )}
        </div>
      </Modal>      
      <Card className={`${_classes["doctorProfileCard"]} rounded-xl`}>
        <div className="flex-none sm:flex">
          <div className="docAvatarCover pr-3">
            <Avatar
              size={150}
              src="../../../assets/images/doc-pic.png"
              className=""
            ></Avatar>
          </div>
          <div className="lg:pr-5 w-full mb-5">
            <div className="flex-row md:flex items-center">
              <h2 className="font-bold mb-0 mr-3">
                <span>
                  Dr. {doctorData ? first_name + " " + last_name : ""}
                </span>
              </h2>
              <div className="flex">
                <div className="flagAvatar engFlag pr-2">
                  {language && FLAG_BY_LANGUAGE[language] && (
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
            <h5 className="font-rubik text-yellow text-xs mb-1">
              {doctorData?.specialization}
            </h5>
            <span className="font-rubik text-secondary text-sm block mb-2">
              {doctorData?.year_of_experience
                ? `${doctorData?.year_of_experience}  years of experience`
                : "experience not available"}
            </span>
            <Collapse className="lg:w-4/5">
              <Panel
                key="1"
                header={
                  <div className="flex-none sm:flex flex-grow justify-between">
                    {matchDay ? (
                      <>
                        <div className="text-gray-8 ant-collapse-available">
                          Available Today
                        </div>
                        <span className="ant-collapse-time">
                          {`${date.time24HrConvert(matchDay?.startTime)} -
                          ${date.time24HrConvert(matchDay?.endTime)}`}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-8">Not Available Today</span>
                    )}
                  </div>
                }
              >
                <div className="ant-collapse-time-body">
                  {doctorData?.user?.doctorSchedules?.length !== 0
                    ? doctorData?.user?.doctorSchedules?.map((item, index) => (
                        <div className="flex-none sm:flex flex-grow justify-between mb-2">
                          <span>{date?.dayName(item.day)}</span>
                          <div>
                            <span>
                              {`${date.time24HrConvert(item?.startTime)} -
                          ${date.time24HrConvert(item?.endTime)}`}
                            </span>
                          </div>
                        </div>
                      ))
                    : "Doctor Schedules not available"}
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
                  className="highlighted-button highlighted-button-headphone btn-transparent mt-3 md:mt-0 md:ml-3">
                  <span className="hidden">Message Admin</span>
                </Button>
                <Button
                  className="highlighted-button highlighted-button-message button-phy btn-transparent mt-3 md:mt-0 sm:ml-3">
                  <span className="hidden">Message Physician</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <h4 className="font-bold mb-1">About Me</h4>
        <div className="text-gray">{doctorData?.about_me}</div>
        <Divider />
        <h4 className="font-bold mb-1">Conditions Treated</h4>
        <p className="text-secondary">
          {doctorData?.condition_treated}
        </p>
        <Divider />
        <h4 className="font-bold mb-1">Professional Background</h4>
        <div className="text-secondary">
          {doctorData?.professional_experience &&
            JSON.parse(doctorData?.professional_experience).map((item: any) => (
              <>
                <b>{item?.institution}</b>
                <span className="text-secondary block">{item?.role}</span>
              </>
            ))}
        </div>
        <Divider />
        <h4 className="font-bold mb-1">Educational Background</h4>
        <div className="text-secondary">
          {doctorData?.educational_background &&
            JSON.parse(doctorData?.educational_background).map((item: any) => (
              <>
                <b>{item?.institution}</b>
                <span className="text-secondary block">{item?.degree}</span>
              </>
            ))}
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
