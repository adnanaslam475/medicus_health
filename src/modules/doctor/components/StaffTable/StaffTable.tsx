import React from "react";
import Router, { useRouter } from "next/router";
import { Table } from "antd";
import { AppointmentServiceType, User } from "generated/graphql";
import { EyeFilled } from "@ant-design/icons";
import { date } from "common/utils";
import { ColumnsType } from "antd/lib/table";
import { useRoleGuard } from "common/components/RoleGuard/useRoleGuard";
import { useQuery } from "urql";

type Props = {
	dataSource: User[] | undefined;
};

function StaffTable({ dataSource }: Props) {
	const { isAdmin, isDoctor } = useRoleGuard();
  const { query } = useRouter();
  console.log('query-------->', query)
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
			title: "Contact Number",
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
			title: "Account Creation Date",
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
			dataIndex: "id",
			className: "table-action-icon",
			render: (staffId: number) => (
				<div className="text-primary">
					<EyeFilled onClick={() => onViewDetail(staffId)} />
				</div>
			),
		},
	];

	function onViewDetail(staffId: number) {
		if (isAdmin) {
			Router.push(`/admin/staff/DoctorStaffDetails/${staffId}`);
		} else {
			Router.push(`/physician/staff/DoctorStaffDetails/${staffId}`);
		}
	}

	return <Table columns={columns} dataSource={dataSource} />;
}

export default StaffTable;
