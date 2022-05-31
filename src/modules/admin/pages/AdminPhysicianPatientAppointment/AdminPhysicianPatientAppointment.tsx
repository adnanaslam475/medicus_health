import React, { useState } from "react";
import { Button, notification, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
	Appointment,
	AppointmentServiceType,
	AppointmentTimeSlots,
	GetAppointmentInput,
	useAdminPhysicianAppointmentQuery,
	usePhysicianPaymentByAdminMutation,
	User,
} from "generated/graphql";
import AdminPhysicianPatientAppointmentSearchFilters from "./AdminPhysicianPatientAppointmentSearchFilters";
import StatusChip from "common/components/StatusChip/StatusChip";
import { useRouter } from "next/router";
import { date } from "common/utils";

function AdminPhysicianList() {
	const { query } = useRouter();
	const [filterValues, setFilterValues] = useState<GetAppointmentInput>({});

	const [{ data }, executeUseAdminPhysicianAppointmentQuery] =
		useAdminPhysicianAppointmentQuery({
			variables: {
				filter: {
					...filterValues,
					patientId: Number(query.id),
				},
			},
		});
	const { appointments } = data || {};

	// Physician Payment By Admin Mutatio
	const [result, PhysicianPaymentByAdmin] =
		usePhysicianPaymentByAdminMutation();

	const onPayPhysician = async (appointmentId: number) => {
		try {
			appointmentId;
			const res = await PhysicianPaymentByAdmin({
				paymeninput: {
					appointmentId: appointmentId,
				},
			});

			if (res?.data) {
				res?.data &&
					notification.success({
						message: "Payment Successfull",
					});
			}

			if (res?.error) {
				notification.error({
					message:
						res?.error?.graphQLErrors[0]?.message || "Something went wrong",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const columns = [
		{
			title: "Appointment ID",
			dataIndex: "id",
			key: "id",
			sorter: {
				compare: (a: any, b: any) => a.id - b.id,
				multiple: 3,
			},
		},
		{
			title: "Patient",
			dataIndex: "patient",
			key: "patient",
			render: (patient: User) => {
				return <div>{`${patient?.first_name} ${patient?.last_name}`}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.first_name - b.first_name,
				multiple: 3,
			},
		},
		{
			title: "Service",
			dataIndex: "serviceType",
			key: "serviceType",
			render: (serviceType: AppointmentServiceType) => {
				return <div>{serviceType?.name}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "Time Slot",
			dataIndex: "appointmentTimeSlots",
			key: "appointmentTimeSlots",
			render: (appointmentTimeSlots: AppointmentTimeSlots[]) => {
				let selectedTime = appointmentTimeSlots.find((item) => item.selected);
				return (
					<div>{`${date?.formathhmma(
						selectedTime?.startTime
					)} - ${date?.formathhmma(selectedTime?.endTime)}`}</div>
				);
			},
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Date",
			dataIndex: "appointmentTimeSlots",
			key: "appointmentTimeSlots",
			render: (appointmentTimeSlots: AppointmentTimeSlots[]) => {
				let selectedTime = appointmentTimeSlots.find((item) => item.selected);
				return (
					<div className="someclass">{`${date?.formatMMMMDDYYYY(
						selectedTime?.startTime
					)} `}</div>
				);
			},
			sorter: {
				compare: (a: any, b: any) => a.timeslot - b.timeslot,
				multiple: 3,
			},
		},
		{
			title: "Total Amount",
			dataIndex: "charges",
			key: "charges",
			render: (value: User) => {
				return <div>$ {value}</div>;
			},
			sorter: {
				compare: (a: any, b: any) => a.charges - b.charges,
				multiple: 3,
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (value: User) => {
				return <StatusChip type="COMPLETED" />;
			},
			sorter: {
				compare: (a: any, b: any) => a.service - b.service,
				multiple: 3,
			},
		},
		{
			title: "",
			dataIndex: "id",
			key: "id",
			render: (appointmentId: number) => {
				return (
					<Button
						className=""
						type="primary"
						size={"large"}
						onClick={() => onPayPhysician(appointmentId)}
					>
						Pay Now
					</Button>
				);
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
							Router.push(`/admin/physicians/detail`);
						}}
					/>
				</div>
			),
		},
	];

	function onChangeFilters(filterValue: GetAppointmentInput) {
		setFilterValues(filterValue);
		executeUseAdminPhysicianAppointmentQuery({
			filter: filterValues,
			requestPolicy: "network-only",
		});
	}

	return (
		<div className="w-full">
			<div className="flex justify-between">
				<h2 className="pb-0">Appointments</h2>
			</div>

			<AdminPhysicianPatientAppointmentSearchFilters
				onChange={onChangeFilters}
			/>
			<div className="w-full">
				<div>
					<Table columns={columns} dataSource={appointments} />
				</div>
			</div>
		</div>
	);
}
export default AdminPhysicianList;
