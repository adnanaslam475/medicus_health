import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table } from "antd";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import AdminPatientsListFilter from "./AdminPatientsListFilter";

import { PatientListFilterType } from "common/types/types";
import { Country, useGetPatientsQuery, User, City } from "generated/graphql";
import { ColumnsType } from "antd/lib/table/Table";
import { date } from "common/utils";

const columns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Name",
    dataIndex: "",
    key: "first_name",
    sorter: true,
    render: (value: any) => {
      return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
    render: (value: string) => {
      return <div>{value}</div>;
    },
  },
  {
    title: "Contact Number",
    dataIndex: "contact_number",
    key: "contact_number",
    sorter: true,
    render: (value: string) => {
      return <div>{value}</div>;
    },
  },
  {
    title: "Street Address",
    dataIndex: "streetAddress",
    key: "streetAddress",
    sorter: true,
    render: (value: String) => {
      return <div>{value || "--"}</div>;
    },
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city_name",
    sorter: true,
    render: (value: City) => {
      return <div>{value?.city_name ? `${value?.city_name}` : "--"}</div>;
    },
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country_name",
    sorter: true,
    render: (value: Country) => {
      return <div>{value?.country_name ? `${value?.country_name}` : "--"}</div>;
    },
  },
  {
    title: "Postal Code",
    dataIndex: "zip_code",
    key: "zip_code",
    sorter: true,
  },
  {
    title: "Account creation date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: String) => {
      return (
        <div>{value ? `${date?.formatDAYMMDDYY(value as string)}` : "--"}</div>
      );
    },
  },
  {
    title: "",
    dataIndex: "id",
    className: "table-action-icon",
    render: (id: number) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/admin/patients/${id}`);
          }}
        />
      </div>
    ),
  },
];

function AdminPatientsList() {
  const [filterValues, setFilterValues] = useState<PatientListFilterType>({});

  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeuseGetPatientsQuery] = useGetPatientsQuery({
    variables: {
      filter: filterValues,
      pagination,
      sorting,
    },
  });
  const { getPatients } = data || {};

  function onChangeFilters(values: PatientListFilterType) {
    setSorting({ column: "", order: "" });
    setFilterValues(values);
    setPagination({ ...pagination, page: 1 });
    executeuseGetPatientsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }
  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (/(country|state|city)/.test(sorter.field) && sorter.field) ||
            (sorter.columnKey === "specialization" && "doctor_profile") ||
            "user"
          }.${sorter.columnKey}`
        : "",
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Patients</h2>
          <Link passHref href={`/admin/patients/addPatients`}>
            <a>
              <Button type="primary">
                <PlusOutlined />
                Add Patient
              </Button>
            </a>
          </Link>
        </div>

        <AdminPatientsListFilter onChange={onChangeFilters} />
        <div className="w-full">
          <div className="">
            <Table
              columns={columns}
              dataSource={getPatients?.items as User[]}
              loading={fetching}
              onChange={onChange}
              pagination={{
                total: Number(getPatients?.meta?.totalPages) * pagination.limit,
                current: getPatients?.meta?.currentPage,
                defaultPageSize: 10,
                onChange: onPaginationChange,
                pageSizeOptions: ["10", "20", "30", "40"],
                showSizeChanger: true,
              }}
              scroll={{ x: true }}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPatientsList;
