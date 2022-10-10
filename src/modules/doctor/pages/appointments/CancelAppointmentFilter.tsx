import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { cancelledAppointmentFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate } from "generated/graphql";
import { useTranslations } from "next-intl";
import _classes from "./CancelAppointmentFilters.module.scss";

type Props = {
  onChange: (value: cancelledAppointmentFilterType) => void;
};

function CanncelledAppointmentFilter({ onChange }: Props) {
  const t = useTranslations("Common");
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
    <div
      className={`${_classes["page-filters-parent"]} page-filters flex lg:flex items-start mb-5 flex-col sm:flex-col md:flex-col lg:flex-row`}
    >
      <div className="flex items-start sm:flex-none w-auto text-gray-1 2xl:w-auto mr-0 mb-3 sm:mb-0 lg:mt-3 lg:mr-3 xl:mr-3 2xl:mr-3 md:mb-3">
        Search by
      </div>

      <div className="flex w-full lg:mb-0 flex-wrap gap-2">
        <div className="flex w-full md:w-72 lg:w-72 xl:w-96 ">
          <Input
            value={filterState.searchString}
            placeholder="ID# or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
            className={`${_classes["line-height-searchIcon"]} `}
          />
        </div>
        <div className="w-full sm:w-60">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId}
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
              // heading="Appointment date"
              heading={t("appointment_date")}
            />
          </Space>
        </div>
        <div className="flex w-full md:w-44 xl:w-60 mr-0">
          <Select
            placeholder="Payment status"
            onChange={(e) => onChangeFields("paymentStatus", e)}
            value={filterState.paymentStatus}
            className="w-96"
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="unpaid">Unpaid</Select.Option>
            <Select.Option value="refunded">Refunded</Select.Option>
          </Select>
        </div>
        <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}

export default CanncelledAppointmentFilter;
