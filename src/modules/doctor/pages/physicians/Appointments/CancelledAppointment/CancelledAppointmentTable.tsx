import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import {
  Appointment,
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  User,
} from "generated/graphql";
import { date } from "common/utils";

type Props = {
  dataSource: Appointment[] | undefined;
  loading: boolean | undefined;
  onChange: any;
  meta: any;
  onPaginationChange: any;
};

function CancelledAppointmentTable({
  dataSource,
  loading,
  meta,
  onChange,
  onPaginationChange,
}: Props) {
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
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "name",
      sorter: true,
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentDateTime",
      key: "appointment_time_slots",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        return (
          <div className="someclass">
            {appointmentDateTime?.startTime
              ? date?.formatMMMMDDYYYY(appointmentDateTime?.startTime)
              : "--"}
          </div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
      key: "appointment_time_slots",
      sorter: true,
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedStartTime = `${
          appointmentDateTime?.startTime?.split(" ")[1]
        } ${appointmentDateTime?.startTime?.split(" ")[2]}`;
        let formatedEndTime = `${appointmentDateTime?.endTime?.split(" ")[1]} ${
          appointmentDateTime?.endTime?.split(" ")[2]
        }`;
        return (
          <div>
            {appointmentDateTime?.startTime && appointmentDateTime?.endTime
              ? `${date?.formathhmma(
                  appointmentDateTime?.startTime
                )} - ${date?.formathhmma(appointmentDateTime.endTime)}`
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
        return <div>{value ? `$${value}` : ""}</div>;
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
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onChange}
      scroll={{ x: true }}
      pagination={{
        // total: meta?.totalItems,
        // pageSize: meta?.itemCount,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
}
export default CancelledAppointmentTable;
