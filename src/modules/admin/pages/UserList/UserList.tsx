import React, { useState } from "react";
import { Button, Table, Tag } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useGetAdminUsersQuery, User } from "generated/graphql";
import { date, userData } from "common/utils";
import { adminUserFilterType } from "common/types/types";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
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
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },

    {
      title: "Name",
      dataIndex: "",
      key: "user",
      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
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
        compare: (a: any, b: any) => a.email - b.email,
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
        compare: (a: any, b: any) => a.createdAt - b.createdAt,
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
        compare: (a: any, b: any) => a.status - b.status,
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
      dataIndex: "id",
      className: "table-action-icon",
      key: "id",
      render: (userId: number) => (
        <div>
          <EyeFilled
            onClick={() => {
              return Router.push(`/admin/edituser/${userId}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Users</h2>
          <div className="flex-none sm:flex items-center justify-between mb-5">
            <Button
              type="primary"
              onClick={() => Router.push("/admin/adduser")}
              icon={<PlusOutlined />}
            >
              Add User
            </Button>
          </div>
        </div>

        <AdminUserSearchFilters onChange={onChangeFilters} />
        <Table columns={Columns} dataSource={adminUsers} />
      </div>
    </AppLayout>
  );
};

export default UserList;
