import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate, GetStaffFilter } from "generated/graphql";
import _classes from "./StaffAppointmentFilter.module.scss";

const { RangePicker } = DatePicker;

type Props = {
	onChange: (value: GetStaffFilter) => void;
};
function StaffAppointmentsFilter({ onChange }: Props) {
	const { Option } = Select;
	const [filterState, setFilterState] = useState<GetStaffFilter>({});

	function clear() {
		setFilterState({});
		onChange({});
	}
	const [openDateRange, setOpenDateRange] = useState(false);
	const [creationDate, setCreationDate] = useState<BookingDate>({});

	const applyDateRange = () => {
		setOpenDateRange(false);
		onChangeFields("CreationDate", creationDate);
	};

	function onChangeFields(key: string, value: string | object) {
		const filters = {
			...filterState,
			[key]: value,
		};
		setFilterState(filters);

		if (!filters.CreationDate?.startDate && !filters.CreationDate?.endDate) {
			delete filters.CreationDate;
		}
		if (!filters.searchString) {
			delete filters.searchString;
		}
		if (!filters.status) {
			delete filters.status;
		}
		onChange(filters);
	}

	return (
		<div className="page-filters flex-wrap lg:flex items-center my-3">
			<div className="flex  flex-wrap items-center  gap-2 ">
				<span className="text-gray-1  w-full 2xl:w-fit mr-0 mb-3 2xl:mr-3">
					Search by
				</span>
				<div className="w-full md:w-96">
					<Input
						value={filterState.searchString || ""}
						placeholder="ID#, staff name or email address"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							onChangeFields("searchString", e.target.value);
						}}
					/>
				</div>
				<div className="-mt-6 w-full sm:w-60">
					<FilterRangePicker
						onChange={(dateString: string[]) =>
							setCreationDate({
								startDate: dateString[0],
								endDate: dateString[1],
							})
						}
						open={openDateRange}
						onOpen={() => setOpenDateRange?.(!openDateRange)}
						onCancel={() => setOpenDateRange(false)}
						onApply={applyDateRange}
						title={
							filterState.CreationDate?.startDate && (
								<div>
									{filterState.CreationDate
										? `${filterState.CreationDate.startDate} -> ${filterState.CreationDate.endDate}`
										: "Account creation date"}
								</div>
							)
						}
						heading="Account creation date"
					/>
				</div>

				<div className="w-full sm:w-60">
					<Select
						placeholder="Status"
						className="w-full sm:w-60"
						onChange={(value) => onChangeFields("status", value as string)}
					>
						<Option value="true">Enable</Option>
						<Option value="false">Disabled</Option>
					</Select>
				</div>
				<FilterClearButton onClear={clear} />
			</div>
		</div>
	);
}
export default StaffAppointmentsFilter;
