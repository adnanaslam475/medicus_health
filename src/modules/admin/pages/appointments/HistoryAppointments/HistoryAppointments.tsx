import { Select, DatePicker, Space, Button, Tag } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { CloseOutlined, EyeFilled } from "@ant-design/icons";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";
import { useGetAllRequestedAppointmentsQuery } from "../../../../../generated/graphql";
import { date } from "../../../../../common/utils";

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  // GET ALL APPOINMENTS
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Confirmed",
      },
    },
  });

  const historyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Booked On",
      dataIndex: "requestedDate",
      key: "requestedDate",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(value)} `}</div>
        );
      },
    },

    {
      title: "Physician",
      dataIndex: "doctor",
      key: "doctor",
      sorter: {
        compare: (a: any, b: any) => a.doctor - b.doctor,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${value?.first_name} ${value?.last_name}`}</div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value?.name}`}</div>;
      },
    },

    {
      title: "Date",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.find((time: any) => time.selected == true);
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            time?.startTime
          )} `}</div>
        );
      },
    },
    {
      title: "Time",
      dataIndex: "appointmentTimeSlots",
      key: "appointmentTimeSlots",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: any) => {
        let time = value?.find((time: any) => time.selected == true);
        return (
          <div className="someclass">{`${date?.formathhmma(
            time?.startTime
          )} - ${date?.formathhmma(time?.endTime)}`}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "serviceType",
      key: "serviceType",
      sorter: {
        compare: (a: any, b: any) => a.totalamount - b.totalamount,
        multiple: 3,
      },
      render: (value: any) => {
        return <div className="someclass">{`${value?.price}`}</div>;
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transection",
      key: "transection",
      sorter: {
        compare: (a: any, b: any) => a.transection - b.transection,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">{`${
            value?.createdAt ? date?.formatMMMMDDYYYY(value?.createdAt) : "--"
          }`}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
        multiple: 3,
      },
      render: (value: any) => {
        return (
          <div className="someclass">
            <Tag color="cyan">{value}</Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "view",
      className: "table-action-icon",
      render: () => <EyeFilled />,
    },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
        <div className="w-5/6 mb-10">
          <div className="flex items-center">
            <span className="mx-3">Filter</span>
            <div className="mx-3">
              <Select
                placeholder="Doctor"
                className=" lg:w-44 font-medium text-primary placeholder-primary  text-center"
              >
                <Select.Option
                  className="text-primary placeholder-gray-500"
                  value="Doctor Francis"
                >
                  Doctor Francis
                </Select.Option>
              </Select>
            </div>

            <Select
              placeholder="Service"
              className="mx-3 lg:w-44 font-medium text-primary placeholder-primary  text-center"
            >
              <Select.Option
                className="text-primary placeholder-gray-500"
                value="Doctor Francis"
              >
                Doctor Francis
              </Select.Option>
            </Select>
            <Space direction="vertical" size={12} className="mx-3">
              <RangePicker />
            </Space>

            <Button type="text" size="large" className="w-50">
              <CloseOutlined />
              <span className="text-gray-2 mx-3">Clear</span>
            </Button>
          </div>
        </div>
        {/* Transaction History table */}
        <div className="custom-table-ui">
          <TransactionHistory
            data={data?.appointments}
            columns={historyColumns}
          />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
