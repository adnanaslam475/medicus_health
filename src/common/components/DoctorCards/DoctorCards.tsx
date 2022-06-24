import React, { useState } from "react";
import { Tooltip, Card, Divider, Avatar, Button, Steps, Modal } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import VideoCameraFilled from "../../../../public/assets/icon/video.svg";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorCard.module.scss";
import { date } from "../../utils";
import { LeftOutlined } from "@ant-design/icons";
import BookAppointmentJourney from "../BookAppointmentJourney/BookAppointmentJourney";
import MDNextImage from "../MDNextImage/MDNextImage";
import { DoctorProfile, usePatientHealthHistoryQuery } from "generated/graphql";
import { getUserData } from "common/utils/userData";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

type Props = {
  id: number;
  name: string;
  language: string;
  specialization: string;
  aboutMe: string;
  yearOfExperience: number;
  professionalExperience: string;
  conditionTreated: string;
  profile_image?: string | null;
  doctorProfile?: DoctorProfile;
  loading?: boolean;
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
  profile_image,
  doctorProfile,
  loading,
}: Props) {
  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

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
      <Card className={`${_classes["doctorCard"]} rounded-lg`}>
        <div className="flex-none lg:flex">
          <div className="lg:w-4/6 flex-none sm:flex">
            <div className="docAvatarCover pr-3">
              <div className="rounded-full flex items-center justify-center overflow-hidden sm:border border-gray-1">
                {loading ? (
                  <span className={`${_classes["emptyImgContainer"]}`}></span>
                ) : (
                  <MDNextImage
                    objectFit="cover"
                    src={profile_image || ""}
                    layout="fixed"
                    width={86}
                    height={86}
                    className=" rounded-full h-[86px] w-[86px] overflow-hidden"
                    fallbackImage="/assets/images/doc-pic.png"
                  />
                )}
              </div>
            </div>
            <div className="lg:pr-5">
              <div className="flex-row md:flex">
                <h2 className="font-bold mb-0 mr-3">
                <span>Dr. <span className="-ml-1">{name}</span></span>
                </h2>
                <div className="flex">
                  <div className="flagAvatar engFlag pr-2">
                    {FLAG_BY_LANGUAGE[language] && (
                      <Tooltip title={language || "flag"} color="#FFF">
                        <Image
                          priority={true}
                          src={FLAG_BY_LANGUAGE[language]}
                          alt={language || "flag"}
                          width={25}
                          height={25}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
              <h5 className="text-primary text-xs mb-1">{specialization}</h5>
              <span className="text-secondary text-sm">
                {yearOfExperience}+ years of experience
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
            <Link passHref href={`/physician/messages`}>
              <a className="mb-3 w-full bg-transparent border border-primary rounded-md flex items-center justify-center h-12">
                Message Physician
              </a>
            </Link>

            <Link passHref href={`/patient/physicians/profile/${id}`}>
              <a className="mb-3 w-full bg-transparent border border-primary rounded-md flex items-center justify-center h-12">
                View Profile
              </a>
            </Link>
            <Tooltip
              className="w-full"
              title={
                patientHealthHistory?.patientHealthHistory ? (
                  ""
                ) : (
                  <Link passHref href={`/patient/account?activeTab=2`}>
                    please complete health questionnaire
                  </Link>
                )
              }
            >
              <Button
                type="primary"
                className={`${_classes["btn-tooltip"]} `}
                onClick={showModal}
                disabled={
                  patientHealthHistory?.patientHealthHistory ? false : true
                }
              >
                <Image
                  priority={true}
                  src={VideoCameraFilled}
                  alt="espanolFlag"
                  width={20}
                  height={11}
                />
                <span className="ml-2">Request an Appointment</span>
              </Button>
            </Tooltip>
          </div>
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

export default DoctorCard;
