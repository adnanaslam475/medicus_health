import React from "react";
import { Table, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
} from "generated/graphql";
import Router from "next/router";

type Props = {
  data?: Appointment[];
  loading: boolean | undefined;
};

const AppointmentHistoryTable = (props: Props) => {
  const { data, loading } = props || {};
  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt: string) => {
        return (
          <div>{createdAt ? `${date?.formatMMMMDDYYYY(createdAt)}` : "-"}</div>
        );
      },
    },
    {
      title: "Physician",
      dataIndex: "doctor",
      key: "doctor",
      sorter: true,
      render: (doctor: User) => {
        return <div>{`${doctor.first_name} ${doctor.last_name}`}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: true,
      render: (serviceType: AppointmentServiceType) => {
        return <div>{`${serviceType?.name || "-"}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: true,

      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return (
          <div>
            {appointmentDateTime?.startTime
              ? `${date?.formatMMMMDDYYYY(appointmentDateTime?.startTime)} `
              : "-"}
          </div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return (
          <div>
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${date?.formathhmma(
                  appointmentDateTime?.startTime
                )} - ${date?.formathhmma(appointmentDateTime?.endTime)}`
              : "-"}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      key: "charges",
      sorter: true,
      render: (charges: AppointmentServiceType) => {
        return <div>{`$${charges}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction",
      key: "transaction",
      sorter: true,

      render: (transaction: Transaction) => {
        return (
          <div>{`${
            transaction?.createdAt
              ? date?.formatMMMMDDYYYY(transaction?.createdAt)
              : "--"
          }`}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status: string) => {
        return (
          <div>
            <Tag color="cyan">{status}</Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      sorter: true,
      className: "table-action-icon",
      render: (id: string) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(`/patient/appointments/history/${id}`);
            }}
          />
        </div>
      ),
    },
  ];

  return <Table columns={historyColumns} dataSource={data} loading={loading} />;
};

export default AppointmentHistoryTable;
