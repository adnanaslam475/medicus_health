import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
  AppointmentServiceType,
  AppointmentTimeSlots,
  Transaction,
  User,
  usePhysicianAppointmentsHistoryQuery,
  GetAppointmentInput,
} from "generated/graphql";
import Router from "next/router";

type Props = {
  data?: any;
};

function PatientAppointmentHistoryTable(props: Props) {
  const { data } = props || {};
  // const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
  //   {}
  // );
  // const [{ data, fetching }, executeUsePhysicianAppointmentsQuery] =
  //   usePhysicianAppointmentsHistoryQuery({
  //     variables: {
  //       filter: { ...filterValues },
  //     },
  //   });

  // const { appointments } = data || {};
  // const onChangeFilters = (values: GetAppointmentInput) => {
  //   setFilterValues(values);
  //   executeUsePhysicianAppointmentsQuery({
  //     filter: filterValues,
  //     requestPolicy: "network-only",
  //   });
  // };

  console.log(data, "historyappointmentsData");

  const historyColumns = [
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
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (value: any) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "type",
      render: (value: any) => {
        return <div>{`${value?.service_name}`}</div>;
      },
      // sorter: {
      //   compare: (a: any, b: any) => a.doctor - b.doctor,
      //   multiple: 3,
      // },
    },
    {
      title: "Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      // sorter: {
      //   compare: (a: any, b: any) => a.service - b.service,
      //   multiple: 3,
      // },
      render: (value: any) => {
        return <div>{`${value?.requestedDate}`}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "requestedDate",
      key: "requestedDate",
      // sorter: {
      //   compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
      //   multiple: 3,
      // },
      render: (value: any) => {
        return <div>{`${value?.requestedDate}`}</div>;
      },
    },

    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: (data: any) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() =>
              Router.push(`/physician/appointments/history/${data?.id}`)
            }
          />
        </div>
      ),
    },
  ];
  const Ddata = [
    {
      ID: "1",
      // name: "John Brown",
      doctor: "MD khan",
      type: "First Consultation",
      date: "10 march 1998",
      time: "09:00 AM - 09:30 AM",
    },
    {
      ID: "1",
      // name: "John Brown",
      doctor: "MD khan",
      type: "First Consultation",
      date: "10 march 1998",
      time: "09:00 AM - 09:30 AM",
    },
    {
      ID: "1",
      // name: "John Brown",
      doctor: "MD khan",
      type: "First Consultation",
      date: "10 march 1998",
      time: "09:00 AM - 09:30 AM",
    },
    {
      ID: "1",
      // name: "John Brown",
      doctor: "MD khan",
      type: "First Consultation",
      date: "10 march 1998",
      time: "09:00 AM - 09:30 AM",
    },
    {
      ID: "1",
      // name: "John Brown",
      doctor: "MD khan",
      type: "First Consultation",
      date: "10 march 1998",
      time: "09:00 AM - 09:30 AM",
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table columns={historyColumns} dataSource={data} onChange={onChange} scroll={{x:true}}/>
  );
}

export default PatientAppointmentHistoryTable;
