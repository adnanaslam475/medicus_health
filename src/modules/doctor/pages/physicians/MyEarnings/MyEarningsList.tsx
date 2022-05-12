import React, { useState } from "react";
import { Table, Input, Button, Space, Tag, Divider } from "antd";
import { EyeFilled } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import MyEarningsStats from "../../../../../common/components/MyEarningsStats/MyEarningsStats";
import {
  Appointment,
  Transaction,
  useGetAllTransactionsQuery,
  useGetDoctorEarningsQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";

type Props = {};

const PhysicianMyEarningsList = (props: Props) => {
  const { user } = userData.getUserData();

  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();

  // get Doctor Earnings Stats
  const [{ data }] = useGetDoctorEarningsQuery({
    variables: {
      id: Number(user?.id),
    },
  });

  const { getDoctorEarnings } = data || {};
  const {
    total_earnings,
    total_earnings_from_consultation,
    total_earnings_from_second_opinions,
    total_number_of_consultation,
    total_number_of_patients,
    total_number_of_second_opinions,
  } = getDoctorEarnings || {};

  //GET ALL TRANSACTIONS
  const [{ data: allTransactions }] = useGetAllTransactionsQuery();
  const { transactions } = allTransactions || {};

  const Columns = [
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
      title: "Appointment ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
      sorter: {
        compare: (a: any, b: any) => a.appointmentId - b.appointmentId,
        multiple: 3,
      },
    },
    {
      title: "Patient Name",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
        multiple: 3,
      },
      render: (value: Appointment) => {
        return (
          <div className="someclass">{`${value?.patient?.first_name} ${value?.patient?.last_name}`}</div>
        );
      },
    },

    {
      title: "Service",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.appointment - b.appointment,
        multiple: 3,
      },
      render: (value: Appointment) => {
        return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "appointment",
      key: "appointment",
      sorter: {
        compare: (a: any, b: any) => a.appointment - b.appointment,
        multiple: 3,
      },
      render: (value: Appointment) => {
        let time = value?.appointmentTimeSlots?.find((time) => time.selected);
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            time?.startTime
          )} `}</div>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "amountReceived",
      key: "amountReceived",
      sorter: {
        compare: (a: any, b: any) => a.amountReceived - b.amountReceived,
        multiple: 3,
      },
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex mb-0">
          <MyEarningsStats
            label={"Total Consultants"}
            text={String(total_number_of_consultation)}
          />
          <MyEarningsStats
            label={"Total Second Opinions"}
            text={String(total_number_of_second_opinions)}
          />
          <MyEarningsStats
            label={"Total Patients"}
            text={String(total_number_of_patients)}
          />
          <MyEarningsStats
            label={"Earnings through Consultants"}
            text={`$ ${total_earnings_from_consultation}`}
          />
          <MyEarningsStats
            label={"Earnings through Second Opinion"}
            text={`$ ${total_earnings_from_second_opinions}`}
          />
          <MyEarningsStats
            label={"Total Earnings"}
            text={`$ ${total_earnings}`}
          />
        </div>
        <Divider />

        <div className="flex justify-between">
          <h2 className="mb-4">My Earnings</h2>
        </div>
        <MyEarningsSearchFilters
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setDataListPhysician={setDataListPhysician}
          setDoctorId={setDoctorId}
          setAppointmentIds={setAppointmentIds}
          setServiceIds={setServiceIds}
        />
        {/* <PatientSearchFilters /> */}
        <div className="w-full">
          <div className="">
            <Table
              columns={Columns}
              dataSource={transactions as Transaction[]}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PhysicianMyEarningsList;
