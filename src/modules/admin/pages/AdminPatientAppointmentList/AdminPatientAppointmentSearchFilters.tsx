import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BookingDate, GetAppointmentInput } from "generated/graphql";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectStatusTypeFilter } from "common/components/SelectStatusTypeFilter/SelectStatusTypeFilter";


type Props = {
  onChange: (value: GetAppointmentInput) => void;
};
function AdminPatientAppointmentSearchFilters({ onChange }: Props) {
  const [filterState, setFilterState] = useState<GetAppointmentInput>({});

  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dueDate, setDueDate] = useState<BookingDate>({});

  const applyDateRange = () => {
    onChangeFields("dueDate", dueDate);
    setOpenDateRange(false);
  };

  function onChangeFields(key: string, value: string | object) {
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
      <div className="flex items-center sm:flex   gap-2 mb-3 flex-wrap">
        <div className=" w-full sm:w-80">
          <Input
            value={filterState.searchString || ""}
            placeholder="Search by ID# or Physician name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        {/* <div className="flex-none sm:flex"> */}
        <div className="w-full sm:w-60 ">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value as string)}
            value={filterState.serviceId || "Appointment type"}
          />
        </div>
        <div className=" w-full sm:w-60">
          <SelectStatusTypeFilter
            //   placeholder="Status"
            onChange={(value) => onChangeFields("status", value as string)}
            value={filterState?.status}
          />
        </div>
        {/* </div> */}
        <div className="-mt-6 w-full sm:w-60">
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
            heading="Appointment date"
            title={
              filterState.dueDate?.startDate ? (
                <div>
                  {filterState.dueDate
                    ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                    : "Creation Date"}
                </div>
              ) : (
                ""
              )
            }
          />
        </div>

        <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}

export default AdminPatientAppointmentSearchFilters;
