import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { VideoCameraFilled } from "@ant-design/icons";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png"
import _classes from "./DoctorCard.module.scss";


function DoctorCard() {

  return (
    <Card
      //   title="Default size card"      
      className={_classes["doctorCard"]}>
      <div className="flex lg:flex-row flex-col md:flex-wrap">
        
        <div className="card-body lg:w-4/6 md:w-full lg:flex-row md:flex-row sm:flex-column justify-start sm:justify-center">
          <span className="docAvatarCover inline-block sm:block sm:w-full md:w-1/5 ">
          <Avatar
            size={88}
            src="./assets/images/doc-pic.png"
            className=""
          ></Avatar>
          </span>
          <div className="inline-block md:w-full md:mx-3">
          <div className="flex items-center">
            <h2 className="mb-0 mr-3">Dr. Paul Wallner</h2>
            <div className="flagAvatar engFlag mx-1"><Image src={engFlag} alt="engFlag" width={35} height={35}/></div>
            <div className="flagAvatar espanolFlag mx-1"><Image src={espanolFlag} alt="espanolFlag" width={35} height={35}/></div>
          </div>
          <h5 className="text-primary text-xs">Cardiologist</h5>
          <span className="font-14">10+ years of experience</span>
          <h6 className="text-gray-2 font-normal">
            Heads up! This alert needs your attention, but it's not super
            imporant
          </h6>
          <Divider />

          <h6 className="text-gray-2 font-normal">
            <span className="font-14 font-rubik">CONDITIONS TREATED </span>
          </h6>
          <h6 className="">
            Abnormal heart rythms // Aorta diseas // Conginital heart disease
            Corony artery disease // Heart Attack // Heart Faliure
          </h6>
          </div>
          
        </div>
        <div className="card-actionBtns mt-5 lg:mt-0 lg:w-2/6 md:w-full flex justify-start flex-col items-start">
          <Button type="default" className="mb-3 w-full bg-transparent"> View Profile</Button>

          <Button type="primary" icon={<VideoCameraFilled /> } className="mb-3 md:w-full sm:w-32">
            <span className="">Request an Appointment</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
