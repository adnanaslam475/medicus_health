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
  loading:boolean|undefined;
  
};

function CurrentAppointmentTable({ dataSource ,loading}: Props) {
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
      render: (value: number) => {
        return <div className="someclass">{value ? `$ ${value}` : ""}</div>;
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
export default CurrentAppointmentTable;
