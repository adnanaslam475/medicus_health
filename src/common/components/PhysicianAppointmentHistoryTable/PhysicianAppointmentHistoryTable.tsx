import React from "react";
import Router from "next/router";
import { Table, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
} from "generated/graphql";
import { date } from "../../utils";

type Props = {
  data?: Appointment[] | undefined;
  loading: boolean | undefined;
  meta: any;
  onPaginationChange: any;
  onChange: () => void;
};

function PhysicianAppointmentHistoryTable(props: Props) {
  const { data, loading, meta, onPaginationChange, onChange } = props || {};
  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (value: string) => {
        return <div>{`${date?.formatMMMMDDYYYY(value)} `}</div>;
      },
    },
    {
      title: " Appointment Type",
      dataIndex: "serviceType",
      key: "name",
      sorter: true,
      render: (value: AppointmentServiceType) => {
        return <div>{`${value?.name}`}</div>;
      },
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "first_name",
      sorter: true,
      render: (value: User) => {
        return (
          <div>
            {value?.first_name
              ? `${value?.first_name} ${value?.last_name}`
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Appointment Due Date",
      dataIndex: "appointmentTimeSlots",
      key: "appointment_time_slots",
      sorter: true,
      render: (value: AppointmentTimeSlots[]) => {
        let time = value?.find((time) => time.selected);
        return <div>{`${date?.formatMMMMDDYYYY(time?.startTime)} `}</div>;
      },
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointment_time_slots",
      sorter: true,
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
      key: "amountReceived",
      sorter: true,
      render: (value: Transaction) => {
        return (
          <div>
            {value?.amountReceived ? "$" + value?.amountReceived : "--"}
          </div>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
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
      dataIndex: "id",
      key: "id",
      className: "table-action-icon",
      render: (id: string) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(`/physician/appointments/history/${id}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={historyColumns}
      dataSource={data}
      loading={loading}
      scroll={{ x: true }}
      onChange={onChange}
      pagination={{
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
}

export default PhysicianAppointmentHistoryTable;
