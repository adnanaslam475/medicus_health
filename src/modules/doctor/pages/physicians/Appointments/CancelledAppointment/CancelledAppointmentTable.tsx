import { Table } from "antd";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  DoctorSchedule,
  User,
} from "generated/graphql";
import React from "react";

import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";
import { getUserData } from "common/utils/userData";

type Props = {
  dataSource: Appointment[] | undefined;
  loading:boolean|undefined;
};

function CancelledAppointmentTable({ dataSource,loading }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
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
      title: "Type",
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
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",

      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return <div className="someclass">{appointmentDateTime?.startTime ? date?.formatMMMMDDYYYY(appointmentDateTime?.startTime) : "--"}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return (
					<div>{appointmentDateTime?.startTime && appointmentDateTime?.endTime ? `${date?.formathhmma(
						appointmentDateTime?.startTime
					)} - ${date?.formathhmma(appointmentDateTime.endTime)}` : "--"}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      render: (value: number) => {
        return <div className="someclass">{value ? `$${value}` : ""}</div>;
      },
    },
    {
      dataIndex: "id",
      className: "table-action-icon",
      key: "id",
      render: (appointmentId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(
                `/physician/appointments/cancelled/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} loading={loading} scroll={{x:true}} />;
}
export default CancelledAppointmentTable;
