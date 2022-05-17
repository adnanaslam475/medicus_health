import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { date } from "../../utils";
import {
	AppointmentServiceType,
	AppointmentTimeSlots,
	Transaction,
	User,
} from "generated/graphql";
import Router from "next/router";

type Props = {
	data?: object;
};

function PatientAppointmentHistoryTable(props: Props) {
	const { data } = props || {};

	const historyColumns = [
		{
			title: "ID",
			dataIndex: "ID",
			key: "ID",
			sorter: {
				compare: (a: any, b: any) => a.id - b.id,
				multiple: 3,
			},
		},
		{
			title: "Doctor",
			dataIndex: "doctor",
			key: "doctor",
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			sorter: {
				compare: (a: any, b: any) => a.doctor - b.doctor,
				multiple: 3,
			},
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			sorter: {
				compare: (a: any, b: any) => a.requestedDate - b.requestedDate,
				multiple: 3,
			},
		
		},

		{
			title: "",
			dataIndex: "",
			key: "view",
			className: "table-action-icon",
			render: () => (
				<EyeFilled
					onClick={() => Router.push("/physician/appointments/history/detail")}
				/>
			),
		},
	];
	const Ddata = [
		{
			ID: "1",
			// name: "John Brown",
			doctor: "MD khan",
			type: "First Consultation",
			date: "10 march 1998",
			time: "09:00 AM - 09:30 AM",
		},
		{
			ID: "1",
			// name: "John Brown",
			doctor: "MD khan",
			type: "First Consultation",
			date: "10 march 1998",
			time: "09:00 AM - 09:30 AM",
		},
		{
			ID: "1",
			// name: "John Brown",
			doctor: "MD khan",
			type: "First Consultation",
			date: "10 march 1998",
			time: "09:00 AM - 09:30 AM",
		},
		{
			ID: "1",
			// name: "John Brown",
			doctor: "MD khan",
			type: "First Consultation",
			date: "10 march 1998",
			time: "09:00 AM - 09:30 AM",
		},
		{
			ID: "1",
			// name: "John Brown",
			doctor: "MD khan",
			type: "First Consultation",
			date: "10 march 1998",
			time: "09:00 AM - 09:30 AM",
		},
	];

	function onChange(pagination: any, filters: any, sorter: any, extra: any) {
		console.log("params", pagination, filters, sorter, extra);
	}
	return (
		<Table columns={historyColumns} dataSource={Ddata} onChange={onChange} />
	);
}

export default PatientAppointmentHistoryTable;
