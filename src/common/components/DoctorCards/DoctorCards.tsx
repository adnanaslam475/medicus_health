import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { VideoCameraFilled } from "@ant-design/icons";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorCard.module.scss";
import { useDoctorProfilesQuery } from "../../../generated/graphql";

function DoctorCard() {
  const [{ data }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  return (
    <Card className={`${_classes["doctorCard"]} rounded-xl`}>
      <div className="flex-none lg:flex">
        <div className="lg:w-4/6 flex-none sm:flex">
          <div className="docAvatarCover pr-3">
            <Avatar
              size={86}
              src="./assets/images/doc-pic.png"
              className=""
            ></Avatar>
          </div>
          <div className="lg:pr-5">
            <div className="flex-row md:flex">
              <h2 className="mb-0 mr-3 pr-4">
                <span>Dr. Paul Wallner</span>
              </h2>
              <div className="flex">
                <div className="flagAvatar engFlag pr-2">
                  <Image src={engFlag} alt="engFlag" width={25} height={25} />
                </div>
                <div className="flagAvatar espanolFlag">
                  <Image
                    src={espanolFlag}
                    alt="espanolFlag"
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
            <h5 className="text-primary text-xs">Cardiologist</h5>
            <span className="text-sm">10+ years of experience</span>
            <h6 className="text-gray-2 font-normal">
              Heads up! This alert needs your attention, but it&apos;s not super
              imporant
            </h6>
            <Divider />

            <h6 className="text-gray-2 font-normal">
              <span className="text-sm font-rubik">CONDITIONS TREATED </span>
            </h6>
            <h6>
              Abnormal heart rythms // Aorta diseas // Conginital heart disease
              Corony artery disease // Heart Attack // Heart Faliure
            </h6>
          </div>
        </div>
        <div className="card-actionBtns lg:w-2/6">
          <Button
            type="default"
            className="mb-3 w-full bg-transparent"
            onClick={() => Router.push("/patient/physicians/profile")}
          >
            View Profile
          </Button>
          <Button
            type="primary"
            icon={<VideoCameraFilled />}
            className="w-full"
          >
            <span className="">Request an Appointment</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
