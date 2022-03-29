import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import VideoCameraFilled from "../../../../public/assets/icon/video.svg";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorCard.module.scss";
import { date } from "../../utils";
// import { useDoctorProfilesQuery } from "../../../generated/graphql";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

type props = {
  name: string;
  language: string;
  specialization: string;
  aboutMe: string;
  yearOfExperience: number;
  professionalExperience: string;
  conditionTreated: string;
};

function DoctorCard({
  name,
  language,
  specialization,
  aboutMe,
  yearOfExperience,
  professionalExperience,
  conditionTreated,
}: props) {
  return (
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
                <span>
                  {/* Dr.{data.user.first_name} {data.user.last_name} */}
                  Dr.{name}
                </span>
              </h2>
              <div className="flex">
                <div className="flagAvatar engFlag pr-2">
                  {FLAG_BY_LANGUAGE[language] && (
                    <Image
                      src={FLAG_BY_LANGUAGE[language]}
                      // src={espanolFlag}
                      alt={language || "flag"}
                      width={25}
                      height={25}
                    />
                  )}
                </div>
                {/* <div className="flagAvatar espanolFlag">
                  <Image
                    src={espanolFlag}
                    alt="espanolFlag"
                    width={25}
                    height={25}
                  />
                </div> */}
              </div>
            </div>
            <h5 className="text-primary text-xs mb-1">
              {/* cardiologist */}
              {specialization}
            </h5>
            <span className="text-secondary text-sm">
              {yearOfExperience} years of experience
            </span>
            <h6 className="font-rubik text-gray mt-3">
              {/* Heads up! This alert needs your attention, but it&apos;s not super
              imporant */}
              {aboutMe}
            </h6>
            <Divider />

            <h6 className="text-gray font-normal">
              <span className="text-sm font-rubik">CONDITIONS TREATED </span>
            </h6>
            <h6>
              {/* Abnormal heart rythms // Aorta diseas // Conginital heart disease
              Corony artery disease // Heart Attack // Heart Faliure */}
              {conditionTreated}
            </h6>
          </div>
        </div>
        <div className="card-actionBtns lg:w-2/6">
          <Link passHref href="/patient/physicians/profile">
            <a className="mb-3 w-full bg-transparent border border-primary rounded-md flex items-center justify-center h-12">
              View Profile
            </a>
          </Link>

          <Button
            type="primary"
            className="w-full"
          >
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
  );
}

export default DoctorCard;
