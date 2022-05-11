import { Table } from "antd";
import {
  Appointment,
  AppointmentServiceType,
  AppointmentTimeSlots,
  PhysicianAppointmentsQuery,
  User,
} from "generated/graphql";
import React from "react";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { date } from "common/utils";

type Props = {
  dataSource: PhysicianAppointmentsQuery["physicianAppointments"];
};

function UpcomingAppointmentTableDoctor({ dataSource }: Props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      render: (value: User) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      sorter: {
        compare: (a: any, b: any) =>
          ("" + a?.serviceType?.name).localeCompare(b.serviceType.name),
        multiple: 3,
      },
      render: (value: AppointmentServiceType) => {
        return <div>{value?.name}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointmentTimeSlots",
      render: (value: any) => {
        let filteredVal = value.filter((val: any) => val.selected);
        return (
          <div>
            {filteredVal[0]?.startTime &&
              date.formatMMMMDDYYYY(filteredVal[0]?.startTime)}
          </div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      render: (value: [AppointmentTimeSlots]) => {
        let filteredVal = value?.filter((val: any) => val?.selected);
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
      sorter: {
        compare: (a: any, b: any) => a.charges - b.charges,
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
