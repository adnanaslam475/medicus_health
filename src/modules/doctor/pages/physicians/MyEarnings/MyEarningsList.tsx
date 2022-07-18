import React, { useState } from "react";
import { Table, Divider, Tag, Skeleton } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import MyEarningsStats from "../../../../../common/components/MyEarningsStats/MyEarningsStats";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";
import {
  Appointment,
  GetTransactionFilterQuery,
  Transaction,
  useGetDoctorEarningsQuery,
  useGetTransactionFilterQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
import { physicianMyEarningsFilterType, StatusName } from "common/types/types";
import StatusChip from "common/components/StatusChip/StatusChip";

type Props = {};
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
    title: "Patient name",
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
    title: "Service type",
    dataIndex: "appointment",
    key: "name",
    sorter: true,
    render: (value: Appointment) => {
      return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
    },
  },
  {
    title: "Booking date",
    dataIndex: "appointment",
    key: "startTime",
    sorter: true,
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formatDAYMMDDYY(
          time?.startTime
        )} `}</div>
      );
    },
  },
  {
    title: "Scheduled date",
    dataIndex: "appointment",
    key: "startTime",
    sorter: true,
    render: (value: Appointment) => {
      let time = value?.appointmentTimeSlots?.find((time) => time.selected);
      return (
        <div className="someclass">{`${date?.formatDAYMMDDYY(
          time?.startTime
        )} `}</div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "appointment",
    key: "status",
    sorter: true,
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
    key: "transaction",
    sorter: true,
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
    key: "appointment",
    sorter: true,

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
    key: "appointment",
    sorter: true,
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

  //   render: (value: Appointment) => {
  //     return <div className="someclass">{`${value?.serviceType?.name}`}</div>;
  //   },
  // },
  // {
  //   title: "Stripe Processing Fee($)",
  //   dataIndex: "stripeFee",
  //   key: "stripeFee",

  //   render: (value: number) => {
  //     return <div className="someclass">{`${value}`}</div>;
  //   },
  // },
  {
    title: "Net physician fee($)",
    dataIndex: "doctor_percentage",
    key: "doctor_percentage",
    sorter: true,

    render: (value: string) => {
      return <div className="someclass">{`${value}`}</div>;
    },
  },
  // {
  //   title: "Transaction Date",
  //   dataIndex: "appointment",
  //   key: "appointment",

  //   render: (value: Appointment) => {
  //     let time = value?.appointmentTimeSlots?.find((time) => time.selected);
  //     return (
  //       <div className="someclass">{`${date?.formatDAYMMDDYY(
  //         time?.startTime
  //       )} `}</div>
  //     );
  //   },
  // },
  // {
  //   title: "Total Earnings",
  //   dataIndex: "amountReceived",
  //   key: "amountReceived",

  // },
];

const PhysicianMyEarningsList = (props: Props) => {
  const { user } = userData.getUserData();
  const [paymentStatus, setPaymentStatus] = useState<
    string | undefined | null
  >();

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
  const [{ data, fetching: myEarningStatsLoading }] = useGetDoctorEarningsQuery(
    {
      variables: {
        id: Number(user?.id),
      },
    }
  );

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
  ] = useGetTransactionFilterQuery({
    variables: {
      filter: filterValues,
      pagination,
      sorting,
    },
  });

  const { getTransactionFilter } = transactionData || {};

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
    console.log("sorter", sorter);
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (/(appointment|status)/.test(sorter.columnKey) && "appointment") ||
            (sorter.columnKey === "first_name" && "patient") ||
            (sorter.columnKey === "name" && "appointment_service_type") ||
            (sorter.columnKey === "appointment_time_slots" &&
              "appointment_time_slots") ||
            (sorter.columnKey === "startTime" && "appointment_time_slots") ||
            "transaction"
          }.${
            (sorter.field === "status" && "status") ||
            (sorter.columnKey === "appointment" && "id") ||
            sorter.columnKey ||
            sorter.field
          }`
        : "",
    });
  };

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  return (
    <AppLayout>
      <div className="w-full">
      <Skeleton loading={myEarningStatsLoading} paragraph={{ rows: 0 }} active>
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
      </Skeleton>
        <Divider />

        <div className="flex justify-between">
          <h2 className="mb-4">My earnings</h2>
        </div>

        <MyEarningsSearchFilters onChange={onChangeFilters} />
        <Table
          columns={Columns}
          dataSource={getTransactionFilter?.items as Transaction[]}
          scroll={{ x: true }}
          onChange={onChange}
          loading={fetching}
          pagination={{
            total:
              Number(getTransactionFilter?.meta?.totalPages) * pagination.limit,
            current: getTransactionFilter?.meta?.currentPage,
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
