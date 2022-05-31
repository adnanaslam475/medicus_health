import React, { useState } from "react";
import Router from "next/router";
import { Divider, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import TransactionReportListFilter from "./TransactionReportListFilter";
import MyEarningsStats from "common/components/MyEarningsStats/MyEarningsStats";
import { useGetPhysiciansQuery, User } from "generated/graphql";

function TransactionReportList() {
	const [filterValues, setFilterValues] = useState({});

	const [{ data }, executeUseGetPhysiciansQuery] = useGetPhysiciansQuery({
		variables: {
			filter: filterValues,
		},
	});
	const { getPhysicians } = data || {};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: true,
		},
		{
			title: "Appointment ID",
			dataIndex: "appointment_id",
			key: "appointment_id",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Patient Name",
			dataIndex: "patient_name",
			key: "patient_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Service",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Scheduled Date",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Status",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Payment",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Gross Sales ($)",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Refunds ($)",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Taxes ($)",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Total Sales ($)",
			dataIndex: "first_name",
			key: "first_name",
			render: (value: User) => {
				return <div>{`${value}`}</div>;
			},
			sorter: true,
		},

		{
			title: "",
			dataIndex: "id",
			key: "view",
			className: "table-action-icon",
			render: (value: any) => (
				<div className="text-primary">
					<EyeFilled
						onClick={() => {
							return Router.push(`/admin/physicians/${value}`);
						}}
					/>
				</div>
			),
		},
	];

	const Ddata = [
		{
			id: "1",
			// name: "John Brown",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
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
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			timeslot: "09:00 AM - 09:30 AM",
			date: "Jan 30, 2022",
			totalamount: "$40.00",
			transactiondate: "Jan 24, 2022",
			status: ["completed", "pending"],
			view: "Eye",
		},
		{
			id: "3",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			timeslot: "09:00 AM - 09:30 AM",
			date: "Jan 30, 2022",
			totalamount: "$40.00",
			transactiondate: "Jan 24, 2022",
			status: ["completed", "pending"],
			view: "Eye",
		},
		{
			id: "4",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			timeslot: "09:00 AM - 09:30 AM",
			date: "Jan 30, 2022",
			totalamount: "$40.00",
			transactiondate: "Jan 24, 2022",
			status: ["completed", "pending"],
			view: "Eye",
		},
		{
			id: "5",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			timeslot: "09:00 AM - 09:30 AM",
			date: "Jan 30, 2022",
			totalamount: "$40.00",
			transactiondate: "Jan 24, 2022",
			status: ["completed", "pending"],
			view: "Eye",
		},
	];
	function onChangeFilters(values: any) {
		setFilterValues(values);
		executeUseGetPhysiciansQuery({
			filter: filterValues,
			requestPolicy: "network-only",
		});
	}
	return (
		<AppLayout>
			<div className="flex mb-0">
				<MyEarningsStats
					label={"Total Consultants"}
					// text={String(total_number_of_consultation)}
					text={10}
				/>
				<MyEarningsStats label={"Total Second Opinions"} text={10} />
				<MyEarningsStats label={"Total Patients"} text={10} />
				<MyEarningsStats label={"Earnings through Consultants"} text={10} />
				<MyEarningsStats label={"Earnings through Second Opinion"} text={10} />
				<MyEarningsStats label={"Total Earnings"} text={10} />
			</div>
			<Divider className="my-0 py-0" />
			<div className="w-full">
				<div className="flex justify-between">
					<h2 className="mb-0">Transaction Reports</h2>
				</div>
				<TransactionReportListFilter onChange={onChangeFilters} />
				<div className="w-full">
					<div className="">
						<Table columns={columns} dataSource={Ddata} />
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
export default TransactionReportList;
