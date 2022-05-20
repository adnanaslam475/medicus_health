import React, { useState } from "react";
import { Table, Divider, Button } from "antd";
import Router from "next/router";

import AppLayout from "common/components/AppLayout/AppLayout";
import {
  Appointment,
  useGetDoctorEarningsQuery,
  useGetTransectionFilterQuery,
} from "generated/graphql";
import { date, userData } from "common/utils";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import { physicianMyEarningsFilterType } from "common/types/types";
import MyEarningsSearchFilters from "common/components/PhysicianMyEarningsSearchFilter/MyEarningsSearchFilters";
import MyEarningsStats from "common/components/MyEarningsStats/MyEarningsStats";
import { EyeFilled } from "@ant-design/icons";

type Props = {};

const UserList = (props: Props) => {
  const { user } = userData.getUserData();

  const [filterValues, setFilterValues] =
    useState<physicianMyEarningsFilterType>({});

  //GET ALL TRANSACTIONS WITH FILTERS
  const [{ data: transactionData }, executeUseGetTransectionFilterQuery] =
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
    {
      dataIndex: "id",
      className: "table-action-icon",
      key: "id",
      render: (appointmentId: number) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/admin/user/710`);
            }}
          />
        </div>
      ),
    },
  ];

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Users</h2>
          <div className="flex">
            <Button
              className="ml-auto"
              onClick={() => Router.push("/admin/adduser")}
              type="primary"
            >
              Add User
            </Button>
          </div>
        </div>
        <MyEarningsSearchFilters onChange={onChangeFilters} />
        <Table columns={Columns} dataSource={getTransectionFilter} />
      </div>
    </AppLayout>
  );
};

export default UserList;
