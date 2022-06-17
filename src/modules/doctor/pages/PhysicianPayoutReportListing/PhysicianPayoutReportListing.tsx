import React from "react";
import { Collapse, Table } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import _classes from "./PhysicianPayoutReportListing.module.scss";

function PhysicianPayoutReportListing() {
	const { Panel } = Collapse;
	const onChange = (key: string | string[]) => {};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Appointment ID", dataIndex: "appointment_id", key: "platform" },
		{ title: "Patient Name", dataIndex: "patient_name", key: "version" },
		{ title: "Service", dataIndex: "service", key: "service" },
		{
			title: "Scheduled Date",
			dataIndex: "scheduled_date",
			key: "scheduled_date",
		},
		{
			title: "Physician Fee ($)",
			dataIndex: "physician_fee",
			key: "physician_fee",
		},
		{
			title: "Stripe Processing Fee ($)",
			dataIndex: "stripe_fee",
			key: "stripe_fee",
		},
		{ title: "Refunds ($)", dataIndex: "refund", key: "refund" },
		{
			title: "Return Processing Fee ($)",
			dataIndex: "return_fee",
			key: "return_fee",
		},

		{
			title: "Net Physician Fee($)",
			dataIndex: "net_fee",
			key: "net_fee",
		},
	];
	const Ddata = [
		{
			id: "1",
			// name: "John Brown",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			scheduled_date: "09:00 AM - 09:30 AM",
			sales: "$40.00",
			physician_fee: "$40.00",
			refund: "$40.00",
			return_fee: "$40.00",
			stripe_fee: "$3232",
			net_fee: "$40.00",
		},
		{
			id: "2",
			appointment_id: "MD-2312",
			patient_name: "Dr. Paul Wallner",
			service: "First Consultation",
			scheduled_date: "09:00 AM - 09:30 AM",
			physician_fee: "$40.00",
			sales: "$40.0",
			refund: "$40.00",
			return_fee: "$40.00",
			stripe_fee: "$3232",
			net_fee: "$40.00",
		},
	];
	return (
		<AppLayout>
			<h2 className="text-2xl">Payouts</h2>
			<Collapse onChange={onChange} className={`${_classes["payout_report"]}`}>
				<Panel header="june $448" key="1">
					<Table columns={columns} dataSource={Ddata} loading={false} scroll={{x:true}} />
				</Panel>
				<Panel header="May $231" key="3">
					<Table columns={columns} dataSource={Ddata} loading={false} scroll={{x:true}} />
				</Panel>
				<Panel header="April $324" key="4">
					<Table columns={columns} dataSource={Ddata} loading={false}scroll={{x:true}}/>
				</Panel>
			</Collapse>
		</AppLayout>
	);
}

export default PhysicianPayoutReportListing;
