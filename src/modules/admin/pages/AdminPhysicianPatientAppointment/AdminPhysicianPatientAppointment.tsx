import React, { useState } from "react";
import { Button, notification, Table } from "antd";
import { EyeFilled } from "@ant-design/icons";
import Router from "next/router";
import {
	AppointmentDateTimeResponse,
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
import { StatusName } from "common/types/types";
import { tableFooter } from "utils/helper";

function AdminPhysicianList() {
	const { query } = useRouter();
	const [pagination, setPagination] = React.useState({
		page: 1,
		limit: 10,
	});

	const [sorting, setSorting] = React.useState({
		column: "",
		order: "",
	});

	const [filterValues, setFilterValues] = useState<GetAppointmentInput>({});

	const [{ data, fetching }, executeUseAdminPhysicianAppointmentQuery] =
		useAdminPhysicianAppointmentQuery({
			variables: {
				filter: {
					...filterValues,
					doctorId: Number(query.id),
				},
				pagination,
				sorting,
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
				paymentInput: {
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
			sorter: true,
		},
		{
			title: "Patient name",
			dataIndex: "patient",
			key: "patient",
			render: (patient: User) => {
				return <div>{`${patient?.first_name} ${patient?.last_name}`}</div>;
			},
			sorter: true,
		},
		{
			title: "Service",
			dataIndex: "serviceType",
			key: "serviceType",
			render: (serviceType: AppointmentServiceType) => {
				return <div>{serviceType?.name}</div>;
			},
			sorter: true,
		},
		{
			title: "Time slot",
			dataIndex: "appointmentDateTime",
			key: "appointmentDateTime",
			render: (appointmentDateTime: AppointmentDateTimeResponse) => {
				return (
					<div>
						{appointmentDateTime?.startTime && appointmentDateTime?.endTime
							? `${date?.formathhmma(
									appointmentDateTime?.startTime
							  )} - ${date?.formathhmma(appointmentDateTime.endTime)}`
							: "--"}
					</div>
				);
			},
			sorter: true,
		},
		{
			title: "Date",
			dataIndex: "appointmentDateTime",
			key: "appointmentDateTime",
			render: (appointmentDateTime: AppointmentDateTimeResponse) => {
				let formatedStartTime = date.formathhmma(String(appointmentDateTime?.startTime));
				let formatedEndTime = date.formathhmma(String(appointmentDateTime?.endTime))
				return (
					<div>
				{appointmentDateTime?.startTime && appointmentDateTime?.endTime
				  ? `${formatedStartTime} - ${formatedEndTime} `
				  : "--"}
					</div>
				);
			},
			sorter: true,
		},
		{
			title: "Total amount",
			dataIndex: "charges",
			key: "charges",
			render: (value: User) => {
				return <div>${value}</div>;
			},
			sorter: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				return <StatusChip type={status.toUpperCase() as StatusName} />;
			},
			sorter: true,
		},
		// {
		//   title: "",
		//   dataIndex: "id",
		//   key: "id",
		//   render: (appointmentId: number) => {
		//     return (
		//       <Button
		//         className=""
		//         type="primary"
		//         size={"large"}
		//         onClick={() => onPayPhysician(appointmentId)}
		//       >
		//         Pay Now
		//       </Button>
		//     );
		//   },
		// },
		{
			title: "",
			dataIndex: "id",
			key: "view",
			className: "table-action-icon",
			render: (value: string) => (
				<div className="text-primary">
					<EyeFilled
						className="text-primary"
						onClick={() => {
							Router.push(`/admin/physicians/detail/${value}`);
						}}
					/>
				</div>
			),
		},
	];

	const onPaginationChange = (page: number, limit: number) =>
		setPagination({ page, limit });

	const onChange = (...params: any) => {
		const [, , sorter] = params;
		setSorting({
			order: sorter.order?.replace("end", "") || "",
			column: sorter.order ? `user.${sorter.field}` : "",
		});
	};

	function onChangeFilters(filterValue: GetAppointmentInput) {
		setFilterValues(filterValue);
		setPagination({ ...pagination, page: 1 });
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
					<Table
						columns={columns}
						dataSource={appointments?.items}
						loading={fetching}
						onChange={onChange}
						footer={(currentPageCount)=>tableFooter(currentPageCount?.length,Number(appointments?.meta?.totalItems||0))}
						pagination={{
							total: Number(appointments?.meta?.totalPages) * pagination.limit,
							current: appointments?.meta?.currentPage,
							defaultPageSize: 10,
							onChange: onPaginationChange,
							pageSizeOptions: ["10", "20", "30", "40"],
							showSizeChanger: true,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
export default AdminPhysicianList;
