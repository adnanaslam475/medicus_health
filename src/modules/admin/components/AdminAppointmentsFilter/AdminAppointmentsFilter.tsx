import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import {
	CaretDownOutlined,
	CloseOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { useGetAllAppointmentServiceTypesQuery } from "generated/graphql";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectStatusTypeFilter } from "common/components/SelectStatusTypeFilter/SelectStatusTypeFilter";
import { SelectCountryTypeFilter } from "common/components/SelectCountryTypeFilter/SelectCountryTypeFilter";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
	onChange: (value: physicianFilterType) => void;
};
function AdminAppointmentFilter({ onChange }: Props) {
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
		<div className="page-filters flex-none lg:flex items-center mb-5">
			<div className="flex items-center sm:flex sm:mb-3 lg:mb-0 flex-wrap">
				<div className="lg:ml-3 w-full sm:w-full md:w-full lg:max-w-[400px]">
					<Input
						value={filterState.searchString}
						placeholder="Search by ID, physician name or patient name"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							onChangeFields("searchString", e.target.value);
						}}
					/>
				</div>
				<div className="flex-none sm:flex">
					<div className="lg:ml-3 mt-3 sm:mt-0">
						<SelectServiceTypeFilter
							onChange={(value) =>
								onChangeFields("appointmentType", value as string)
							}
							value={filterState.appointmentType}
						/>
					</div>
				</div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
				<FilterRangePicker
					onChange={(dateString: string[]) =>
						onChangeFields("bookingDate", {
							startDate: dateString[0],
							endDate: dateString[1],
						})
					}
					open={openDateRange}
					onOpen={() => setOpenDateRange?.(!openDateRange)}
					onCancel={() => setOpenDateRange(false)}
					onApply={applyDateRange}
					title={
						filterState.bookingDate?.startDate && (
							<div>
								{filterState.bookingDate
									? `${filterState.bookingDate.startDate} -> ${filterState.bookingDate.endDate}`
									: "Creation Date"}
							</div>
						)
					}
					heading="Booking Date"
				/>
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
				<FilterRangePicker
					onChange={(dateString: string[]) =>
						onChangeFields("bookingDate", {
							startDate: dateString[0],
							endDate: dateString[1],
						})
					}
					open={openDateRange}
					onOpen={() => setOpenDateRange?.(!openDateRange)}
					onCancel={() => setOpenDateRange(false)}
					onApply={applyDateRange}
					title={
						filterState.bookingDate?.startDate && (
							<div>
								{filterState.bookingDate
									? `${filterState.bookingDate.startDate} -> ${filterState.bookingDate.endDate}`
									: "Creation Date"}
							</div>
						)
					}
					heading="Confirmation Date"
				/>
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
				<FilterRangePicker
					onChange={(dateString: string[]) =>
						onChangeFields("bookingDate", {
							startDate: dateString[0],
							endDate: dateString[1],
						})
					}
					open={openDateRange}
					onOpen={() => setOpenDateRange?.(!openDateRange)}
					onCancel={() => setOpenDateRange(false)}
					onApply={applyDateRange}
					title={
						filterState.bookingDate?.startDate && (
							<div>
								{filterState.bookingDate
									? `${filterState.bookingDate.startDate} -> ${filterState.bookingDate.endDate}`
									: "Creation Date"}
							</div>
						)
					}
					heading="Scheduled Date"
				/>
        </div>
        
				<div className="lg:ml-3 sm:mt-0">
					<SelectStatusTypeFilter
						placeHolder="Appointment Status"
						onChange={(value) =>
							onChangeFields("appointmentType", value as string)
						}
						value={filterState.appointmentType}
					/>
				</div>
        <div className="lg:ml-3 sm:mt-0">
					<Select placeholder="Payment Status" className="w-full sm:w-50">
						<Select.Option value="paid">PAID</Select.Option>
						<Select.Option value="unpaid">UNPAID</Select.Option>
					</Select>
				</div>
				<FilterClearButton onClear={clear} />
			</div>
		</div>
	);
}

export default AdminAppointmentFilter;
