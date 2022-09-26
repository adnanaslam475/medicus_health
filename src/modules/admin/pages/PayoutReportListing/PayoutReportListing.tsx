import React from "react";
import { Collapse, Table } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import _classes from "./PayoutReportListing.module.scss";

function PayoutReportListing() {
  const { Panel } = Collapse;
  const onChange = (key: string | string[]) => {};

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Appointment ID#",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    { title: "Patient name", dataIndex: "patient_name", key: "patient_name" },
    { title: "Appointment type", dataIndex: "service", key: "service" },
    {
      title: "Booking date",
      dataIndex: "booking_date",
      key: "booking_date",
    },
    {
      title: "Scheduled date",
      dataIndex: "scheduled_date",
      key: "scheduled_date",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Patient payment",
      dataIndex: "patient_payment",
      key: "patient_payment",
    },

    { title: "Gross sales ($)", dataIndex: "sales", key: "sales" },
    { title: "Refunds ($)", dataIndex: "refund", key: "refund" },

    { title: "Taxes ($)", dataIndex: "taxes", key: "taxes" },
    { title: "Total sales ($)", dataIndex: "total_sales", key: "total_sales" },
    {
      title: "Physician fee ($)",
      dataIndex: "physician_fee",
      key: "physician_fee",
    },
    {
      title: "Net Physician Fee ($)",
      dataIndex: "net_physician_fee",
      key: "net_physician_fee",
    },
    {
      title: "Medicus Revenue ($)",
      dataIndex: "medicus_fee",
      key: "medicus_fee",
    },

    {
      title: "Medicus Revenue + Taxes ($)",
      dataIndex: "medicus_revenue_with_taxes",
      key: "medicus_revenue_with_taxes",
    },
    // {
    //   title: "Return processing fee ($)",
    //   dataIndex: "return_fee",
    //   key: "return_fee",
    // },
    // {
    //   title: "Stripe processing fee ($)",
    //   dataIndex: "stripe_fee",
    //   key: "stripe_fee",
    // },
  ];
  const Ddata = [
    {
      id: "1",
      // name: "John Brown",
      appointment_id: "MD-2312",
      booking_date: "05-06-2023",
      scheduled_date: "09:00 AM - 09:30 AM",
      status: "Requested",
      payment_status: "Unpaid",
      patient_payment: "$309.25",
      patient_name: "Dr. Paul Wallner",
      service: "First Consultation",
      sales: "$40.00",
      refund: "$40.00",
      taxes: "$40.00",
      total_sales: "$40.00",
      physician_fee: "$40.00",
      net_physician_fee: "$40.00",
      medicus_fee: "$40.00",
      medicus_revenue_with_taxes: "$863",
      // stripe_fee: "$40.00",
    },
    {
      id: "2",
      appointment_id: "MD-2312",
      booking_date: "05-06-2023",
      scheduled_date: "09:00 AM - 09:30 AM",
      status: "Completed",
      payment_status: "Paid",
      patient_payment: "$209.25",
      patient_name: "Dr. Paul Wallner",
      service: "First Consultation",
      sales: "$40.0",
      refund: "$40.00",
      physician_fee: "$40.00",
      net_physician_fee: "$40.00",
      taxes: "$40.00",
      total_sales: "$40.00",
      medicus_fee: "$40.00",
      medicus_revenue_with_taxes: "$863",
      // stripe_fee: "$40.00",
    },
  ];

  const monthName_for_admin = "june";
  const net_month_payout_for_admin = "$448";
  return (
    <AppLayout>
      <h2 className="text-2xl">Payout</h2>
      <Collapse onChange={onChange} className={`${_classes["payout_report"]}`}>
        <Panel
          // header="june $448"
          header={
            <div className=" justify-start flex flex-col sm:flex-row flex-1">
              <div className="">{` ${monthName_for_admin} `}</div>
              <div className="mx-3">{` ${net_month_payout_for_admin}`}</div>
            </div>
          }
          key="1"
        >
          <Collapse defaultActiveKey="1">
            <Panel
              // header="james clark"
              header={
                <div className=" justify-start flex flex-col sm:flex-row flex-1">
                  <div className="">James Clark</div>
                  <div className="mx-3">$291</div>
                </div>
              }
              key="1"
            >
              <Table
                columns={columns}
                dataSource={Ddata}
                scroll={{ x: true }}
                pagination={false}
              />
            </Panel>
            <Panel
              // header="james chadwick"
              header={
                <div className=" justify-start flex flex-col sm:flex-row flex-1">
                  <div className="">james chadwick</div>
                  <div className="mx-3">$291</div>
                </div>
              }
              key="2"
            >
              <Table
                columns={columns}
                dataSource={Ddata}
                scroll={{ x: true }}
                pagination={false}
              />
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="May $231" key="3">
          <Table
            columns={columns}
            dataSource={Ddata}
            scroll={{ x: true }}
            pagination={false}
          />
        </Panel>
        <Panel header="April $324" key="4">
          <Table
            columns={columns}
            dataSource={Ddata}
            loading={false}
            scroll={{ x: true }}
            pagination={false}
          />
        </Panel>
      </Collapse>
    </AppLayout>
  );
}

export default PayoutReportListing;
