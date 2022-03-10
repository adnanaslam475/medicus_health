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
    <Card className={_classes["doctorCard"]}>
      <div className="flex lg:flex-row flex-col md:flex-wrap">
        <div className="card-body lg:w-4/6 md:w-full flex flex-col md:flex-row lg:flex-row  md:items-start justify-start sm:justify-center md:text-left text-center">
          <div className="docAvatarCover inline-block sm:w-full md:w-1/5 self-auto">
            <Avatar
              size={88}
              src="./assets/images/doc-pic.png"
              className=""
            ></Avatar>
          </div>
          <div className="inline-block sm:w-full md:w-4/5">
            <div className="flex items-center">
              <h2 className="mb-0 mr-3">
                {doctorProfiles?.map((el, i) => {
                  return (
                    <div key={i} value={el?.user?.id}>
                      {el?.user?.first_name}
                      
                    </div>
                  );
                })}       
                Dr. Paul Wallner         
              </h2>
              <div className="flagAvatar engFlag mx-1">
                <Image src={engFlag} alt="engFlag" width={35} height={35} />
              </div>
              <div className="flagAvatar espanolFlag mx-1">
                <Image
                  src={espanolFlag}
                  alt="espanolFlag"
                  width={35}
                  height={35}
                />
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
            <h6 className="">
              Abnormal heart rythms // Aorta diseas // Conginital heart disease
              Corony artery disease // Heart Attack // Heart Faliure
            </h6>
          </div>
        </div>
        <div className="card-actionBtns mt-5 lg:mt-0 lg:w-2/6 md:w-full flex justify-start flex-col items-start">
          <Button type="default" className="mb-3 w-full bg-transparent">
            View Profile
          </Button>

          <Button
            type="primary"
            icon={<VideoCameraFilled />}
            className="mb-3 md:w-full sm:w-32"
          >
            <span className="">Request an Appointment</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
