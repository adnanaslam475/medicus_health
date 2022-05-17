import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
	AppointmentServiceType,
	AppointmentTimeSlots,
	Transaction,
	User,
} from "../../../generated/graphql";
import Router from "next/router";

interface col {
	title: string;
	dataIndex: string;
	key: "string";
	width: "30%";
}

type Props = {
	data?: any;
};

function PhysicianAppointmentHistoryTable(props: Props) {
	const { data } = props || {};

	const historyColumns = [
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
			title: "Booking Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
			sorter: {
				compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
				multiple: 3,
			},
			render: (value: string) => {
				return <div>{`${date?.formatMMMMDDYYYY(value)} `}</div>;
			},
		},

		{
			title: "Type",
			dataIndex: "serviceType",
			key: "serviceType",
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
			// render: (value: AppointmentServiceType) => {
			//   return <div>{`${value.name}`}</div>;
			// },
		},
		{
			title: "Physician Name",
			dataIndex: "doctor",
			key: "doctor",
			sorter: {
				compare: (a: any, b: any) => a.doctor - b.doctor,
				multiple: 3,
			},
			render: (value: User) => {
				return <div>{`${value.first_name} ${value.last_name}`}</div>;
			},
		},
		{
			title: "Appointment Due Date",
			dataIndex: "appointmentTimeSlots",
			key: "appointmentTimeSlots",
			sorter: {
				compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
				multiple: 3,
			},
			render: (value: AppointmentTimeSlots[]) => {
				let time = value?.find((time) => time.selected);
				return <div>{`${date?.formatMMMMDDYYYY(time?.startTime)} `}</div>;
			},
		},
		{
			title: "Appointment Time",
			dataIndex: "appointmentTimeSlots",
			key: "appointmentTimeSlots",
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
			render: (value: AppointmentTimeSlots[]) => {
				let time = value?.find((time) => time.selected);
				return (
					<div>{`${date?.formathhmma(time?.startTime)} - ${date?.formathhmma(
						time?.endTime
					)}`}</div>
				);
			},
		},
		{
			title: "Total Amount",
			dataIndex: "charges",
			key: "charges",
			sorter: {
				compare: (a: any, b: any) => a.totalamount - b.totalamount,
				multiple: 3,
			},
			render: (value: AppointmentServiceType) => {
				return <div>{`$ ${value}`}</div>;
			},
		},

		{
			title: "Payment Status",
			dataIndex: "status",
			key: "status",
			sorter: {
				compare: (a: any, b: any) => a.status - b.status,
				multiple: 3,
			},
			render: (value: string) => {
				return (
					<div>
						<Tag color="cyan">{value}</Tag>
					</div>
				);
			},
		},
		{
			title: "",
			dataIndex: "",
			key: "view",
			className: "table-action-icon",
			render: () => (
				<EyeFilled
					onClick={() => {
						return Router.push(`/physician/appointments/history/detail`);
					}}
				/>
			),
		},
	];
	const staticData = [
		{
			id: "1",
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
			id: "2",
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

	function onChange(pagination: any, filters: any, sorter: any, extra: any) {
		console.log("params", pagination, filters, sorter, extra);
	}
	return (
		<Table
			columns={historyColumns}
			dataSource={staticData}
			onChange={onChange}
		/>
	);
}

export default PhysicianAppointmentHistoryTable;
