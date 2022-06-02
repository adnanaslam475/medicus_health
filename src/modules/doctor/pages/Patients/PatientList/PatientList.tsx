import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
  Country,
  PatientProfile,
  usePhysiciansPatientsQuery,
} from "generated/graphql";
import Image from "next/image";
import OnlySearchFilters from "common/components/OnlySearchFilters/OnlySearchFilters";

function PatientList() {
  const [searchValue, setSearchValue] = React.useState("");
  const [{ data }, executeUsePhysiciansPatientsQuery] =
    usePhysiciansPatientsQuery({
      variables: { searchField: searchValue },
    });
  const { physiciansPatients } = data || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Profile Picture",
      dataIndex: "patientProfile",
      key: "patientProfile",
      render: (value: PatientProfile) => {
        return (
          <div>
            {value?.profileImage?.includes(".s3-us-east") && (
              <Image
                alt=""
                src={value?.profileImage}
                width={44}
                height={44}
                className="border rounded border-gray-2"
              />
            )}
          </div>
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (value: string) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (value: string) => {
        return <div> {value}</div>;
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email: string) => {
        return <div>{email}</div>;
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country: Country) => {
        return <div className="pr-2">{country?.country_name}</div>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "table-action-icon",
      render: (value: number) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/physician/patients/${value}`);
            }}
          />
        </div>
      ),
    },
  ];
  function onChange(searchText: string) {
    setSearchValue(searchText);
    executeUsePhysiciansPatientsQuery({
      variables: { searchField: searchText },
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Patients</h2>
        </div>
        <OnlySearchFilters onChange={onChange} />
        <div className="w-full">
          <div>
            <Table columns={columns} dataSource={physiciansPatients} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientList;
