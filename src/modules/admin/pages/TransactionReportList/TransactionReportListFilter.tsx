import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectStatusTypeFilter } from "common/components/SelectStatusTypeFilter/SelectStatusTypeFilter";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
	onChange: (value: physicianFilterType) => void;
};
function TransactionReportListFilter({ onChange }: Props) {
	const [filterState, setFilterState] = useState<physicianFilterType>({});

	function clear() {
		setFilterState({});
		onChange({});
	}
	const [openDateRange, setOpenDateRange] = useState(false);

	const applyDateRange = () => {
		setOpenDateRange(false);
	};

	function onChangeFields(key: string, value: string | number | object) {
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
		if (!filters.serviceId) {
			delete filters.serviceId;
		}

		onChange(filters);
	}

	return (
		<div className="page-filters flex-none lg:flex items-center ">
			<div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
				<div className="w-full sm:w-full md:w-full lg:w-70">
					<Input
						value={filterState.searchString}
						placeholder="Search by ID, appointment ID or patient name"
						prefix={<SearchOutlined />}
						onChange={(e) => {
							onChangeFields("searchString", e.target.value);
						}}
					/>
				</div>
				<div className="flex-none sm:flex">
					<div className="lg:ml-3 mt-3 sm:mt-0">
						<SelectServiceTypeFilter
							onChange={(value) => onChangeFields("serviceId", value)}
							value={filterState?.serviceId}
						/>
					</div>
				</div>
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
					heading="Schedule Date"
				/>
				<div className="lg:ml-3 sm:mt-0">
					<SelectStatusTypeFilter
						placeholder="Status"
						onChange={(value) => onChangeFields("status", value as string)}
						value="Status"
					/>
				</div>
				<div className="lg:ml-3 sm:mt-0">
					<Select
						placeholder="Payment Status"
						onChange={(value) => onChangeFields("paymentStatus", value)}
						className="w-full sm:w-50"
					>
						<Select.Option value="paid">PAID</Select.Option>
						<Select.Option value="unpaid">UNPAID</Select.Option>
					</Select>
				</div>
				<FilterClearButton onClear={clear} />
			</div>
		</div>
	);
}

export default TransactionReportListFilter;
