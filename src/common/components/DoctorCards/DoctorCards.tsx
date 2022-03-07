import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { VideoCameraFilled } from "@ant-design/icons";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png"

// type StatusName = "confirmed" | "request" | "pending" | "cancelled";

// type StatusType<K extends StatusName> = {
//   [k in K]: {
//     lable: string;
//     color: string;
//     button: {
//       show: boolean;
//       type: string;
//     };
//   };
// };


function DoctorCard() {
  // { status }: props)
  // const { lable, color, button } = APPOINTMENT_STATUS[status] || {};
  return (
    <Card
      //   title="Default size card"
      style={{
        // width: 259,
        backgroundColor: "#F6F8FA",
        border: 0,
        // marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <div className="flex">
        <div className="w-1/7 mr-3">
          <Avatar
            size={88}
            src="./assets/images/doc-pic.png"
            className=""
          ></Avatar>
        </div>
        <div className="card-body w-5/7 lg:mr-3">
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
        <div className="card-actionBtns w-2/7">
          <Button type="default" style={{ background: "transparent" }} className="mb-3 w-full"> View Profile</Button>

          <Button type="primary" icon={<VideoCameraFilled /> } className="mb-3">
            <span className="">Request an Appointment</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
