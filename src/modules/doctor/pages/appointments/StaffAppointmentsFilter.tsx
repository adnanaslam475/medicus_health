import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { GetStaffFilter } from "generated/graphql";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: GetStaffFilter) => void;
};
function StaffAppointmentsFilter({ onChange }: Props) {
  const [filterState, setFilterState] = useState<GetStaffFilter>({});

  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
  };

  function onChangeFields(key: string, value: string | object | boolean) {
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
    // if (!filters.status) {
    //   delete filters.status;
    // }
    onChange(filters);
  }
  return (
    <div className="page-filters flex-none lg:flex items-center">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
        <div className="w-full sm:w-full md:w-full lg:w-70">
          <Input
            value={filterState.searchString || ""}
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <FilterRangePicker
          onChange={(dateString: string[]) =>
            onChangeFields("CreationDate", {
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
                  : "Creation Date"}
              </div>
            )
          }
          heading="Creation Date"
        />
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Status"
            className="w-full sm:w-40"
            onChange={(value) => onChangeFields("status", value)}
            value={filterState.status}
          >
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Disabled</Select.Option>
          </Select>
        </div>
        <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}
export default StaffAppointmentsFilter;
