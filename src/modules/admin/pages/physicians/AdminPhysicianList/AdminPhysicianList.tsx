import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";

import Router from "next/router";
import {
  useDoctorProfilesQuery,
  useGetPhysiciansQuery,
  User,
} from "generated/graphql";
import Image from "next/image";
import engFlag from "../../../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../../../public/assets//images/espanolFlag.png";
import AdminPhysicianSearchFilters from "./AdminPhysicianSearchFilters";
import { date } from "common/utils";

const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["Spanish" as string]: espanolFlag,
};

function AdminPhysicianList() {
  const [{ data }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = data || {};

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: User) => {
        return <div>{email}</div>;
      },
      sorter: true,
    },
    {
      title: "Language",
      dataIndex: "doctorProfile",
      key: "doctorProfile",
      render: (doctorProfile: any) => {
        let language = doctorProfile?.language || "english";
        return (
          <div className="flagAvatar engFlag pr-2">
            {FLAG_BY_LANGUAGE[language] && (
              <Image
                src={FLAG_BY_LANGUAGE[language]}
                alt={language || "flag"}
                width={25}
                height={25}
              />
            )}
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "streetAddress",
      key: "streetAddress",
      sorter: true,
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt: string) => {
        console.log("vvvvalue is", createdAt);
        return <div>{`${date.formatMMMMDDYYYY(createdAt)}`}</div>;
      },
    },
    {
      title: "",
      dataIndex: "doctor_id",
      key: "view",
      className: "table-action-icon",
      render: (value: any) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/admin/physicians/${value}`);
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
          <h2 className="mb-4">Admin Physicians</h2>
          <Link passHref href={`/admin/physicians/addPhysician`}>
            <a>
              <Button type="primary">
                <PlusOutlined />
                Add a Physician
              </Button>
            </a>
          </Link>
        </div>
        <AdminPhysicianSearchFilters />
        <div className="w-full">
          <div className="">
            <Table columns={columns} dataSource={getPhysicians} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianList;
