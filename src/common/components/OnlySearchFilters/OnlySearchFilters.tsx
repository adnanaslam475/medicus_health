import React, { useEffect, useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker, Form } from "antd";
import {
	CaretDownOutlined,
	CloseOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import {
	Appointment,
	useDoctorProfilesQuery,
	useGetAllAppointmentServiceTypesQuery,
	useGetAllRequestedAppointmentsQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import Image from "next/image";
import { aimsCalendarIcon } from "../../../utils/images";
import { getDateInFormat } from "../../utils/date";
import _classes from "./SearchFilters.module.scss";

const { Option } = Select;

function handleChange(value: any) {}

const { RangePicker } = DatePicker;

function OnlySearchFilters() {
	const [selectedPhysicianItems, setSelectedPhysicianItems] = useState<
		string | null
	>();
	const [selectedServiceItems, setSelectedServiceItems] = useState<
		string | null
	>();
	const [dateRangeValues, selectDateRangeValues] = useState(null);
	const [openDateRange, setOpenDateRange] = useState(false);
	const [dateRange, selectDateRange] = useState(null);

	const [{ data: dataList }] = useDoctorProfilesQuery();
	const { doctorProfiles } = dataList || {};

	const [{ data }] = useGetAllAppointmentServiceTypesQuery();
	const { appointmentServiceTypes } = data || {};

	const handlePhysicianChange = (selectedItem: any, name: any) => {
		setSelectedPhysicianItems(name.children);
	};

	const handleServiceChange = (selectedItem: any, name: any) => {
		setSelectedServiceItems(name.children);
	};

	function onChange(date: any, dateString: any) {
		console.log(date, dateString);
		selectDateRangeValues(date);

		selectDateRange(date);
	}

	const onClear = () => {
		setSelectedPhysicianItems(null);
		setSelectedServiceItems(null);

		selectDateRangeValues(null);

		setOpenDateRange(false);
		selectDateRange(null);
	};

	return (
		<div
			className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5`}
		>
			<span className="text-gray-1 mr-3 mb-3">Filter</span>

			<div className="lg:ml-3 w-full sm:w-full md:w-full lg:max-w-1/2 mr-2">
				<Input
					placeholder="patient ID, profile picture, first name, last name, email address, contact number or address"
					prefix={<SearchOutlined />}
				/>
			</div>

			<div className="flex-none sm:flex">
				<Button
					onClick={onClear}
					type="text"
					className={`${_classes["btn-clear"]} sm:ml-3`}
				>
					<CloseOutlined className="text-sm" />
					<span className="text-gray-1 text-sm">Clear</span>
				</Button>
			</div>
		</div>
	);
}

export default OnlySearchFilters;
