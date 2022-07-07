import React, { useState } from "react";
import { Table, Divider } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import MyEarningsStats from "../../../../../common/components/MyEarningsStats/MyEarningsStats";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";
import {
  Appointment,
  useGetDoctorEarningsQuery,
  useGetTransectionFilterQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
// import SearchFilters from "common/components/SearchFilters/SearchFilters";
import { physicianMyEarningsFilterType } from "common/types/types";

const Columns = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Appointment ID",
    dataIndex: "appointmentId",
    key: "appointment",
    sorter: true,
  },
  {
    title: "Patient Name",
    dataIndex: "appointment",
    key: "first_name",
    sorter: true,
    render: (value: Appointment) => {
      return (
        <div className="someclass">{`${value?.patient?.first_name} ${value?.patient?.last_name}`}</div>
      );
    },
  },

  {
    title: "Service Type",
    dataIndex: "appointment",
    key: "appointment_service_type",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Booking Date",
    dataIndex: "appointment",
    key: "appointment_time_slots",
    sorter: true,
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
    key: "appointment_time_slots",
    sorter: true,
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
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "appointment",
    key: "transaction",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Total Payment($)",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Refund($)",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Return Processing Fee($)",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Stripe Processing Fee($)",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Net Physician Fee($)",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Transaction Date",
    dataIndex: "appointment",
    key: "appointment",
    sorter: true,
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

type Props = {};

const PhysicianMyEarningsList = (props: Props) => {
  const { user } = userData.getUserData();

  const [filterValues, setFilterValues] =
    useState<physicianMyEarningsFilterType>({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

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
    executeUseGetTransectionFilterQuery,
  ] = useGetTransectionFilterQuery({
    variables: {
      filter: filterValues,
      pagination,
      sorting,
    },
  });

  const { getTransectionFilter } = transactionData || {};

  function onChangeFilters(values: physicianMyEarningsFilterType) {
    setFilterValues(values);
    setPagination({ ...pagination, page: 1 });
    executeUseGetTransectionFilterQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order ? `user.${sorter.columnKey || sorter.field}` : "",
    });
  };

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

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
        <Table
          columns={Columns}
          dataSource={getTransectionFilter?.items}
          scroll={{ x: true }}
          onChange={onChange}
          loading={fetching}
          pagination={{
            // total: getTransectionFilter?.meta?.totalItems,
            // pageSize: getTransectionFilter?.meta?.itemCount,
            current: getTransectionFilter?.meta?.currentPage,
            defaultPageSize: 10,
            onChange: onPaginationChange,
            pageSizeOptions: ["10", "20", "30", "40"],
            showSizeChanger: true,
          }}
        />
      </div>
    </AppLayout>
  );
};

export default PhysicianMyEarningsList;
