import React from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import engFlag from "../../../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../../../public/assets//images/espanolFlag.png";
import AimChip from "common/components/StatusChip/StatusChip";

const Ddata = [
	{
		key: "1",
		// name: "John Brown",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		// status: ["completed", "pending"],
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		key: "2",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		key: "3",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		key: "4",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		key: "5",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},

	{
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
];

type props = {
	language: string;
};

function AdminAppointmentsListing() {
	const columns = [
		{
			title: "ID",
			dataIndex: "doctor_id",
			key: "doctor_id",
			sorter: {
				compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
				multiple: 3,
			},
		},
		{
			title: "Booking Date",
			dataIndex: "user",
			key: "user",
		},
		{
			title: "Service",
			dataIndex: "user",
			key: "email",

			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Physician",
			dataIndex: "specialization",
			key: "timeslot",
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Patient",
			dataIndex: "language",
			key: "language",
		},
		{
			title: "Due Date ",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
		},
		{
			title: "Appointment Status",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
		},
		{
			title: "Payment Status",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
     
      render: (value: any) => (
				<div className="text-primary">
				 <AimChip typ="UPCOMING"/>
				</div>
			),
		},
		{
			title: "",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
			render: (value: any) => (
				<div className="text-primary">
					<EyeFilled
						onClick={() => {
							return Router.push(`/admin/account/${value}`);
						}}
					/>
				</div>
			),
		},
	];
	function onChange(pagination: any, filters: any, sorter: any, extra: any) {
		console.log("params", pagination, filters, sorter, extra);
	}

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
		
				{/* <AdminPhysicianSearchFilters /> */}
				<div className="w-full">
					<div className="">
						<Table columns={columns} dataSource={Ddata} onChange={onChange} />
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
export default AdminAppointmentsListing;
