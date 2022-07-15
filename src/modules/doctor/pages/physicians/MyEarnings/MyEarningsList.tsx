import React, { useState } from "react";
import { Table, Divider, Tag } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import MyEarningsStats from "../../../../../common/components/MyEarningsStats/MyEarningsStats";
import {
  Appointment,
  useGetDoctorEarningsQuery,
  useGetTransactionFilterQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import { physicianMyEarningsFilterType, StatusName } from "common/types/types";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";
import StatusChip from "common/components/StatusChip/StatusChip";

type Props = {};

const PhysicianMyEarningsList = (props: Props) => {
  const { user } = userData.getUserData();
  const [paymentStatus, setPaymentStatus] = useState<
    string | undefined | null
  >();

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
  const [
    { data: transactionData, fetching },
    executeUseGetTransactionFilterQuery,
  ] = useGetTransactionFilterQuery({
    variables: {
      filter: filterValues,
    },
  });

  const { getTransactionFilter } = transactionData || {};

  function onChangeFilters(values: physicianMyEarningsFilterType) {
    setFilterValues(values);
    executeUseGetTransactionFilterQuery({
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
      title: "Patient name",
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
      title: "Service type",
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
      title: "Booking date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a: any, b: any) => a.createAt - b.createAt,
        multiple: 3,
      },
      render: (value: string) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            String(value)
          )}`}</div>
        );
      },
    },
    {
      title: "Scheduled date",
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
        compare: (a: any, b: any) => a.appointment - b.status,
        multiple: 3,
      },
      render: (value: Appointment) => {
        return (
          <div className="w-full text-secondary">
            <StatusChip type={value?.status?.toUpperCase() as StatusName} />
          </div>
        );
      },
    },
    {
      title: "Payment status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
        multiple: 3,
      },
      render: (value: string) => {
        return (
          <div className="w-full text-secondary">
            <StatusChip
              type={
                value === "Refunded"
                  ? (value.toUpperCase() as StatusName)
                  : value === "succeeded"
                  ? ("paid".toUpperCase() as StatusName)
                  : ("unpaid".toUpperCase() as StatusName)
              }
            />
          </div>
        );
      },
    },
    {
      title: "Total payment($)",
      dataIndex: "appointmentCharges",
      key: "appointmentCharges",
      sorter: {
        compare: (a: any, b: any) =>
          a.appointmentCharges - b.appointmentCharges,
        multiple: 3,
      },
      render: (value: number) => {
        return (
          <div className="someclass">{`${parseFloat(String(value)).toFixed(
            2
          )}`}</div>
        );
      },
    },
    {
      title: "Refund($)",
      dataIndex: ["appointmentCharges", "status"],
      key: "status",
      render: (text: any, row: any) => {
        return (
          <div className="someclass">
            {`${row?.status === "Refunded" ? row?.appointmentCharges : 0}`}
          </div>
        );
      },
    },
    // {
    //   title: "Return Processing Fee($)",
    //   dataIndex: "appointment",
    //   key: "appointment",
    //   sorter: {
    //     compare: (a: any, b: any) => a.appointment - b.appointment,
    //     multiple: 3,
    //   },
    //   render: (value: Appointment) => {
    //     return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    //   },
    // },
    // {
    //   title: "Stripe Processing Fee($)",
    //   dataIndex: "stripeFee",
    //   key: "stripeFee",
    //   sorter: {
    //     compare: (a: any, b: any) => a.stripeFee - b.stripeFee,
    //     multiple: 3,
    //   },
    //   render: (value: number) => {
    //     return <div className="someclass">{`${value}`}</div>;
    //   },
    // },
    {
      title: "Net physician fee($)",
      dataIndex: "doctor_percentage",
      key: "doctor_percentage",
      sorter: {
        compare: (a: any, b: any) => a.doctor_percentage - b.doctor_percentage,
        multiple: 3,
      },
      render: (value: string) => {
        return <div className="someclass">{`${value}`}</div>;
      },
    },
    // {
    //   title: "Transaction Date",
    //   dataIndex: "appointment",
    //   key: "appointment",
    //   sorter: {
    //     compare: (a: any, b: any) => a.appointment - b.appointment,
    //     multiple: 3,
    //   },
    //   render: (value: Appointment) => {
    //     let time = value?.appointmentTimeSlots?.find((time) => time.selected);
    //     return (
    //       <div className="someclass">{`${date?.formatMMMMDDYYYY(
    //         time?.startTime
    //       )} `}</div>
    //     );
    //   },
    // },
    // {
    //   title: "Total Earnings",
    //   dataIndex: "amountReceived",
    //   key: "amountReceived",
    //   sorter: {
    //     compare: (a: any, b: any) => a.amountReceived - b.amountReceived,
    //     multiple: 3,
    //   },
    // },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex mb-0 flex-wrap">
          <MyEarningsStats
            label={"Total consultants"}
            text={String(total_number_of_consultation)}
          />
          <MyEarningsStats
            label={"Total second opinions"}
            text={String(total_number_of_second_opinions)}
          />
          <MyEarningsStats
            label={"Total patients"}
            text={String(total_number_of_patients)}
          />
          <MyEarningsStats
            label={"Earnings through consultants"}
            text={`$ ${total_earnings_from_consultation}`}
          />
          <MyEarningsStats
            label={"Earnings through second opinion"}
            text={`$ ${total_earnings_from_second_opinions}`}
          />
          <MyEarningsStats
            label={"Total earnings"}
            text={`$ ${total_earnings}`}
          />
        </div>
        <Divider />

        <div className="flex justify-between">
          <h2 className="mb-4">My earnings</h2>
        </div>

        <MyEarningsSearchFilters onChange={onChangeFilters} />
        <Table
          columns={Columns}
          dataSource={getTransactionFilter}
          scroll={{ x: true }}
          loading={fetching}
        />
      </div>
    </AppLayout>
  );
};

export default PhysicianMyEarningsList;
