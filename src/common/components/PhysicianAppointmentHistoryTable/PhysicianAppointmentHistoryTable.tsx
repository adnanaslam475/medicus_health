import React from "react";
import { Table, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
  AppointmentServiceType,
  AppointmentTimeSlots,
  User,
} from "generated/graphql";
import Router from "next/router";

type Props = {
  data?: any;
};

function PhysicianAppointmentHistoryTable(props: Props) {
  const { data } = props || {};
  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Booking Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      render: (value: string) => {
        return <div>{`${date?.formatMMMMDDYYYY(value)} `}</div>;
      },
    },

    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (value: AppointmentServiceType) => {
        return <div>{`${value.name}`}</div>;
      },
    },
    {
      title: "Physician Name",
      dataIndex: "patient",
      key: "patient",
      render: (value: User) => {
        return <div>{`${value.first_name} ${value.last_name}`}</div>;
      },
    },
    {
      title: "Appointment Due Date",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time.selected);
        return <div>{`${date?.formatMMMMDDYYYY(time?.startTime)} `}</div>;
      },
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time.selected);
        return (
          <div>{`${date?.formathhmma(time?.startTime)} - ${date?.formathhmma(
            time?.endTime
          )}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "transaction",
      key: "transaction",
      render: (value: any) => {
        return <div>{`$ ${value?.amountReceived}`}</div>;
      },
    },

    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      render: (value: string) => {
        return (
          <div>
            <Tag color="cyan">{value}</Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: () => (
        <EyeFilled
          onClick={() => {
            return Router.push(`/doctor/appointments/history/detail`);
          }}
        />
      ),
    },
  ];

  return (
    <Table columns={historyColumns} dataSource={data} />
  );
}

export default PhysicianAppointmentHistoryTable;
