import React from "react";
import Router from "next/router";
import { Table } from "antd";
import { AppointmentServiceType, User } from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import { ColumnsType } from "antd/lib/table";
import { useRoleGuard } from "common/components/RoleGuard/useRoleGuard";
import StatusChip from "common/components/StatusChip/StatusChip";

type Props = {
  dataSource: User[] | undefined;
  meta: User[] | undefined;
  loading: boolean | undefined;
  onPaginationChange: (values: any) => void;
  onChange: (values: any) => void;
};

function StaffTable({
  dataSource,
  loading,
  meta,
  onPaginationChange,
  onChange,
}: Props) {
  const { isAdmin, isDoctor } = useRoleGuard();

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "",
      key: "first_name",
      render: (value: any) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value: AppointmentServiceType) => {
        return <div>{value}</div>;
      },
      sorter: true,
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      sorter: true,
      render: (value: string) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (value: string) => {
        return <div>{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      className: "table-action-icon",
      render: (value: any) => {
        return (
          <div className="text-primary">
            <StatusChip type={value?.toString()?.toUpperCase()} />
          </div>
        );
      },
    },
    {
      dataIndex: "id",
      className: "table-action-icon",
      render: (staffId: number) => (
        <div className="text-primary">
          <EyeFilled
            onClick={() => {
              onViewDetail(
                staffId,
                String(window.location.pathname.split("/").pop())
              );
            }}
          />
        </div>
      ),
    },
  ];

  function onViewDetail(staffId: number, adminId: string) {
    if (isAdmin) {
      Router.push({
        pathname: `/admin/staff/DoctorStaffDetails/${staffId}`,
        query: { adminId },
      });
    } else {
      Router.push(`/physician/staff/DoctorStaffDetails/${staffId}`);
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: true }}
      onChange={onChange}
      pagination={{
        total: meta?.totalItems,
        current: meta?.currentPage,
        defaultPageSize: 10,
        onChange: onPaginationChange,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
      }}
    />
  );
}

export default StaffTable;
