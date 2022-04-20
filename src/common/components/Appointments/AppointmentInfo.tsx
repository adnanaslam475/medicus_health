import React from "react";
import { Button, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import { ButtonType } from "antd/lib/button";
import { GetAppointmentByIdQuery } from "../../../generated/graphql";

type Props = {
  appoinmentDetails: GetAppointmentByIdQuery | undefined;
};

function AppointmentInfo(props: Props) {
  const { appoinmentDetails } = props;
  const { first_name, last_name } =
    appoinmentDetails?.appointment?.doctor || {};

  const { status } = appoinmentDetails?.appointment || {};

  const { name, price } = appoinmentDetails?.appointment?.serviceType || {};
  return (
    <React.Fragment>
      <ul className="w-4/6">
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">ID</div>
          <div className="w-full text-secondary">A-0001</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Booked on</div>
          <div className="w-full text-secondary">February 1, 2022</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Doctor</div>
          <div className="w-full text-secondary">
            Dr. {`${first_name} ${last_name}`}
          </div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Type</div>
          <div className="w-full text-secondary">{name}</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Date</div>
          <div className="w-full text-secondary">February 5, 2022</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Time</div>
          <div className="w-full text-secondary">08:00 am - 08:30 am</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Total Amount</div>
          <div className="w-full text-secondary">${price}</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Status</div>
          <div className="w-full text-secondary">
            <Tag
              color="#e2f8f7"
              className="ant-typography ant-typography-secondary"
            >
              {status}
            </Tag>
          </div>
        </li>
      </ul>
      <div className="w-4/6 flex justify-between mt-4">
        <div className="flex">
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]} mr-3`}
          >
            Message Admin
          </Button>
          <Button
            icon={<MessageOutlined />}
            className={`${_classes["appointments-btn"]}`}
          >
            Message Physician
          </Button>
        </div>
        <Button
          type="primary"
          icon={<VideoCameraFilled />}
          className={`${_classes["appointments-btn"]} bg-current`}
        >
          Join Now
        </Button>
      </div>
    </React.Fragment>
  );
}
export default AppointmentInfo;
