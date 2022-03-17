import React from "react";
import { Card, Button, Divider, Avatar } from "antd";
import { Collapse } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { VideoCameraFilled } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import engFlag from "../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../public/assets//images/espanolFlag.png";
import _classes from "./DoctorProfileCard.module.scss";
import { useDoctorProfilesQuery } from "../../../generated/graphql";

const { Panel } = Collapse;

function DoctorProfileCard() {
  const [{ data }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  return (
    <Card className={`${_classes["doctorProfileCard"]} rounded-xl`}>
      <div className="flex-none sm:flex">
        <div className="docAvatarCover pr-3">
          <Avatar
            size={150}
            src="./assets/images/doc-pic.png"
            className=""
          ></Avatar>
        </div>
        <div className="lg:pr-5 w-full">
          <div className="flex-row md:flex items-center">
            <h2 className="mb-0 mr-3 pr-4">
              <span>Dr. Jonathan Green</span>
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
          <h5 className="text-primary text-xs mb-1">Cardiologist</h5>
          <span className="text-sm">10+ years of experience</span>
          <Collapse className="lg:w-4/5">
            <Panel
              key="1"
              header={
                <div className="flex flex-grow justify-between">
                    <div className="ant-collapse-available">Available Here</div>
                  <span className="ant-collapse-time">12:00 pm - 09:00 pm</span>
                </div>
                }
                >
                <div className="ant-collapse-time-body">
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Monday</span>
                        <div>
                            <span>07:00 AM - 09:00 AM</span>
                            <span>12:00 PM - 03:00 PM</span>
                            <span>07:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Tuesday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Wednesday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Thursday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Friday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Saturday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-between mb-2">
                        <span>Sunday</span>
                        <div>
                            <span>12:00 PM - 09:00 PM</span>
                        </div>
                    </div>
                </div>
            </Panel>
          </Collapse>
          <div className="flex mt-3">
            <Button
                type="primary"
                icon={<VideoCameraFilled />}
            >
                <span>Request an Appointment</span>
            </Button>
            <Button
                className="highlighted-button bg-transparent ml-3"
                icon={<VideoCameraFilled />}
            >
                <span className="hidden">Message Admin</span>
            </Button>
            <Button
                className="highlighted-button button-phy  bg-transparent ml-3"
                icon={<VideoCameraFilled />}
            >
                <span className="hidden">Message Physician</span>
            </Button>
          </div>
        </div>
      </div>
        <Divider />
        <h3>About Us</h3>
        <p>Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex 
          ante id nibh. In vehicula ligula vitae pulvinar malesuada. 
          Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. 
          Sed iaculis justo at feugiat porttitor.</p>
          <p>Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex 
          ante id nibh. In vehicula ligula vitae pulvinar malesuada. 
          Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. 
          Sed iaculis justo at feugiat porttitor.
        </p>
        <Divider />
        <h3>Conditions Treated</h3>
        <p>
            Abnormal heart rythms // Aorta diseas // Conginital heart disease
            Corony artery disease // Heart Attack // Heart Faliure
        </p>
        <Divider />
        <h3>Professional Background</h3>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <Divider />
        <h3>Educational Background</h3>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <p>
            <span className="font-medium">Cook County Health and Hospitals System</span>
            <span className="block">Fellowship, Cardiovascular Disease</span>
        </p>
        <Divider />
        <a href="#" className="flex items-center" onClick={() => Router.push("/patient/physicians")}><ArrowLeftOutlined /> <span className="ml-2">Back to Physicians</span></a>


    </Card>
  );
}

export default DoctorProfileCard;
