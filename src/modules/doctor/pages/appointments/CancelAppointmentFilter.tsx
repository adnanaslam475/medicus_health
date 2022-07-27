import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { cancelledAppointmentFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate } from "generated/graphql";
import { useTranslations } from "next-intl";

type Props = {
  onChange: (value: cancelledAppointmentFilterType) => void;
};

function CanncelledAppointmentFilter({ onChange }: Props) {
  const t = useTranslations("UpcomingAppointments");
  const [filterState, setFilterState] =
    useState<cancelledAppointmentFilterType>({});
  const [dueDate, setDueDate] = useState<BookingDate>({});

  function clear() {
    setFilterState({});
    onChange({});
  }
  const [openDateRange, setOpenDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("dueDate", dueDate);
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
    <div className="page-filters  items-center mb-4 flex-wrap">
 <span className="text-gray-1  w-full 2xl:w-fit mr-0 mb-3 2xl:mr-3">Search by</span>
      <div className="flex items-center sm:mb-0 lg:mb-0 gap-2 flex-col sm:flex-row flex-wrap">
        <div className="w-full sm:w-full md:w-full lg:w-96">
          <Input
            value={filterState.searchString}
            placeholder="ID# or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <div className="-mt-6 w-full sm:w-60">
          <Space className="w-full sm:w-60">
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
                      : "Appointment date"}
                  </div>
                ) : (
                  ""
                )
              }
              heading="Appointment date"
            />
          </Space>
        </div>

        <div className="w-full sm:w-60">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
          />
        </div>
        <div className="flex w-full md:w-44 xl:w-60 mr-3">
          <Select
            placeholder="Payment status"
            onChange={(e) => onChangeFields("paymentStatus", e)}
            value={filterState.paymentStatus}
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="unpaid">Unpaid</Select.Option>
            <Select.Option value="refunded">Refunded</Select.Option>
          </Select>
          <FilterClearButton onClear={clear} />
        </div>
      </div>
    </div>
  );
}

export default CanncelledAppointmentFilter;
