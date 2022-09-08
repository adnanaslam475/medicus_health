import React from "react";
import Image from "next/image";
import Router from "next/router";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import OnlySearchFilters from "common/components/OnlySearchFilters/OnlySearchFilters";
import profilePicture from "../../../../../../public/assets/images/profile.svg";
import {
  Country,
  PatientProfile,
  usePhysiciansPatientsQuery,
} from "generated/graphql";

const columns = [
  {
    title: "ID#",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Profile picture",
    dataIndex: "patientProfile",
    key: "patientProfile",
    render: (value: PatientProfile) => {
      return (
        <div>
          <Image
            priority={true}
            alt=""
            src={
              value?.profileImage?.includes(".s3-us-east")
                ? value?.profileImage
                : profilePicture
            }
            width={44}
            height={44}
            className="border rounded border-gray-2"
          />
        </div>
      );
    },
  },
  {
    //   title: "First name",
    //   dataIndex: "first_name",
    //   key: "first_name",
    //   sorter: true,
    //   render: (value: string) => {
    //     return <div>{value}</div>;
    //   },
    // },
    // {
    //   title: "Last name",
    //   dataIndex: "last_name",
    //   key: "last_name",
    //   sorter: true,
    //   render: (value: string) => {
    //     return <div> {value}</div>;
    //   },
    // },
    title: "Patient name",
    // dataIndex: "items",
    key: "first_name",
    sorter: true,
    render: (value: any) => {
      console.log(value);
      return <div> {value?.first_name + " " + value?.last_name}</div>;
    },
  },

  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
    sorter: true,
    render: (email: string) => {
      return <div>{email}</div>;
    },
  },
  {
    title: "Contact #",
    dataIndex: "contact_number",
    key: "contact_number",
    sorter: true,
    render: (contactNumber: string) => {
      return <div>{`+${contactNumber}`}</div>;
    },
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country_name",
    sorter: true,
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
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/physician/patients/${value}`);
          }}
        />
      </div>
    ),
  },
];

function PatientList() {
  const [searchValue, setSearchValue] = React.useState("");
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUsePhysiciansPatientsQuery] =
    usePhysiciansPatientsQuery({
      variables: { searchField: searchValue, pagination, sorting },
    });
  const { physiciansPatients } = data || {};

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${/country_name/.test(sorter.columnKey) ? "country" : "user"}.${
        
            sorter.columnKey ||
            sorter.field
          }`
        : "",
    });
  };

  function onChangeFilters(searchText: string) {
    setSearchValue(searchText);
    setPagination({ ...pagination, page: 1 });
    executeUsePhysiciansPatientsQuery({
      variables: { searchField: searchText },
      requestPolicy: "network-only",
    });
  }
  const footer = () => {
    return <div></div>;
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Patients</h2>
        </div>
        <OnlySearchFilters onChange={onChangeFilters} />
        <div className="w-full">
          <div>
            <Table
              columns={columns}
              dataSource={physiciansPatients?.items}
              loading={fetching}
              onChange={onChange}
              scroll={{ x: true }}
              footer={footer}
              pagination={{
                total:
                  Number(physiciansPatients?.meta?.totalPages) *
                  pagination.limit,
                current: physiciansPatients?.meta?.currentPage,
                defaultPageSize: 10,
                onChange: onPaginationChange,
                pageSizeOptions: ["10", "20", "30", "40"],
                showSizeChanger: true,
              }}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientList;
