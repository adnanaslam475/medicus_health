import React, { useState } from "react";
import { Table, Divider } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import MyEarningsStats from "../../../../../common/components/MyEarningsStats/MyEarningsStats";
import {
  Appointment,
  useGetDoctorEarningsQuery,
  useGetTransectionFilterQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import { physicianMyEarningsFilterType } from "common/types/types";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";

type Props = {};

const PhysicianMyEarningsList = (props: Props) => {
  const { user } = userData.getUserData();

  const [filterValues, setFilterValues] =
    useState<physicianMyEarningsFilterType>({});

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

  //GET ALL TRANSACTIONS WITH FILTERS
  const [{ data: transactionData,fetching }, executeUseGetTransectionFilterQuery] =
    useGetTransectionFilterQuery({
      variables: {
        filter: filterValues,
      },
    });

  const { getTransectionFilter } = transactionData || {};

  function onChangeFilters(values: physicianMyEarningsFilterType) {
    setFilterValues(values);
    executeUseGetTransectionFilterQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const Columns = [
    {
      title: "Transaction ID",
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
      title: "Service Type",
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
      title: "Booking Date",
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
      title: "Scheduled Date",
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
      title: "Status",
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
      title: "Payment Status",
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
      title: "Total Payment($)",
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
      title: "Refund($)",
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
      title: "Return Processing Fee($)",
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
      title: "Stripe Processing Fee($)",
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
      title: "Net Physician Fee($)",
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
      title: "Transaction Date",
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
      title: "Total Earnings",
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
        <div className="flex mb-0 flex-wrap">
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

        <MyEarningsSearchFilters onChange={onChangeFilters} />
        <Table columns={Columns} dataSource={getTransectionFilter}  scroll={{ x: true }} loading={fetching} />
      </div>
    </AppLayout>
  );
};

export default PhysicianMyEarningsList;
