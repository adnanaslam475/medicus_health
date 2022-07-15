import React from "react";
import Router, { useRouter } from "next/router";
import { Table } from "antd";
import { AppointmentServiceType, User } from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import { ColumnsType } from "antd/lib/table";
import { useRoleGuard } from "common/components/RoleGuard/useRoleGuard";
import { useQuery } from "urql";
import StatusChip from "common/components/StatusChip/StatusChip";

type Props = {
  dataSource: User[] | undefined;
  loading:boolean |undefined;
};

function StaffTable({ dataSource,loading }: Props) {
  const { isAdmin, isDoctor } = useRoleGuard();
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "",
      key: "user",
      render: (value: any) => {
        return <div>{`${value?.first_name} ${value?.last_name}`}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.first_name - b.first_name,
        multiple: 3,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value: AppointmentServiceType) => {
        return <div>{value}</div>;
      },
      sorter: {
        compare: (a: any, b: any) => a.service - b.service,
        multiple: 3,
      },
    },
    {
      title: "Contact number",
      dataIndex: "contact_number",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: string) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "Account creation date",
      dataIndex: "createdAt",
      sorter: {
        compare: (a: any, b: any) => a.timeslot - b.timeslot,
        multiple: 3,
      },
      render: (value: string) => {
        return <div>{date?.formatMMMMDDYYYY(value)}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter:true,
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

  return <Table columns={columns} dataSource={dataSource} loading={loading} scroll={{x:true}}/>;
}

export default StaffTable;
