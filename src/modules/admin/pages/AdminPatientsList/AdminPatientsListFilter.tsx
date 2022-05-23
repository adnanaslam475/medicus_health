import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import {
	CaretDownOutlined,
	CloseOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectCountryTypeFilter } from "common/components/SelectCountryTypeFilter/SelectCountryTypeFilter";
import { SelectStateTypeFilter } from "common/components/SelectStateTypeFilter copy/SelectStateTypeFilter";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
	onChange: (value: physicianFilterType) => void;
};
function AdminPatientsListFilter({ onChange }: Props) {
	const [filterState, setFilterState] = useState<physicianFilterType>({});

	function clear() {
		setFilterState({});
		onChange({});
	}
	const [openDateRange, setOpenDateRange] = useState(false);

	const applyDateRange = () => {
		setOpenDateRange(false);
	};

	function onChangeFields(key: string, value: string | object) {
		const filters = {
			...filterState,
			[key]: value,
		};
		setFilterState(filters);

		if (!filters.bookingDate?.startDate && !filters.bookingDate?.endDate) {
			delete filters.bookingDate;
		}
		if (!filters.searchString) {
			delete filters.searchString;
		}
		if (!filters.appointmentType) {
			delete filters.appointmentType;
		}

		onChange(filters);
	}

	return (
		<div className="page-filters flex-none lg:flex items-center py-3">
			<div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
				<div className="w-full sm:w-full md:w-full lg:w-96">
					<Input
						value={filterState.searchString}
						placeholder="Search by ID or name or email address"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							onChangeFields("searchString", e.target.value);
						}}
					/>
				</div>
		
			</div>
			<div className="flex-none sm:flex">
				<div className="lg:ml-3 mt-3 sm:mt-0">
					<SelectCountryTypeFilter
						onChange={(value) =>
							onChangeFields("appointmentType", value as string)
						}
						value={filterState.appointmentType}
					/>
				</div>
        <div className="lg:ml-3 mt-3 sm:mt-0">
					<SelectStateTypeFilter
						onChange={(value) =>
							onChangeFields("appointmentType", value as string)
						}
						value={filterState.appointmentType}
					/>
				</div>
        
				<FilterClearButton onClear={clear} />
			</div>
		</div>
	);
}

export default AdminPatientsListFilter;
