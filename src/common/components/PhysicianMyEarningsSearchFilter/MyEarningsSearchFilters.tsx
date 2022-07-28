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
import {
  BookingDate,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import _classes from "./MyEarningsSearchFilters.module.scss";
import { physicianMyEarningsFilterType } from "common/types/types";
import AmountDropdown from "../AmountDropdown/AmountDropdown";
import { SelectStatusTypeFilter } from "../SelectStatusTypeFilter/SelectStatusTypeFilter";
import RefundsDropdown from "../RefundsDropdown/RefundsDropdown";
import TotalPaymentsDropdown from "../TotalPaymentsDropdown /TotalPaymentsDropdown";
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
  const [bookingDate, setBookingDate] = useState<BookingDate>({});

  const [visible, setVisible] = useState(false);
  const [refundVisible, setRefundVisible] = useState(false);
  const [totalPaymentsVisible, setTotalPaymentsVisible] = useState(false);

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function clear() {
    form.resetFields();
    setFilterState({});
    onChange({});
  }
  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("DateRange", dateRange);
  };
  const applyDateRangeTwo = () => {
    setOpenDateRangeTwo(false);
    onChangeFields("dueDate", dateRange);
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
    if (!filters?.dueDate?.startDate && !filters?.dueDate?.startDate) {
      delete filters?.dueDate;
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
  function onFinishLocalRefunds(values: {
    initialRefunds: number;
    finalRefunds: number;
  }) {
    onChangeFields("refunds", {
      initialRefunds: Number(values?.initialRefunds),
      finalRefunds: Number(values?.finalRefunds),
    });
  }
  function onFinishLocalTotalPayments(values: {
    initialCharges: number;
    finalCharges: number;
  }) {
    onChangeFields("charges", {
      initialCharges: Number(values?.initialCharges),
      finalCharges: Number(values?.finalCharges),
    });
  }
  // const amountRangeFilter = <AmountDropdown onFinishLocal={onFinishLocal} />;
  // const refundsRangeFilter = (
  //   <RefundsDropdown onFinishLocal={onFinishLocalRefunds} form={form} />
  // );
  const totalPaymentsRangeFilter = (
    <TotalPaymentsDropdown
      onFinishLocal={onFinishLocalTotalPayments}
      form={form}
    />
  );

  const onHandleVisible = () => {
    setVisible(!visible);
  };

  const onHandleRefundsVisible = () => {
    setRefundVisible(!refundVisible);
  };

  const onHandleTotalPaymentsVisible = () => {
    setTotalPaymentsVisible(!totalPaymentsVisible);
  };

  return (
    <div
      className={`${_classes["page-filters"]} flex items-center flex-wrap gap-2 mb-3`}
    >
      <span className="text-gray-1  w-full 2xl:w-fit ">Search by</span>
      <div className="flex flex-wrap gap-2">
        <div className=" w-full sm:w-full md:w-full xl:w-96">
          <Input
            placeholder="ID#, appointment ID# or patient name"
            prefix={<SearchOutlined />}
            value={filterState?.searchString}
            onChange={(e) => onChangeFields("searchString", e?.target.value)}
          />
        </div>
        <div className="w-full md:w-90 xl:w-56 ">
          <Select
            placeholder="Appointment type"
            className={`${searchStyle.placeholderColor} w-full`}
            onChange={(value) => onChangeFields("serviceId", value as string)}
            value={filterState?.serviceId || "Appointment type"}
          >
            {appointmentServiceTypes?.map((item) => (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* <div className=" flex mr-2 mt-0 md:mt-0">
          
          <div className="relative ">
            <RangePicker
              value={null}
              onChange={(_, dateString: string[]) =>
                setBookingDate({
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
                    : "Booking date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div>Booking date</div>
                  <div>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row w-full  md:w-64">
          <div className="relative  w-full md:w-64 flex-1">
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
              {filterState.dueDate?.startDate ? (
                <div>
                  {filterState.dueDate
                    ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                    : "Appointment date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div>Appointment date</div>
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
        <div className="w-full md:w-56 mt-0">
          <SelectStatusTypeFilter
            placeholder="Appointment status"
            onChange={(value) => onChangeFields("status", value as string)}
            // value={filterValues.status}
            value={filterState?.status || "Appointment status"}
          />
        </div>
        <div className="w-full md:w-56">
          <Select
            placeholder="Payment status"
            onChange={(value) => onChangeFields("paymentStatus", value)}
            className="w-full sm:w-46"
            value={filterState?.paymentStatus || "Payment status"}
          >
            <Select.Option value="paid">PAID</Select.Option>
            <Select.Option value="unpaid">UNPAID</Select.Option>
            <Select.Option value="refunded">REFUNDED</Select.Option>
          </Select>
        </div>
        {/* <Dropdown
          className={`${_classes["range-filter-dropDown"]} flex items-center rounded-lg ml-0 p-3 mr-2 border `}
          overlay={refundsRangeFilter}
          trigger={["click"]}
          visible={refundVisible}
        >
          <a onClick={onHandleRefundsVisible}>
            <Space>
              Refunds
              <DownOutlined />
            </Space>
          </a>
        </Dropdown> */}
        <Dropdown
          className={`${_classes["range-filter-dropDown"]} flex items-center rounded-lg p-3 border`}
          overlay={totalPaymentsRangeFilter}
          trigger={["click"]}
          visible={totalPaymentsVisible}
        >
          <a onClick={onHandleTotalPaymentsVisible}>
            <Space>
              <span className="leading-3">Total payment</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
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
