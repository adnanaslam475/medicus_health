import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import AdminPatientsListFilter from "./AdminPatientsListFilter";
import {
  Country,
  GetPatientsInput,
  PatientProfile,
  useGetPatientsQuery,
} from "generated/graphql";
import { PatientListFilterType } from "common/types/types";

const Ddata = [
  {
    id: "1",

    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "First Consultation",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "2",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "3",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "4",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "5",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },

  {
    id: "4",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "4",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    timeslot: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
  {
    id: "4",
    transactionid: "MD-2312",
    name: "Dr. Paul Wallner",
    email: "usama@gmail.com",
    number: "03123120112",
    city: "karachi",
    country: "pakistan",
    postalcode: "9923129",
    status: ["completed", "pending"],
    view: "Eye",
  },
];

function AdminPatientsList() {
  const [filterValues, setFilterValues] = useState<PatientListFilterType>({});
  const [searchValue, setSearchValue] = React.useState("");

  const [{ data }, executeuseGetPatientsQuery] = useGetPatientsQuery({
    variables: {
      filter: filterValues,
    },
  });

  const { getPatients } = data || {};
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      id: "doctor_id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      id: "user",
    },
    {
      title: "Email",
      dataIndex: "email",
      id: "email",
    },
    {
      title: "Cell number",
      dataIndex: "number",
      id: "number",
    },
    {
      title: "City",
      dataIndex: "city",
      id: "number",
    },
    {
      title: "Country",
      dataIndex: "country",
      id: "number",
    },
    {
      title: "Postal Code",
      dataIndex: "postalcode",
      id: "number",
    },

    {
      title: "",
      dataIndex: "doctor_id",
      id: "view",
      className: "table-action-icon",
      render: (value: any) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              return Router.push(`/admin/patients/detail`);
            }}
          />
        </div>
      ),
    },
  ];
  function onChangeFilters(values: PatientListFilterType) {
    setFilterValues(values);
    executeuseGetPatientsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="pb-0 mb-0">Patients</h2>
        </div>

        <AdminPatientsListFilter onChange={onChangeFilters} />
        <div className="w-full">
          <div className="">
            <Table columns={columns} dataSource={getPatients} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPatientsList;
