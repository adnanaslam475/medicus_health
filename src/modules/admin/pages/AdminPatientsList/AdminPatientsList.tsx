import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table, Tag } from "antd";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import AdminPatientsListFilter from "./AdminPatientsListFilter";
import { PatientListFilterType } from "common/types/types";
import { Country, useGetPatientsQuery, User, City } from "generated/graphql";
import { ColumnsType } from "antd/lib/table/Table";
import { date } from "common/utils";
import { isChrome, tableFooter } from "utils/helper";
import { getUnixTimeStamp } from "common/utils/date";

const columns: ColumnsType<User> = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Patient name",
    dataIndex: "",
    key: "first_name",
    sorter: true,
    render: (value: any) => {
      return (
        <div className="max-w-[120px]">{`${value?.first_name} ${value?.last_name}`}</div>
      );
    },
  },
  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
    sorter: true,
    render: (value: string) => {
      return <div>{value}</div>;
    },
  },
  {
    title: "Contact #",
    dataIndex: "contact_number",
    key: "contact_number",
    sorter: true,
    render: (value: string) => {
      return <div>{`+${value}`}</div>;
    },
  },
  // {
  //   title: "Street address",
  //   dataIndex: "streetAddress",
  //   key: "streetAddress",
  //   sorter: true,
  //   render: (value: String) => {
  //     return <div className="max-w-[100px]">{value || "--"}</div>;
  //   },
  // },
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
  // {
  //   title: "Postal code",
  //   dataIndex: "zip_code",
  //   key: "zip_code",
  //   sorter: true,
  // },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: true,
    render: (value: string) => {
      return (
        <Tag color={value ? "cyan" : "red"}>
          {value ? "Enabled" : "Disabled"}
        </Tag>
      );
    },
  },
  {
    title: "Date of birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
    sorter: (a: any, b: any) =>
      getUnixTimeStamp(a.date_of_birth) - getUnixTimeStamp(b.date_of_birth),

    render: (value: String) => {
      return (
        <div>{value ? `${date?.formatDAYMMDDYY(value as string)}` : "-"}</div>
      );
    },
  },
  {
    title: "Account creation date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: String) => {
      return (
        <div>{value ? `${date?.formatDAYMMDDYY(value as string)}` : "-"}</div>
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
  let defaultPageSize =
    localStorage.getItem("adminPatientListingPerPageLimit") || 10;
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: Number(defaultPageSize),
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
  const onPaginationChange = (page: number, limit: number) => {
    localStorage.setItem("adminPatientListingPerPageLimit", String(limit));
    setPagination({ page, limit });
  };

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
              <Button
                type="primary"
                className={`${isChrome && "antCustomBtn"}`}
              >
                <PlusOutlined />
                Add patient
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
              footer={(currentPageCount) =>
                tableFooter(
                  currentPageCount?.length,
                  Number(getPatients?.meta?.totalItems || 0)
                )
              }
              loading={fetching}
              onChange={onChange}
              pagination={{
                total: Number(getPatients?.meta?.totalPages) * pagination.limit,
                current: getPatients?.meta?.currentPage,
                defaultPageSize: Number(defaultPageSize),
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
