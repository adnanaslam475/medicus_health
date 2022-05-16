import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import { PatientProfile, usePhysiciansPatientsQuery } from "generated/graphql";
import Image from "next/image";
import OnlySearchFilters from "common/components/OnlySearchFilters/OnlySearchFilters";

function PatientList() {
  const [searchValue, setSearchValue] = React.useState("");
  const [{ data: data }, executeUsePhysiciansPatientsQuery] =
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
        console.log("valuevalue", value);
        return (
          <div className="someclass">
            {" "}
            {value?.profileImage && (
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
        return <div className="someclass">{value}</div>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (value: string) => {
        return <div className="someclass"> {value}</div>;
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email: string) => {
        return <div className="someclass">{email}</div>;
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Address",
      dataIndex: "streetAddress",
      key: "streetAddress",
      render: (streetAddress: string) => {
        return <div className="flagAvatar engFlag pr-2">{streetAddress}</div>;
      },
    },
    {
      title: "",
      dataIndex: "doctor_id",
      key: "view",
      className: "table-action-icon",
      render: () => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/doctor/patients/detail`);
            }}
          />
        </div>
      ),
    },
  ];
  function changeHandler(e: string) {
    setSearchValue(e);
    executeUsePhysiciansPatientsQuery({
      variables: { searchField: e },
      requestPolicy: "network-only",
    });
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Patients</h2>
        </div>
        <OnlySearchFilters changeHandler={changeHandler} />
        <div className="w-full">
          <div className="">
            <Table
              columns={columns}
              dataSource={physiciansPatients}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientList;
