import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import {
  GetAppointmentInput,
  useGetAllAppointmentServiceTypesQuery,
} from "generated/graphql";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";

const { Option } = Select;

type Props = {
  onChange: (value: GetAppointmentInput) => void;
};
function AdminPhysicianPatientAppointmentSearchFilters({ onChange }: Props) {
  const [filterState, setFilterState] = useState<GetAppointmentInput>({});

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
      <div className="flex items-center sm:flex  lg:mb-0">
        <div className="w-full sm:w-full md:w-full lg:w-70">
          <Input
            value={filterState.searchString || undefined}
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <FilterRangePicker
          onChange={(dateString: string[]) =>
            onChangeFields("dueDate", {
              startDate: dateString[0],
              endDate: dateString[1],
            })
          }
          open={openDateRange}
          onOpen={() => setOpenDateRange?.(!openDateRange)}
          onCancel={() => setOpenDateRange(false)}
          onApply={applyDateRange}
          heading="Appointment Date"
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
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 sm:mt-0">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value as string)}
            value={filterState.serviceId || undefined}
          />
        </div>

        <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}

export default AdminPhysicianPatientAppointmentSearchFilters;
