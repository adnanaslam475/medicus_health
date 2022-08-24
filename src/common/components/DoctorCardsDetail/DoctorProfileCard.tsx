import React, { useState } from "react";
import { Tooltip, Card, Button, Divider, Collapse } from "antd";
import Router from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import VideoCamera from "../../../../public/assets/icon/video.svg";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import BookAppointmentJourney from "../BookAppointmentJourney/BookAppointmentJourney";
import _classes from "./DoctorProfileCard.module.scss";
import {
  DoctorProfile,
  useGetPatientCurrentAppointmentsQuery,
  usePatientHealthHistoryQuery,
} from "../../../generated/graphql";
import { date } from "../../utils";
import { capitalizeFirstLetter, sorter } from "utils/helper";
import MDNextImage from "../MDNextImage/MDNextImage";
import { getUserData } from "common/utils/userData";
import Link from "next/link";
// import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";
import dayjs from "dayjs";
initTranslation(["PhysicianList"]);

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

type Props = {
  doctorData: DoctorProfile;
  loading?: boolean;
};

function DoctorProfileCard(props: Props) {
  const { doctorData, loading } = props || {};
  i18next.changeLanguage(useLocale());
  const t = i18next.t;

  // const t = useTranslations("PhysicianList");
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
        doctorId: Number(doctorData?.doctor_id),
      },
      pagination: {
        page: 1,
        limit: 10,
      },
    },
    requestPolicy: "network-only",
  });
  const { items } = getPatientCurrentAppointments?.appointments || {};

  const { first_name, last_name } = doctorData?.user || {};
  const { language } = doctorData || "english";
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

  const todayDate = new Date();
  let today = todayDate.getDay();

  let matchDay = doctorData?.user?.doctorSchedules?.find(
    (item) => item.day == today
  );
  let formatedPhysicianName =
    doctorData &&
    `${first_name?.includes("Dr.") ? first_name : `Dr. ${first_name}`}`;

  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/Cambridge_Bay";
  return (
    <>
      <Card className={`${_classes["doctorProfileCard"]} rounded-xl`}>
        <div className="flex-none sm:flex">
          <div className="docAvatarCover pr-3">
            <div className="rounded-full flex items-center justify-center overflow-hidden">
              {loading ? (
                <span className={`${_classes["emptyImgContainer"]}`}></span>
              ) : (
                <MDNextImage
                  objectFit="cover"
                  src={doctorData?.profile_image || ""}
                  layout="fixed"
                  width={206}
                  height={206}
                  className=" rounded-full h-[86px] w-[86px] overflow-hidden"
                  fallbackImage={"/assets/images/profile.svg"}
                />
              )}
            </div>
          </div>
          <div className="lg:pr-5 w-full mb-5">
            <div className="flex-row md:flex items-center">
              <h1 className="font-bold mb-0 mr-3">
                <span className="">
                  {doctorData ? formatedPhysicianName + " " + last_name : ""}
                </span>
              </h1>
              <div className="flex">
                <div className="flagAvatar engFlag pr-2">
                  {language && FLAG_BY_LANGUAGE[language] && (
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
            <h5 className="font-rubik text-primary text-xs mb-1">
              {doctorData?.specialization}
            </h5>
            <span className="font-rubik text-secondary text-sm block mb-2">
              {doctorData?.year_of_experience
                ? `${doctorData?.year_of_experience} + ${t(
                    "years_of_experience"
                  )}`
                : t("experience_not_available")}
            </span>
            <Collapse className="xl:w-4/5">
              <Collapse.Panel
                className="w-full"
                key="1"
                header={
                  <div className="flex-none sm:flex flex-grow justify-between">
                    <div className="text-gray-8 ant-collapse-available">
                      {t("see_my_availability")}
                    </div>
                  </div>
                }
              >
                <div className="ant-collapse-time-body">
                  {doctorData?.user?.doctorSchedules?.length !== 0
                    ? doctorData?.user?.doctorSchedules
                        ?.sort((a, b) => {
                          return sorter(a, b);
                        })
                        .map((item, index) => (
                          <div className="flex sm:flex flex-grow justify-between mb-2">
                            <span>{date?.dayName(item.day)}</span>
                            <div>
                              <span>
                                {dayjs(
                                  `${dayjs().format("YYYY-MM-DD")}T${
                                    item?.startTime
                                  }:00.000Z`
                                )
                                  .tz(timeZone)
                                  .format("h:mm A")}{" "}
                                -{" "}
                                {dayjs(
                                  `${dayjs().format("YYYY-MM-DD")}T${
                                    item?.endTime
                                  }:00.000Z`
                                )
                                  .tz(timeZone)
                                  .format("h:mm A")}
                              </span>
                            </div>
                          </div>
                        ))
                    : t("doctor_schedules_not_available")}
                </div>
              </Collapse.Panel>
            </Collapse>
            <div className="flex-none md:flex mt-3">
              <Tooltip
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
                  onClick={showModal}
                  disabled={
                    patientHealthHistory?.patientHealthHistory ? false : true
                  }
                >
                  <Image
                    priority={true}
                    src={VideoCamera}
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
              <div className="flex-none sm:flex">
                <Button
                  className="highlighted-button highlighted-button-headphone btn-transparent mt-3 md:mt-0 md:ml-3"
                  onClick={() => {
                    const query = {
                      chat: "admin",
                      patientId: loggedInUser,
                    };
                    // localStorage.setItem("id", JSON.stringify(query));
                    Router.push({
                      pathname: "/patient/messages",
                      query,
                    });
                  }}
                >
                  <span className="hidden">{t("message_support")}</span>
                </Button>
                <Button
                  title={
                    items && items?.length > 0
                      ? ""
                      : capitalizeFirstLetter(
                          "Please request an appointment to message physician."
                        )
                  }
                  disabled={items && items?.length > 0 ? false : true}
                  className="highlighted-button highlighted-button-message button-phy btn-transparent mt-3 md:mt-0 sm:ml-3"
                  onClick={() => {
                    const query: any = {
                      chat: "patient",
                      // patientId: adminApp_Details?.patient.patient_id,
                      doctorId: doctorData?.doctor_id,
                      patientId: loggedInUser,
                    };
                    // localStorage.setItem("id", JSON.stringify(query));
                    Router.push({
                      pathname: "/patient/messages",
                      query,
                    });
                  }}
                >
                  <span className="hidden">{t("message_physician")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <h4 className="font-bold mb-1">
          {t("about_me")}
          {/* About me */}
        </h4>
        <div className="text-gray text-md">
          <h6 className="text-gray ">{doctorData?.about_me}</h6>
        </div>
        <Divider />
        <h4 className="font-bold mb-1">
          {t("conditions_treated")}
          {/* Conditions treated */}
        </h4>
        <h6 className="text-secondary">{doctorData?.condition_treated}</h6>
        <Divider />

        <h4 className="font-bold mb-1">{t("certification_and_licensure")}</h4>
        <div className="text-secondary">
          {doctorData?.certification_and_licensure &&
            JSON.parse(doctorData?.certification_and_licensure).map(
              (item: any) => (
                <>
                  {/* <b>{item?.certification}</b> */}
                  <span className="text-secondary block">
                    {item?.certification_and_licensure}
                  </span>
                </>
              )
            )}
        </div>
        <Divider />

        <h4 className="font-bold mb-1">{t("professional_background")}</h4>
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
        <h4 className="font-bold mb-1">
          {t("educational_background")}
          {/* Educational background */}
        </h4>
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

        <Divider />
        <h4 className="font-bold mb-1">{t("awards_honors_recognition")}</h4>
        <div className="text-secondary">
          {doctorData?.awards_honors_recognition &&
            JSON.parse(doctorData?.awards_honors_recognition).map(
              (item: any) => (
                <>
                  <span className="text-secondary block">
                    {item?.awards_honors_and_recognition}
                  </span>
                </>
              )
            )}
        </div>
        <Divider />
        <a
          href="#"
          className="text-base flex items-center"
          onClick={() => Router.push("/patient/physicians")}
        >
          <ArrowLeftOutlined />
          <span className="ml-2">
            {t("back_to_physicians")}
            {/* Back to physicians */}
          </span>
        </a>
      </Card>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        doctorData={doctorData}
      />
    </>
  );
}

export default DoctorProfileCard;
