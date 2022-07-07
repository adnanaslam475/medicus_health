import { Table } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  User,
} from "generated/graphql";
import React from "react";

import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";

type Props = {
  dataSource: Appointment[] | undefined;
  loading: boolean | undefined;
};

function CancelledAppointmentTable({ dataSource, loading }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "patient",
      key: "first_name",
      sorter: true,
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "appointment_service_type",
      sorter: true,
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: true,
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointment_time_slots",
      sorter: true,
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time?.selected);
        return (
          <div className="someclass">
            {time?.startTime
              ? `${date?.formathhmma(time?.startTime)} - ${date?.formathhmma(
                  time?.endTime
                )}`
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      sorter: true,
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
  return <Table columns={columns} dataSource={dataSource} loading={loading} />;
}
export default CancelledAppointmentTable;
