import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
} from "generated/graphql";
import { date } from "common/utils";

type Props = {
  appointmentsData?: Appointment[] | undefined;
};

const RequestedList = (props: Props) => {
  const { appointmentsData } = props || {};

  const Columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: {
      //   compare: (a: any, b: any) => a.id - b.id,
      //   multiple: 3,
      // },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: User) => {
        return (
          <div className="someclass">
            {`${value?.first_name} ${value?.last_name}`}{" "}
          </div>
        );
      },
    },

    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      // sorter: {
      //   compare: (a: any, b: any) => a.serviceType - b.serviceType,
      //   multiple: 3,
      // },
      render: (value: AppointmentServiceType) => {
        return <div className="someclass">{`${value?.name}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: string) => {
        return <div className="someclass">{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      // sorter: {
      //   compare: (a: any, b: any) => a.timeslot - b.timeslot,
      //   multiple: 3,
      // },
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
      // sorter: {
      //   compare: (a: any, b: any) => a.totalamount - b.totalamount,
      //   multiple: 3,
      // },
      render: (value: number) => {
        return <div className="someclass">{value ? `$ ${value}` : ""}</div>;
      },
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "table-action-icon",
      render: (appointmentId: number) => (
        <EyeFilled
          onClick={() => {
            return Router.push(
              `/doctor/appointments/requested/${appointmentId}`
            );
          }}
        />
      ),
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={Columns}
      dataSource={appointmentsData}
      onChange={onChange}
    />
  );
};

export default RequestedList;
