import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table } from "antd";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import Router from "next/router";
import Image from "next/image";
import AdminPatientsListFilter from "./AdminPatientsListFilter";

import { PatientListFilterType } from "common/types/types";
import {
  Country,
  AppointmentServiceType,
  useGetPatientsQuery,
  User,
  City,
} from "generated/graphql";
import { ColumnsType } from "antd/lib/table/Table";
import Link from "next/link";

function AdminPatientsList() {
  const [filterValues, setFilterValues] = useState<PatientListFilterType>({});

  const [{ data,fetching }, executeuseGetPatientsQuery] = useGetPatientsQuery({
    variables: {
      filter: filterValues,
    },
  });

  const { getPatients } = data || {};

  function onChangeFilters(values: PatientListFilterType) {
    setFilterValues(values);
    executeuseGetPatientsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "",
      key: "user",

      render: (value: any) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value: string) => {
        return <div>{value}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      sorter: {
        compare: (a: any, b: any) => a.contact_number - b.contact_number,
        multiple: 3,
      },
      render: (value: string) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "City",
      dataIndex: "city",
      render: (value: City) => {
        return <div>{value?.city_name ? `${value?.city_name}` : "--"}</div>;
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (value: Country) => {
        return (
          <div>{value?.country_name ? `${value?.country_name}` : "--"}</div>
        );
      },
    },
    {
      title: "Postal Code",
      dataIndex: "zip_code",
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

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between mb-10">
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
            <Table columns={columns} dataSource={getPatients as User[]} loading={fetching}/>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPatientsList;
