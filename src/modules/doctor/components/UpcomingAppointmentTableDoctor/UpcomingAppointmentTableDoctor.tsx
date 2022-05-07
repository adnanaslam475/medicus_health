import { Table } from "antd";
import { Appointment, AppointmentServiceType, User } from "generated/graphql";
import React from "react";
import Image from "next/image";
import engFlag from "../../../../../public/assets/images/engFlag.png";
import espanolFlag from "../../../../../public/assets/images/espanolFlag.png";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";

type Props = {
  dataSource: Appointment[] | undefined;
};

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

function UpcomingAppointmentTableDoctor({ dataSource }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "doctorId",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },

      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
    },
    {
      title: "Time",
      dataIndex: "language",
      render: (language: string) => {
        return (
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
        );
      },
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "serviceType",
      render: (value: AppointmentServiceType) => value.price,
      sorter: {
        compare: (a: any, b: any) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      dataIndex: "id",
      className: "table-action-icon",
      render: (appointmentId: number) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/doctor/appointments/upcoming/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
}

export default UpcomingAppointmentTableDoctor;
