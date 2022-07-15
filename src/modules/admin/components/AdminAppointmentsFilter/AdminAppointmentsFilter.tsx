import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BOOKING, UPCOMING, SCHEDULED } from "common/constants/status";
import {
  BookingDate,
  GetAdminUsersFilterInput,
  GetAppointmentInput,
} from "generated/graphql";
import { SelectServiceTypeFilter } from "common/components/SelectServiceTypeFilter/SelectServiceTypeFilter";
import { FilterRangePicker } from "common/components/FilterRangePicker/FilterRangePicker";
import { FilterClearButton } from "common/components/FilterClearButton/FilterClearButton";
import { SelectStatusTypeFilter } from "common/components/SelectStatusTypeFilter/SelectStatusTypeFilter";
import { getRole } from "common/utils/userData";

type Props = {
  onChange: (value: GetAdminUsersFilterInput) => void;
  filterValues: GetAppointmentInput;
};

function AdminAppointmentFilter({ onChange, filterValues }: Props) {
  const [openDateRange, setOpenDateRange] = React.useState<string>("");
  const [dueDate, setDueDate] = useState<BookingDate>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});

  function clear() {
    onChange({});
  }

  const applyDateRange = (status: string) => {
    switch (status) {
      case "bookingDate":
        setOpenDateRange("");
        onChangeFields("bookingDate", bookingDate);
        break;
      case "dueDate":
        setOpenDateRange("");
        onChangeFields("dueDate", dueDate);

      default:
        break;
    }
  };

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterValues,
      [key]: value,
    };
    if (!filters.bookingDate?.startDate && !filters.bookingDate?.endDate) {
      delete filters.bookingDate;
    }
    if (!filters.dueDate?.startDate && !filters.dueDate?.endDate) {
      delete filters.dueDate;
    }
    if (!filters.searchString) {
      delete filters.searchString;
    }
    if (!filters.paymentStatus) {
      delete filters.paymentStatus;
    }
    if (!filters.serviceId) {
      delete filters.serviceId;
    }

    if (!filters.status) {
      delete filters.status;
    }
    onChange(filters);
  }

  return (
    <div className="page-filters flex-none lg:flex items-center mb-5 flex-wrap">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0 flex-wrap gap-2">
        <div className=" w-full sm:w-full md:w-full lg:max-w-[400px] mb-2 sm:mb-0">
          <Input
            value={filterValues.searchString as string}
            placeholder="Search by ID, physician name or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
            className={`text-sm font-rubik`}
          />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row  sm:w-60">
          <div className="w-full sm:mt-0">
            <SelectServiceTypeFilter
              onChange={(value) => onChangeFields("serviceId", value)}
              value={filterValues.serviceId as number}
            />
          </div>
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px] text-sm font-rubik -mt-6">
          <FilterRangePicker
            onChange={(dateString: string[]) =>
              setBookingDate({
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === BOOKING}
            onOpen={() => setOpenDateRange(BOOKING)}
            onCancel={() => setOpenDateRange("")}
            onApply={() => applyDateRange("bookingDate")}
            title={
              filterValues.bookingDate?.startDate && (
                <div>
                  {filterValues.bookingDate
                    ? `${filterValues.bookingDate.startDate} -> ${filterValues.bookingDate.endDate}`
                    : "Booking date"}
                </div>
              )
            }
            heading="Booking date"
          />
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px] -mt-6">
          <FilterRangePicker
            onChange={(dateString: string[]) =>
              setDueDate({
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === SCHEDULED}
            onOpen={() => setOpenDateRange(SCHEDULED)}
            onCancel={() => setOpenDateRange("")}
            onApply={() => applyDateRange("dueDate")}
            title={
              filterValues.dueDate?.startDate && (
                <div>
                  {filterValues.dueDate
                    ? `${filterValues.dueDate.startDate} -> ${filterValues.dueDate.endDate}`
                    : "Due Date"}
                </div>
              )
            }
            heading="Due Date"
          />
        </div>

        {getRole() === "Admin" && (
          <div className="w-full lg:max-w-[200px] sm:mt-0   flex flex-col sm:flex-row">
            <SelectStatusTypeFilter
              placeholder="Appointment Status"
              onChange={(value) => onChangeFields("status", value as string)}
              value={filterValues.status}
              isAdminFilter={true}
            />
          </div>
        )}
        <div className=" sm:mt-0 flex-1 flex flex-col sm:flex-row lg:max-w-[200px]">
          <Select
            placeholder="Payment Status"
            onChange={(value) => onChangeFields("paymentStatus", value)}
            className="w-full sm:w-50 text-sm font-rubik text-grey"
          >
            <Select.Option value="paid">PAID</Select.Option>
            <Select.Option value="unpaid">UNPAID</Select.Option>
            <Select.Option value="refunded">REFUNDED</Select.Option>
          </Select>
        </div>
       
      <FilterClearButton onClear={clear} />
      </div>
    </div>
  );
}

export default AdminAppointmentFilter;
