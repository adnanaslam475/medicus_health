import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectStatusTypeFilter } from "common/components/SelectStatusTypeFilter/SelectStatusTypeFilter";
import { BookingDate } from "generated/graphql";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: physicianFilterType) => void;
};
function TransactionReportListFilter({ onChange }: Props) {
  const [filterState, setFilterState] = useState<physicianFilterType>({});
  const [creationDate, setCreationDate] = useState<BookingDate>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});

  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openCreationDateRange, setOpenCreationDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("bookingDate", bookingDate);
  };

  const applyCreationDate = () => {
    setOpenCreationDateRange(false);
    onChangeFields("dueDate", creationDate);
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
    if (!filters.dueDate?.startDate && !filters.dueDate?.endDate) {
      delete filters.dueDate;
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
    <div className="page-filters flex-none lg:flex items-center mb-3 ">
      <div className="flex items-center sm:flex gap-2 flex-wrap">
        <div className=" w-full sm:w-80">
          <Input
            value={filterState.searchString}
            placeholder="Search by ID#, appointment ID# or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <div className="flex-none w-full sm:w-44 sm:flex">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
          />
        </div>
        <div className="-mt-6 w-full sm:w-60">
          <FilterRangePicker
            onChange={(dateString: string[]) =>
              setBookingDate({
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
                    : "Booking date"}
                </div>
              )
            }
            heading="Booking date"
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
            open={openCreationDateRange}
            onOpen={() => setOpenCreationDateRange?.(!openCreationDateRange)}
            onCancel={() => setOpenCreationDateRange(false)}
            onApply={applyCreationDate}
            title={
              filterState.dueDate?.startDate && (
                <div>
                  {filterState.dueDate
                    ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                    : "Schedule date"}
                </div>
              )
            }
            heading="Schedule date"
          />
        </div>
        <div className="w-full sm:w-40">
          <SelectStatusTypeFilter
            placeholder="Status"
            onChange={(value) => onChangeFields("status", value as string)}
            value={filterState?.status || "Status"}
          />
        </div>
        <div className="w-full sm:w-40">
          <Select
            placeholder="Payment status"
            onChange={(value) => onChangeFields("paymentStatus", value)}
            className="w-full sm:w-50"
            value={filterState?.paymentStatus || "Payment status"}
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
