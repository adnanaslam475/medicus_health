import React, { useState } from "react";
import { Button, Table, Tag } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import { useGetAdminUsersQuery, User } from "generated/graphql";
import { date, userData } from "common/utils";
import { adminUserFilterType } from "common/types/types";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import Router from "next/router";
import AdminUserSearchFilters from "common/components/AdminUserFilter/AdminUserSearchFilters";
import { tableFooter } from "utils/helper";

const Columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },

  {
    title: "Name",
    dataIndex: "",
    key: "first_name",
    sorter: true,
    render: (value: User) => {
      return (
        <div className="someclass">{`${value?.first_name} ${value?.last_name}`}</div>
      );
    },
  },

  {
    title: "Email address",
    dataIndex: "email",
    key: "email",
    sorter: true,
    render: (value: User) => {
      return <div className="someclass">{`${value}`}</div>;
    },
  },
  {
    title: "Account creation date",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (value: User) => {
      return (
        <div className="someclass">{`${date?.formatDAYMMDDYY(
          String(value)
        )} `}</div>
      );
    },
  },
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

        // <div className="someclass">
        //   {value ? (
        //     <Tag color="cyan">{"Active"}</Tag>
        //   ) : (
        //     <Tag color="red">{"Disabled"}</Tag>
        //   )}
        // </div>
      );
    },
  },
  {
    dataIndex: "id",
    className: "table-action-icon",
    key: "id",
    render: (userId: number) => (
      <div className="text-primary">
        <EyeFilled
          onClick={() => {
            return Router.push(`/admin/edituser/${userId}`);
          }}
        />
      </div>
    ),
  },
];

type Props = {};

const UserList = ({}: Props) => {
  const [filterValues, setFilterValues] = useState<adminUserFilterType>({});
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });
  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  //GET ALL ADMIN USERS LIST WITH FILTERS
  const [{ data, fetching }, executeUseGetAdminUsersQuery] =
    useGetAdminUsersQuery({
      variables: {
        filter: filterValues,
        pagination,
        sorting,
      },
    });

  const { adminUsers } = data || {};

  function onChangeFilters(values: adminUserFilterType) {
    setPagination({ ...pagination, page: 1 });
    setSorting({ column: "", order: "" });
    setFilterValues(values);
    executeUseGetAdminUsersQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  }

  const onPaginationChange = (page: number, limit: number) =>
    setPagination({ page, limit });

  const onChange = (...params: any) => {
    const [, , sorter] = params;

    setSorting({
      order:
        (sorter.order === "ascend" &&
          sorter.columnKey === "status" &&
          "desc") ||
        (sorter.order === "ascend" &&
          !(sorter.columnKey === "status") &&
          "asc") ||
        (sorter.order === "ascend" &&
          !(sorter.columnKey === "status") &&
          "asc") ||
        (sorter.order === "descend" &&
          sorter.columnKey === "status" &&
          "asc") ||
        (sorter.order === "descend" &&
          !(sorter.columnKey === "status") &&
          "desc") ||
        "",
      column: sorter.order
        ? `user.${sorter.columnKey || sorter.field}` || ""
        : "",
    });
  };

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
              Add user
            </Button>
          </div>
        </div>

        <AdminUserSearchFilters onChange={onChangeFilters} />
        <Table
          columns={Columns}
          dataSource={adminUsers?.items}
          loading={fetching}
          onChange={onChange}
          footer={(currentPageCount)=>tableFooter(currentPageCount?.length,Number(adminUsers?.meta?.totalItems||0))}
          pagination={{
            total: Number(adminUsers?.meta?.totalPages) * pagination.limit,
            current: adminUsers?.meta?.currentPage,
            defaultPageSize: 10,
            onChange: onPaginationChange,
            pageSizeOptions: ["10", "20", "30", "40"],
            showSizeChanger: true,
          }}
        />
      </div>
    </AppLayout>
  );
};

export default UserList;
