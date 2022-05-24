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
import AdminAppointmentsFilter from "../AdminAppointmentsFilter/AdminAppointmentsFilter";

const Ddata = [
	{
		id: "1",
		// name: "John Brown",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		booking_date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactionbooking_date: "Jan 24, 2022",
		// status: ["completed", "pending"],
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		id: "2",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		booking_date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactionbooking_date: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		id: "3",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		booking_date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactionbooking_date: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		id: "4",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		booking_date: "Jan 30, 2022",
		totalamount: "$40.00",
		transactiondate: "Jan 24, 2022",
		status: ["completed", "pending"],
		view: "Eye",
	},
	{
		id: "5",
		transactionid: "MD-2312",
		doctor: "Dr. Paul Wallner",
		service: "First Consultation",
		timeslot: "09:00 AM - 09:30 AM",
		booking_date: "Jan 30, 2022",
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
			dataIndex: "id",
			key: "doctor_id",
			sorter: {
				compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
				multiple: 3,
			},
		},
		{
			title: "Booking Date",
			dataIndex: "booking_date",
			key: "user",
		},
		{
			title: "Service",
			dataIndex: "service",
			key: "email",

			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Physician",
			dataIndex: "doctor",
			key: "timeslot",
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Patient",
			dataIndex: "doctor",
			key: "language",
		},
		{
			title: "Due Date ",
			dataIndex: "booking_date",
			key: "view",
			className: "table-action-icon",
		},
		{
			title: "Appointment Status",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
      render: (value: any) => (
				<div className="text-primary">
					<AimChip typ="COMPLETED" />
				</div>
			),
		},
		{
			title: "Payment Status",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",

			render: (value: any) => (
				<div className="text-primary">
					<AimChip typ="UPCOMING" />
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
							return Router.push(`/admin/appointments/detail`);
						}}
					/>
				</div>
			),
		},
	];
	function onChange() {}

	function onChangeFilters() {}
	return (
		<AppLayout>
			<div className="w-full">
				<div className="flex justify-between items-center">
					<h2 className="mb-0 pb-0">Appointments</h2>
					<Link passHref href={`/admin/physicians/addPhysician`}>
						<a>
							<Button type="primary">Request an Appointment</Button>
						</a>
					</Link>
				</div>

				<AdminAppointmentsFilter onChange={onChangeFilters} />
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
