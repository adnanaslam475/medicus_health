import React from "react";
import { Collapse, Table } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import _classes from "./PayoutReportListing.module.scss";

function PayoutReportListing() {
  const { Panel } = Collapse;
  const onChange = (key: string | string[]) => {};

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Appointment ID#", dataIndex: "appointment_id", key: "platform" },
    { title: "Patient name", dataIndex: "patient_name", key: "version" },
    { title: "Appointment type", dataIndex: "service", key: "service" },
    {
      title: "Scheduled date",
      dataIndex: "scheduled_date",
      key: "scheduled_date",
    },
    { title: "Gross sales ($)", dataIndex: "sales", key: "sales" },
    { title: "Refunds ($)", dataIndex: "refund", key: "refund" },
    {
      title: "Return processing fee ($)",
      dataIndex: "return_fee",
      key: "return_fee",
    },
    { title: "Taxes ($)", dataIndex: "taxes", key: "taxes" },
    { title: "Total sales ($)", dataIndex: "total_sales", key: "total_sales" },
    { title: "Medicus fee ($)", dataIndex: "medicus_fee", key: "medicus_fee" },
    {
      title: "Stripe processing fee ($)",
      dataIndex: "stripe_fee",
      key: "stripe_fee",
    },
  ];
  const Ddata = [
    {
      id: "1",
      // name: "John Brown",
      appointment_id: "MD-2312",
      patient_name: "Dr. Paul Wallner",
      service: "First Consultation",
      scheduled_date: "09:00 AM - 09:30 AM",
      sales: "$40.00",
      refund: "$40.00",
      return_fee: "$40.00",
      taxes: "$40.00",
      total_sales: "$40.00",
      medicus_fee: "$40.00",
      stripe_fee: "$40.00",
    },
    {
      id: "2",
      appointment_id: "MD-2312",
      patient_name: "Dr. Paul Wallner",
      service: "First Consultation",
      scheduled_date: "09:00 AM - 09:30 AM",
      sales: "$40.0",
      refund: "$40.00",
      return_fee: "$40.00",
      taxes: "$40.00",
      total_sales: "$40.00",
      medicus_fee: "$40.00",
      stripe_fee: "$40.00",
    },
  ];
  return (
    <AppLayout>
      <h2 className="text-2xl">Payout</h2>
      <Collapse onChange={onChange} className={`${_classes["payout_report"]}`}>
        <Panel header="june $448" key="1">
          <Collapse defaultActiveKey="1">
            <Panel header="james clark" key="1">
              <Table
                columns={columns}
                dataSource={Ddata}
                scroll={{ x: true }}
                pagination={false}
              />
            </Panel>
            <Panel header="james chadwick" key="2">
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
