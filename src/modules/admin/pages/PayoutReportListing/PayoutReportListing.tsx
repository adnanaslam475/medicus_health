import React from "react";
import { Collapse, Empty, Space, Spin, Table } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import _classes from "./PayoutReportListing.module.scss";
import {
  Appointment,
  AppointmentServiceType,
  Transaction,
  useDoctorPayoutsByAdminQuery,
  User,
} from "generated/graphql";
import StatusChip from "common/components/StatusChip/StatusChip";
import { StatusName } from "common/types/types";
import { date } from "common/utils";
import { addDecimaltoAmount } from "common/utils/helper";

function PayoutReportListing() {
  const { Panel } = Collapse;
  const onChange = (key: string | string[]) => {};
  const columns = [
    {
      title: "ID#",
      dataIndex: "transaction",
      key: "id",
      render: (transaction: Transaction) => {
        return <div className="break-all w-[100px]">{transaction?.id}</div>;
      },
    },
    {
      title: "Appointment ID#",
      dataIndex: "id",
      key: "id",
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
      // dataIndex: "appointment",
      // key: "appointment",
      render: (appointment: any) => {
        const serviceName =
          appointment?.appointmentTypeProposed?.type ||
          appointment?.serviceType?.name ||
          "-";
        return <div>{serviceName}</div>;
      },
    },
    {
      title: "Appointment date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDateTime",
      render: (appointmentDateTime: any) => {
        const scheduleDate = appointmentDateTime?.startTime || "";
        return (
          <div>
            {date.formatDAYMMDD(scheduleDate) === "Invalid Date"
              ? "-"
              : date.formatDAYMMDD(scheduleDate)}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return (
          <div className="w-full text-primary">
            <StatusChip type={status?.toUpperCase() as StatusName} />
          </div>
        );
      },
    },
    {
      title: "Payment status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let _status = null;
        if (status === "succeeded" || status === "Completed") {
          _status = "paid";
        } else if (status === "Refunded") {
          _status = status;
        } else {
          _status = "Unpaid";
        }
        return (
          <div className="text-primary">
            <StatusChip type={_status.toUpperCase() as StatusName} />
          </div>
        );
      },
    },
    {
      title: "Payout status",
      dataIndex: "",
      key: "payment_status",
      render: (value: any) => {
        return (
          <div className="text-primary">
            <StatusChip
              type={
                value?.transaction?.payment_status.toUpperCase() as StatusName
              }
            />
          </div>
        );
      },
    },
    {
      title: "Gross sales ($)",
      // dataIndex: "status",
      // key: "appointment",
      render: (appointment: Appointment) => {
        const refund =
          appointment?.transaction?.status === "Refunded"
            ? 0
            : `${appointment?.transaction?.appointmentCharges}`;
        return <div>{addDecimaltoAmount(refund as any)}</div>;
      },
    },
    {
      title: "Taxes ($)",
      dataIndex: "appointment",
      key: "tax",
      render: (transaction: Transaction) => {
        const tax = transaction?.tax || 0;
        return <div>{addDecimaltoAmount(tax as any)}</div>;
      },
    },

    {
      title: "Stripe processing fee ($)",
      dataIndex: "transaction",
      key: "transaction",
      render: (transaction: Transaction) => {
        const stripeFee =
          transaction?.status === "Refunded" ? 0 : transaction?.stripeFee;
        return <div>{addDecimaltoAmount(stripeFee as any)}</div>;
      },
      sorter: true,
    },
    {
      title: "Total sales ($)",
      dataIndex: "transaction",
      key: "amountReceived",
      render: (transaction: Transaction) => {
        return (
          <div>
            {addDecimaltoAmount(transaction.amountReceived as any) || "0"}
          </div>
        );
      },
    },
    {
      title: "Net medicus fee($)",
      dataIndex: "transaction",
      key: "medicus_percentage",
      render: (transaction: Transaction) => {
        return (
          <div>
            {addDecimaltoAmount(transaction?.medicus_percentage) || "0"}
          </div>
        );
      },
    },
    {
      title: "Net physician fee ($)",
      dataIndex: "transaction",
      key: "doctor_percentage",
      render: (transaction: Transaction) => {
        return (
          <div>{addDecimaltoAmount(transaction?.doctor_percentage) || "0"}</div>
        );
      },
    },
    
  ];

  const [{ data, fetching }] = useDoctorPayoutsByAdminQuery();

  const { doctorPayoutsByAdmin } = data || {};

  const { appointmentMonths, doctorEarnings, monthAppointments } =
    doctorPayoutsByAdmin || {};

  return (
    <AppLayout>
      <>
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
                  <Panel header={`${appointmentMonth}`} key={appointmentIndex}>
                    {doctorEarnings?.[appointmentIndex].map(
                      (
                        doctorNameWithTotalEarning,
                        doctorNameWithTotalEarningIndex
                      ) => {
                        return (
                          <Collapse key={appointmentIndex + 1}>
                            <Panel
                              header={doctorNameWithTotalEarning}
                              key={appointmentIndex}
                            >
                              <Table
                                columns={columns}
                                dataSource={
                                  monthAppointments?.[appointmentIndex]?.[
                                    doctorNameWithTotalEarningIndex
                                  ]
                                }
                                loading={false}
                                scroll={{ x: true }}
                                pagination={false}
                              />
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </Panel>
                );
              })}
            </Collapse>
          </>
        )}
      </>
    </AppLayout>
  );
}

export default PayoutReportListing;
