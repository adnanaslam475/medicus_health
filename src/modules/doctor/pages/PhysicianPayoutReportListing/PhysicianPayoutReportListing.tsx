import React, { useEffect, useState } from "react";
import { Collapse, Empty, Space, Spin, Table } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import _classes from "./PhysicianPayoutReportListing.module.scss";
import {
  AppointmentDateTimeResponse,
  AppointmentServiceType,
  Transaction,
  useDoctorPayoutsQuery,
  User,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { date } from "common/utils";

function PhysicianPayoutReportListing() {
  const { Panel } = Collapse;
  const onChange = (key: string | string[]) => {};
  const columns = [
    {
      title: "Transaction ID#",
      key: "transaction",
      dataIndex: "transaction",
      render: (transaction: Transaction) => {
        const transactionId = transaction?.id || "-";
        return <div>{transactionId}</div>;
      },
    },
    {
      title: "Appointment ID#",
      key: "id",
      dataIndex: "id",
      render: (id: string) => {
        return <div>{id || "-"}</div>;
      },
    },
    {
      title: "Patient name",
      key: "patient",
      dataIndex: "patient",
      render: (patient: User) => {
        const patientName = `${patient?.first_name || "-"} ${
          patient?.last_name || ""
        }`;
        return <div>{patientName}</div>;
      },
    },
    {
      title: "Appointment type",
      key: "serviceType",
      dataIndex: "serviceType",
      render: (serviceType: AppointmentServiceType) => {
        const serviceName = serviceType?.name || "-";
        return <div>{serviceName}</div>;
      },
    },
    {
      title: "Appointment date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      render: (appointmentDateTime: AppointmentDateTimeResponse) => {
        let formatedAppointmentDateTime = `${
          appointmentDateTime?.startTime?.split(" ")[0]
        }`;
        formatedAppointmentDateTime = formatedAppointmentDateTime
          ? date?.formatDAYMMDDYY(formatedAppointmentDateTime)
          : "-";
        return <div>{formatedAppointmentDateTime}</div>;
      },
    },
    {
      title: "Refund ($)",
      dataIndex: "refund",
      key: "refund",
      render: (transaction: Transaction) => {
        const refundAmount = transaction?.appointmentCharges || "0";
        return <div>${refundAmount}</div>;
      },
    },
    {
      title: "Net physician earnings ($)",
      dataIndex: "transaction",
      key: "netPhysicianFee",
      render: (transaction: Transaction) => {
        const physicianFee = transaction?.doctor_percentage || "0";
        return <div>${physicianFee}</div>;
      },
    },
  ];

  const { user } = getUserData();
  const doctorId = user?.role === "Doctor" ? user?.id : undefined;
  const [{ data, fetching }] = useDoctorPayoutsQuery({
    variables: {
      doctorId: Number(doctorId),
    },
    pause: !doctorId,
  });
  const { doctorPayouts } = data || {};
  const { appointmentMonths, monthAppointments } = doctorPayouts || {};

  return (
    <AppLayout>
      <h2 className="text-2xl">Payouts</h2>
      {fetching ? (
        <div className="w-full bg-gray-4 rounded-md border-primary my-2 h-20 flex flex-col justify-center items-center">
          <Space size="middle">
            <Spin size="small" />
          </Space>
        </div>
      ) : !appointmentMonths?.length ? (
        <div className="flex items-center justify-center w-full">
          <Empty />
        </div>
      ) : (
        <>
          <Collapse
            onChange={onChange}
            className={`${_classes["payout_report"]}`}
          >
            {appointmentMonths?.map((appointmentMonth, appointmentIndex) => {
              return (
                <Panel header={`${appointmentMonth} - Net physician earnings`} key={appointmentIndex}>
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={monthAppointments?.[appointmentIndex]}
                    loading={false}
                    scroll={{ x: true }}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </>
      )}
    </AppLayout>
  );
}

export default PhysicianPayoutReportListing;
