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
import _classes from "./UpcomingAppointmentTableDoctor.module.scss";

type Props = {
  dataSource: Array<Appointment>;
};

function UpcomingAppointmentTableDoctor({ dataSource }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
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
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      render: (bookingDate: string) => {
        return <div>{date.formatMMMMDDYYYY(bookingDate)}</div>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "requestedDate",
      render: (dueDate: string) => {
        return <div>{date.formatMMMMDDYYYY(dueDate)}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      render: (value: AppointmentTimeSlots[]) => {
        let filteredVal = value?.filter(
          (val: AppointmentTimeSlots) => val?.selected
        );
        return (
          <div>
            {filteredVal[0]?.startTime &&
              `${date.formathhmma(
                filteredVal[0]?.startTime
              )} - ${date.formathhmma(filteredVal[0]?.endTime)}`}
          </div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "charges",
      render: (value: number) => {
        return <div>{value}</div>;
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
                `/physician/appointments/upcoming/${appointmentId}`
              );
            }}
          />
        </div>
      ),
    },
  ];

  const footer = (currentPageData: any) => {
    return dataSource?.length ? (
      <span>
        Showing {currentPageData?.length} out of {dataSource?.length} entries
      </span>
    ) : (
      ""
    );
  };

  return (
    <span className={`${_classes["upcomming-appointment-doctor-table"]}`}>
      <Table columns={columns} dataSource={dataSource} footer={footer} />
    </span>
  );
}

export default UpcomingAppointmentTableDoctor;
