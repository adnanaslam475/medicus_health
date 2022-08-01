import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { BookingDate } from "generated/graphql";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: physicianFilterType) => void;
};

+initTranslation(["SearchFilters"]);
function UpcomingAppointmentFilter({ onChange }: Props) {
  const [filterState, setFilterState] = useState<physicianFilterType>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  function clear() {
    setFilterState({});
    onChange({});
  }

  i18next.changeLanguage(useLocale());
  const t = i18next.t;

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
      <span className="text-gray-1  w-full 2xl:w-fit mr-0 mb-3 2xl:mr-3">
        {t("search_by")}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <div className=" w-full sm:w-full md:w-64 ">
          <Input
            value={filterState.searchString}
            placeholder="ID# or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full sm:w-60 ">
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
                    : "Date"}
                </div>
              )
            }
            heading="Appointment date"
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

export default UpcomingAppointmentFilter;
