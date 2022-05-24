import React from "react";
import DoctorCard from "common/components/DoctorCards/DoctorCards";
import AppLayout from "common/components/AppLayout/AppLayout";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Router from "next/router";
import { useDoctorProfilesQuery, User } from "generated/graphql";
import Image from "next/image";
import AdminPhysicianPatientAppointmentSearchFilters from "./AdminPhysicianPatientAppointmentSearchFilters";
import StatusChip from '../../../../common/components/StatusChip/StatusChip'
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

function AdminPhysicianList() {
	// const [{ data }] = useDoctorProfilesQuery();
	const [{ data }] = useDoctorProfilesQuery();
	const { doctorProfiles } = data || {};

	const columns = [
		{
			title: "Appointment ID",
			dataIndex: "patient_id",
			key: "patient_id",
			sorter: {
				compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
				multiple: 3,
			},
		},
		{
			title: "Patient",
			dataIndex: "patient",
			key: "patient",
			render: (value: User) => {
				return (
					<div className="someclass">{`${value?.first_name} ${value?.last_name}`}</div>
				);
			},

			sorter: {
				compare: (a: any, b: any) => a.first_name - b.first_name,
				multiple: 3,
			},
		},
		{
			title: "Service",
			dataIndex: "service",
			key: "service",
			render: (value: User) => {
				return <div className="someclass">{value?.email}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Time Slot",
			dataIndex: "specialization",
			key: "timeslot",
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (value: User) => {
				return <div className="someclass">{value?.email}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Total Amount",
			dataIndex: "totalamount",
			key: "totalamount",
			render: (value: User) => {
				return <div className="someclass">{value?.email}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (value: User) => {
				return <StatusChip typ="COMPLETED"/>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
    {
			title: "",
			dataIndex: "pay",
			key: "status",
			render: (value: User) => {
				return <Button className="" type="primary" size={"large"}>Pay Now</Button>;
			},
		
		},
		{
			title: "",
			dataIndex: "doctor_id",
			key: "view",
			className: "table-action-icon",
			render: (value: string) => (
				<div className="text-primary">
					<EyeFilled
						className="text-primary"
						onClick={() => {
							return Router.push(`/admin/physicians/${value}`);
						}}
					/>
				</div>
			),
		},
	];
	function onChange() {}

	function onChangeFilters() {}
	return (
		<div className="w-full">
			<div className="flex justify-between">
				<h2 className="pb-0">Appointments</h2>
			</div>

			<AdminPhysicianPatientAppointmentSearchFilters
				onChange={onChangeFilters}
			/>
			<div className="w-full">
				<div className="">
					<Table
						columns={columns}
						dataSource={doctorProfiles}
						onChange={onChange}
					/>
				</div>
			</div>
		</div>
	);
}
export default AdminPhysicianList;
