import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { Button, Table, Tag, Modal } from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";

import PatientSearchFilters from "./PatientSearchFilters";
import Router from "next/router";
import { useDoctorProfilesQuery, User } from "../../../../../generated/graphql";
import Image from "next/image";
import engFlag from "../../../../../../public/assets//images/engFlag.png";
import espanolFlag from "../../../../../../public/assets//images/espanolFlag.png";
import SearchFilters from "common/components/SearchFilters/SearchFilters";
import OnlySearchFilters from "common/components/OnlySearchFilters/OnlySearchFilters";
import yourImage from "../../../../../../public/assets/images/your_photo.png";

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

const FLAG_BY_LANGUAGE = {
	["english" as string]: engFlag,
	["Spanish" as string]: espanolFlag,
};

interface col {
	title: string;
	dataIndex: string;
	key: "string";
	width: "30%";
	language: string;
}

type props = {
	language: string;
};

function PatientList() {
	// const [{ data }] = useDoctorProfilesQuery();
	const [{ data }] = useDoctorProfilesQuery();
	const { doctorProfiles } = data || {};

	const columns = [
		{
			title: "ID",
			dataIndex: "patient_id",
			key: "patient_id",
			sorter: {
				compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
				multiple: 3,
			},
		},
		{
			title: "Profile Picture",
			dataIndex: "profile_picture",
			key: "profile_picture",
			sorter: {
				compare: (a: any, b: any) => a.doctor_id - b.doctor_id,
				multiple: 3,
			},
			render: (value: User) => {
				return (
					<div className="someclass">
						{" "}
						<Image
							alt=""
							src={yourImage}
							width={44}
							height={44}
							className="border rounded border-gray-2"
						/>
					</div>
				);
			},
		},
		{
			title: "First Name",
			dataIndex: "firstname",
			key: "firstname",
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
			title: "Last Name",
			dataIndex: "lastname",
			key: "lastname",
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
			title: "Email Address",
			dataIndex: "email",
			key: "email",
			render: (value: User) => {
				return <div className="someclass">{value?.email}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Contact Number",
			dataIndex: "contact_number",
			key: "contact_number",
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
			render: (language: string) => {
				return <div className="flagAvatar engFlag pr-2"></div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.date - b.date,
				multiple: 3,
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
							return Router.push(`/doctor/patients/detail`);
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
				<div className="flex justify-between">
					<h2 className="mb-4">Patients</h2>
				</div>
				<OnlySearchFilters />
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
		</AppLayout>
	);
}
export default PatientList;
