import React, { useState } from "react";
import {
	Input,
	Button,
	Select,
	Space,
	DatePicker,
	Form,
	Dropdown,
	InputNumber,
} from "antd";
import {
	CaretDownOutlined,
	CloseOutlined,
	DownOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { BookingDate, useGetAllAppointmentServiceTypesQuery } from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import _classes from "./MyEarningsSearchFilters.module.scss";
import { physicianMyEarningsFilterType } from "common/types/types";
import AmountDropdown from "../AmountDropdown/AmountDropdown";
import { SelectStatusTypeFilter } from "../SelectStatusTypeFilter/SelectStatusTypeFilter";

const { RangePicker } = DatePicker;

type Props = {
	onChange: (value: physicianMyEarningsFilterType) => void;
};

function MyEarningsSearchFilters(props: Props) {
	const [filterState, setFilterState] = useState<physicianMyEarningsFilterType>(
		{}
	);
	const [form] = Form.useForm();
	const { onChange } = props;

	const [openDateRange, setOpenDateRange] = useState(false);
	const [openDateRangeTwo, setOpenDateRangeTwo] = useState(false);
	const [dateRange, setDateRange] = useState<BookingDate>({});

	const [visible, setVisible] = useState(false);

	const [{ data }] = useGetAllAppointmentServiceTypesQuery();
	const { appointmentServiceTypes } = data || {};

	function clear() {
		setFilterState({});
		onChange({});
		form.resetFields();
	}

	const applyDateRange = () => {
		setOpenDateRange(false);
		onChangeFields("DateRange",dateRange)

	};
	const applyDateRangeTwo = () => {
		setOpenDateRangeTwo(false);
		onChangeFields("DateRange",dateRange)
	};

	function onChangeFields(key: string, value: string | object) {
		const filters = {
			...filterState,
			[key]: value,
		};
		setFilterState(filters);

		if (!filters?.searchString) {
			delete filters?.searchString;
		}

		if (!filters?.serviceId) {
			delete filters?.serviceId;
		}

		if (!filters?.DateRange?.startDate && !filters?.DateRange?.startDate) {
			delete filters?.DateRange;
		}

		if (!filters?.earnings?.initial && !filters?.earnings?.final) {
			delete filters?.earnings;
		}

		onChange(filters);
	}

	function onFinishLocal(values: { minValue: number; maxValue: number }) {
		onChangeFields("earnings", {
			initial: Number(values?.minValue),
			final: Number(values?.maxValue),
		});
	}

	const amountRangeFilter = <AmountDropdown onFinishLocal={onFinishLocal} />;
	const onHandleVisible = () => {
		setVisible(!visible);
	};

	return (
		<div
			className={`${_classes["page-filters"]} flex items-center mb-5 flex-wrap`}
		>
			<span className="text-gray-1 mr-3 mb-3"></span>
			<div className="flex flex-wrap">
				<div className=" w-full sm:w-full md:w-full xl:w-96 mr-2 md:mb-2">
					<Input
						placeholder="Search by ID, appointment ID or patient name"
						prefix={<SearchOutlined />}
						value={filterState?.searchString}
						onChange={(e) => onChangeFields("searchString", e?.target.value)}
					/>
				</div>
				<div className="w-full md:w-56 xl:w-36 mr-2 mb-3 mt-3 md:mt-0">
					<Select
						placeholder="Service"
						className={`${searchStyle.placeholderColor} w-full`}
						onChange={(value) => onChangeFields("serviceId", value)}
					>
						{appointmentServiceTypes?.map((item) => (
							<Select.Option key={item?.id} value={item?.id}>
								{item?.name}
							</Select.Option>
						))}
					</Select>
				</div>
				<div className=" flex mr-2 mt-0 md:mt-0">
					{/* <Space
            direction="vertical"
            size={0}
            className="w-full md:w-44 xl:w-60 sm:mb-3 mr-2"
          > */}
					<div className="relative ">
						<RangePicker
							value={null}
							onChange={(_, dateString: string[]) =>
								setDateRange({
									startDate: dateString[0],
									endDate: dateString[1],
								})
							}
							open={openDateRange}
							className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
							renderExtraFooter={() => (
								<div className="flex gap-3 justify-end p-3">
									<Button
										className="bg-gray-300"
										onClick={() => {
											setOpenDateRange(false);
										}}
									>
										Cancel
									</Button>
									<Button
										className=" text-white"
										type="primary"
										onClick={() => {
											applyDateRange();
										}}
									>
										Apply
									</Button>
								</div>
							)}
						/>
						<Button
							className="flex date-btn"
							block
							type="default"
							onClick={() => setOpenDateRange?.(!openDateRange)}
						>
							{filterState.DateRange?.startDate ? (
								<div>
									{filterState.DateRange
										? `${filterState.DateRange.startDate} -> ${filterState.DateRange.endDate}`
										: "Booking Date"}
								</div>
							) : (
								<div className="flex justify-between items-center w-full px-3">
									<div>Booking Date</div>
									<div>
										<CaretDownOutlined />
									</div>
								</div>
							)}
						</Button>
					</div>
				</div>
				<div className="flex-none sm:flex mr-2 mt-0 md:mt-0  ">
					<div className="relative">
						<RangePicker
							value={null}
							onChange={(_, dateString: string[]) =>
								setDateRange({
									startDate: dateString[0],
									endDate: dateString[1],
								})
							}
							open={openDateRangeTwo}
							className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
							renderExtraFooter={() => (
								<div className="flex gap-3 justify-end p-3">
									<Button
										className="bg-gray-300"
										onClick={() => {
											setOpenDateRangeTwo(false);
										}}
									>
										Cancel
									</Button>
									<Button
										className=" text-white"
										type="primary"
										onClick={() => {
											applyDateRangeTwo();
										}}
									>
										Apply
									</Button>
								</div>
							)}
						/>
						<Button
							className="flex date-btn"
							block
							type="default"
							onClick={() => setOpenDateRangeTwo?.(!openDateRangeTwo)}
						>
							{filterState.DateRange?.startDate ? (
								<div>
									{filterState.DateRange
										? `${filterState.DateRange.startDate} -> ${filterState.DateRange.endDate}`
										: "Scheduled Date"}
								</div>
							) : (
								<div className="flex justify-between items-center w-full px-3">
									<div>Scheduled Date</div>
									<div>
										<CaretDownOutlined />
									</div>
								</div>
							)}
						</Button>
					</div>
				</div>
				{/* </Space> */}

				{/* <Dropdown
            className={`${_classes["range-filter-dropDown"]} flex items-center rounded-lg ml-0 p-3 border `}
            overlay={amountRangeFilter}
            trigger={["click"]}
            visible={visible}
          >
            <a onClick={onHandleVisible}>
              <Space>
                Amount
                <DownOutlined />
              </Space>
            </a>
          </Dropdown> */}
				<div className="w-full sm:w-56 sm:w-44  mt-0  mr-2  md:mt-0 sm:my-0 xs:my-3">
					<SelectStatusTypeFilter
						placeholder="Status"
						onChange={(value) => onChangeFields("status", value as string)}
						// value={filterValues.status}
						value={filterState?.status || "Status"}
					/>
				</div>
				<div className="w-full md:w-96 md:ml-2 lg:ml-2  sm:mt-3 md:mt-0">
					<Select
						placeholder="Payment Status"
						onChange={(value) => onChangeFields("paymentStatus", value)}
						className="w-full sm:w-50"
						value={filterState?.paymentStatus || "Payment Status"}
					>
						<Select.Option value="paid">PAID</Select.Option>
						<Select.Option value="unpaid">UNPAID</Select.Option>
					</Select>
				</div>
				<Button
					onClick={clear}
					type="text"
					className={`${_classes["btn-clear"]} sm:ml-3   sm:mt-0`}
				>
					<CloseOutlined className="text-sm" />
					<span className="text-gray-1 text-sm">Clear</span>
				</Button>
			</div>
		</div>
		// </div>
	);
}

export default MyEarningsSearchFilters;
