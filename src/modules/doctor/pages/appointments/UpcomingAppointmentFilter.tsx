import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate } from "generated/graphql";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: physicianFilterType) => void;
};
function UpcomingAppointmentFilter({ onChange }: Props) {
  const [filterState, setFilterState] = useState<physicianFilterType>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("bookingDate", bookingDate);
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
    <div className="page-filters flex items-center my-3 flex-wrap">
      <span className="text-gray-1 mr-3">Filter</span>
      <div className="flex items-center gap-2 flex-wrap">
        <div className=" w-full sm:w-full md:w-64 ">
          <Input
            value={filterState.searchString}
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
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
                  : "Date"}
              </div>
            )
          }
          heading="Due Date"
        />
        </div>
     
      <div className="flex w-full sm:w-60 ">
        
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
          />
        
        <FilterClearButton onClear={clear} />
      </div>
      </div>
    </div>
  );
}

export default UpcomingAppointmentFilter;
