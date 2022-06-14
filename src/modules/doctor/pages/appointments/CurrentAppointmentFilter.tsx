import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { cancelledAppointmentFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate } from "generated/graphql";

type Props = {
  onChange: (value: cancelledAppointmentFilterType) => void;
};

function CurrentAppointmentFilter({ onChange }: Props) {
  const [filterState, setFilterState] =
    useState<cancelledAppointmentFilterType>({});
    const [dueDate,setDueDate]=useState<BookingDate>({})


  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("dueDate",dueDate)
  };

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };
    setFilterState(filters);

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
    <div className="page-filters flex-none lg:flex items-center">
       <span className="text-gray-1 mr-3 mb-3">Filter</span>
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70">
          <Input
            value={filterState.searchString}
            placeholder="Search by ID or physician name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <FilterRangePicker
          onChange={(dateString: string[]) =>
            setDueDate({
              startDate: dateString[0],
              endDate: dateString[1],
            })
          }
          open={openDateRange}
          onOpen={() => setOpenDateRange?.(!openDateRange)}
          onCancel={() => setOpenDateRange(false)}
          onApply={applyDateRange}
          title={
            filterState.dueDate?.startDate ? (
              <div>
                {filterState.dueDate
                  ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                  : "Date"}
              </div>
            ) : (
              ""
            )
          }
          heading="Date"
        />
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
          />
        </div>
        <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}

export default CurrentAppointmentFilter;
