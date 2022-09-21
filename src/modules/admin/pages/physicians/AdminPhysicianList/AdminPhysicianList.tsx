import React, { useState } from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import { Button, Table } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import AdminPhysicianSearchFilters from "./AdminPhysicianSearchFilters";
import {
  City,
  Country,
  DoctorProfile,
  State,
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetPhysiciansQuery,
  useGetStatesByCountryQuery,
  User,
} from "generated/graphql";
// import engFlag from "../../../../../../public/assets/images/engFlag.png";
// import espanolFlag from "../../../../../../public/assets//images/espanolFlag.png";
// import { date } from "common/utils";
import { FLAG_BY_LANGUAGE, tableFooter } from "utils/helper";
import { date } from "common/utils";
// import { json } from "node:stream/consumers";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Name",
    dataIndex: "first_name",
    key: "first_name",
    render: (value: User) => {
      return <div>{`${value}`}</div>;
    },
    sorter: true,
  },
  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
    render: (email: User) => {
      return <div>{email}</div>;
    },
    sorter: true,
  },
  {
    title: "Specialization",
    dataIndex: "doctorProfile",
    key: "specialization",
    render: (doctorProfile: DoctorProfile) => {
      return <div>{doctorProfile?.specialization || ""}</div>;
    },
    sorter: true,
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city_name",
    render: (city: City) => {
      return <div>{city?.city_name || ""}</div>;
    },
    sorter: true,
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state_name",
    render: (state: State) => {
      return <div>{state?.state_name || ""}</div>;
    },
    sorter: true,
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country_name",
    render: (country: Country) => {
      return <div>{country?.country_name || ""}</div>;
    },
    sorter: true,
  },
  // {
  //   title: "Zip code",
  //   dataIndex: "zip_code",
  //   key: "zip_code",
  //   render: (zip_code: string) => {
  //     return <div>{zip_code || ""}</div>;
  //   },
  //   sorter: true,
  // },
  {
    title: "Language",
    dataIndex: "doctorProfile",
    key: "language",
    render: (doctorProfile: DoctorProfile) => {
      let formatedLanguage =
        doctorProfile?.language !== undefined &&
        doctorProfile?.language?.includes("{")
          ? JSON.parse(doctorProfile?.language)
          : doctorProfile?.language;

      let language = doctorProfile?.language?.toLowerCase() || "english";

      return (
        <div className="flagAvatar engFlag pr-2">
          {formatedLanguage &&
            Object.entries(formatedLanguage)
              .filter((item) => item[1])
              ?.map((value) => {
                return (
                  <Image
                    priority={true}
                    src={FLAG_BY_LANGUAGE[String(value[0]).toLowerCase()]}
                    alt={language || "flag"}
                    width={25}
                    height={25}
                  />
                );
              })}
        </div>
      );
    },
  },
  {
    title: "Account creation date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => {
      return <div>{date?.formatMMMMDDYYYY(createdAt) || ""}</div>;
    },
    sorter: true,
  },
  {
    title: "",
    dataIndex: "id",
    key: "view",
    className: "table-action-icon",
    render: (id: string) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/admin/physicians/${id}`);
          }}
        />
      </div>
    ),
  },
];

function AdminPhysicianList() {
  const [filterValues, setFilterValues] = useState({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }, executeUseGetPhysiciansQuery] =
    useGetPhysiciansQuery({
      variables: {
        filter: filterValues,
        pagination,
        sorting,
      },
    });

  const { getPhysicians } = data || {};

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  function onChangeFilters(values: any) {
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    setFilterValues(values);
    executeUseGetPhysiciansQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onChange = (...params: any) => {
    const [, , sorter] = params;
    setSorting({
      order: sorter.order?.replace("end", "") || "",
      column: sorter.order
        ? `${
            (["city", "country", "state"].includes(sorter.field) &&
              sorter.field) ||
            (sorter.columnKey === "specialization" && "doctor_profile") ||
            "user"
          }.${sorter.columnKey}`
        : "",
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between mb-10">
          <h2 className="mb-4">Physicians</h2>
          <Link passHref href={`/admin/physicians/addPhysician`}>
            <a>
              <Button type="primary">
                <PlusOutlined />
                Add a physician
              </Button>
            </a>
          </Link>
        </div>
        <AdminPhysicianSearchFilters onChange={onChangeFilters} />
        <div className="w-full">
          <div className="">
            <Table
              columns={columns}
              dataSource={getPhysicians?.items}
              onChange={onChange}
              footer={(currentPageCount) =>
                tableFooter(
                  currentPageCount?.length,
                  Number(getPhysicians?.meta?.totalItems || 0)
                )
              }
              loading={fetching}
              scroll={{ x: true }}
              pagination={{
                total:
                  Number(getPhysicians?.meta?.totalPages) * pagination.limit,
                current: getPhysicians?.meta?.currentPage,
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
export default AdminPhysicianList;
