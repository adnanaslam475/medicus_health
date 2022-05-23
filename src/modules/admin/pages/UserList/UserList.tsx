import React, { useState } from "react";
import { Table, Tag } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useGetAdminUsersQuery, User } from "generated/graphql";
import { date, userData } from "common/utils";
import { adminUserFilterType } from "common/types/types";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import AdminUserSearchFilters from "common/components/AdminUserFilter/AdminUserSearchFilters";

type Props = {};

const UserList = (props: Props) => {
  const [filterValues, setFilterValues] = useState<adminUserFilterType>({});

  //GET ALL ADMIN USERS LIST WITH FILTERS
  const [{ data }, executeUseGetAdminUsersQuery] = useGetAdminUsersQuery({
    variables: {
      filter: filterValues,
    },
  });

  const { adminUsers } = data || {};

  function onChangeFilters(values: adminUserFilterType) {
    setFilterValues(values);
    executeUseGetAdminUsersQuery({
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
        compare: (a: string | any, b: string | any) => a.id - b.id,
        multiple: 3,
      },
    },

    {
      title: "Name",
      dataIndex: "",
      key: "user",
      sorter: {
        compare: (a: string | any, b: string | any) =>
          a.first_name - b.first_name,
        multiple: 3,
      },
      render: (value: User) => {
        return (
          <div className="someclass">{`${value?.first_name} ${value?.last_name}`}</div>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a: string | any, b: string | any) => a.email - b.email,
        multiple: 3,
      },
      render: (value: User) => {
        return <div className="someclass">{`${value}`}</div>;
      },
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a: string | any, b: string | any) =>
          a.createdAt - b.createdAt,
        multiple: 3,
      },
      render: (value: User) => {
        return (
          <div className="someclass">{`${date?.formatMMMMDDYYYY(
            String(value)
          )} `}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: string | any, b: string | any) => a.status - b.status,
        multiple: 3,
      },
      render: (value: string) => {
        return (
          <div className="someclass">
            {value ? (
              <Tag color="cyan">{"Active"}</Tag>
            ) : (
              <Tag color="red">{"Disabled"}</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "table-action-icon text-primary",
      render: (userId: number) => (
        <EyeFilled
          onClick={() => {
            return Router.push(`admin/edituser/${userId}`);
          }}
        />
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Users</h2>
        </div>

        <AdminUserSearchFilters onChange={onChangeFilters} />
        <Table columns={Columns} dataSource={adminUsers} />
      </div>
    </AppLayout>
  );
};

export default UserList;
