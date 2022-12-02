import React, { useEffect, useState } from "react";
import { Tooltip, Card, Divider, Avatar, Button, Steps, Modal } from "antd";
import Router from "next/router";
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
import {
  DoctorProfile,
  useGetPatientCurrentAppointmentsQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { useTranslations } from "next-intl";
import { capitalizeFirstLetter, isChrome } from "utils/helper";

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
  const t = useTranslations("PhysicianList");
  //Get logged in User
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};
  // Get patient Health History
  const [{ data: patientHealthHistory }] = usePatientHealthHistoryQuery({
    variables: { input: Number(loggedInUser) },
    requestPolicy: "network-only",
  });

  const [
    { data: getPatientCurrentAppointments },
    executeUseGetPatientCurrentAppointmentsQuery,
  ] = useGetPatientCurrentAppointmentsQuery({
    variables: {
      filter: {
        doctorId: Number(id),
      },
      pagination: {
        page: 1,
        limit: 10,
      },
    },
    requestPolicy: "network-only",
  });
  const { items } = getPatientCurrentAppointments?.appointments || {};

  // FOR REQUEST AN APPOINTMENT
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    executeUseGetPatientCurrentAppointmentsQuery({
      requestPolicy: "network-only",
    });
    setIsModalVisible(false);
  };

  const [current, setCurrent] = React.useState(0);
  const [isAppointmentCreated, setIsAppointmentCreated] = React.useState(true);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  let formatedDoctorName = `${name?.includes("Dr.") ? name : `Dr. ${name}`}`;
  return (
    <>
      <Card className={`${_classes["doctorCard"]} rounded-lg`}>
        <div className="flex-none lg:flex">
          <div className="w-full lg:w-4/6 flex-none sm:flex">
            <div className="docAvatarCover pr-3">
              <div className="rounded-full flex items-center justify-center overflow-hidden ">
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
                    fallbackImage="/assets/images/profile.svg"
                  />
                )}
              </div>
            </div>
            <div className="lg:pr-5">
              <div className="flex-row md:flex">
                <h2 className="font-bold mb-0 mr-3">
                  <span>
                    <span className="capitalize">{formatedDoctorName}</span>
                  </span>
                </h2>
                <div className="flex">
                  <div className="flagAvatar engFlag pr-2 pt-1">
                    {language &&
                      [JSON.parse(language)]?.map((item: any) => {
                        const keys = Object.keys(item).filter(
                          (k) => item[k] === true
                        );
                        return (
                          <>
                            {keys.map((v) => {
                              return (
                                <>
                                  <Tooltip title={v || "flag"} color="#FFF">
                                    <Image
                                      priority={true}
                                      src={
                                        (v === "English" && engFlag.src) ||
                                        (v === "Spanish" && espanolFlag.src) ||
                                        ""
                                      }
                                      alt={"flag"}
                                      width={25}
                                      height={25}
                                    />
                                  </Tooltip>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              <h5 className="text-primary text-xs mb-1">{specialization}</h5>
              <span className="text-secondary text-sm">
                {yearOfExperience}+ {t("years_of_experience")}
              </span>
              <h6 className="font-rubik text-gray mt-3 font-normal break-all">
                {aboutMe}
              </h6>
              <Divider />

              <h6 className="text-gray font-normal">
                <span className="text-sm font-rubik">
                  {t("conditions_treated")}
                </span>
              </h6>
              <h6 className="font-normal font-rubik">
                {conditionTreated.slice(4)}
              </h6>
            </div>
          </div>
          <div className="card-actionBtns lg:w-2/5">
            {items && items?.length > 0 ? (
              <Button className={`w-full mb-3 ${isChrome && "antCustomBtn"}`}>
                <a
                  onClick={() => {
                    const query: any = {
                      chat: "patient",
                      // patientId: adminApp_Details?.patient.patient_id,
                      doctorId: id,
                      patientId: loggedInUser,
                    };
                    // localStorage.setItem("id", JSON.stringify(query));
                    Router.push({
                      pathname: "/patient/messages",
                      query,
                    });
                  }}
                >
                  {t("message_physician")}
                  {/* Message physician */}
                </a>
              </Button>
            ) : (
              <div className="w-full flex justify-center my-3">
                <Tooltip
                  title={capitalizeFirstLetter(
                    "Please request an appointment to message physician."
                  )}
                  // {capitalizeFirstLetter(value)}
                >
                  <Button
                    className={`${_classes["btn-tooltip"]} w-full ${
                      isChrome && "antCustomBtn"
                    } tracking-tighter`}
                    disabled={true}
                  >
                    Message physician
                  </Button>
                </Tooltip>
              </div>
            )}

            <Link passHref href={`/patient/physicians/profile/${id}`}>
              <a className="mb-3 w-full bg-transparent border border-primary rounded-md flex items-center justify-center h-12">
                {t("view_profile")}
                {/* View profile */}
              </a>
            </Link>
            <Tooltip
              className="w-full"
              title={
                patientHealthHistory?.patientHealthHistory ? (
                  ""
                ) : (
                  <Link passHref href={`/patient/account?activeTab=2`}>
                    {t("please_complete_health_questionnaire")}
                    {/* please complete health questionnaire */}
                  </Link>
                )
              }
            >
              <Button
                type="primary"
                className={`${_classes["btn-tooltip"]}  ${
                  isChrome && "antCustomBtn"
                }`}
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
                <span className="ml-2">
                  {t("request_an_appointment")}
                  {/* Request an appointment */}
                </span>
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
