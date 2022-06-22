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

type Props = {
  onChange: (value: GetAdminUsersFilterInput) => void;
  filterValues: GetAppointmentInput;
};

function AdminAppointmentFilter({ onChange, filterValues }: Props) {
  const [openDateRange, setOpenDateRange] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [dueDate, setDueDate] = useState<BookingDate>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [creationDate, setCreationDate] = useState<BookingDate>({});

  // useDebounce(
  //   (e: any) => {
  //     console.log("eee", e);
  //     onChangeFields("searchString", search);
  //   },
  //   500,
  //   [search]
  // );

  console.log(filterValues, "filterValuesfilterValues");

  function clear() {
    onChange({});
  }

  const applyDateRange = (status: string) => {
    switch (status) {
      case "creationDate":
        setOpenDateRange("");
        onChangeFields("bookingDate", creationDate);
        break;
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
    console.log(filters, "myfilters");
    if (!filters.bookingDate?.startDate && !filters.bookingDate?.endDate) {
      delete filters.bookingDate;
    }
    if (!filters.dueDate?.startDate && !filters.dueDate?.endDate) {
      delete filters.bookingDate;
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
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0 flex-wrap">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:max-w-[400px]">
          <Input
            value={filterValues.searchString as string}
            placeholder="Search by ID, physician name or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("searchString", e.target.value);
            }}
            // className={`${_classes["mobile-tabs"]} bg-gray-4`}
          />
        </div>
        <div className="flex-none sm:flex">
          <div className="lg:ml-3 mt-3 sm:mt-0">
            <SelectServiceTypeFilter
              onChange={(value) => onChangeFields("serviceId", value)}
              value={filterValues.serviceId as number}
            />
          </div>
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
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
                    : "Creation Date"}
                </div>
              )
            }
            heading="Booking Date"
          />
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
          <FilterRangePicker
            onChange={(dateString: string[]) =>
              setDueDate({
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === UPCOMING}
            onOpen={() => setOpenDateRange(UPCOMING)}
            onCancel={() => setOpenDateRange("")}
            onApply={() => applyDateRange("dueDate")}
            title={
              filterValues?.dueDate?.startDate ? (
                <div>
                  {filterValues.dueDate
                    ? `${filterValues.dueDate.startDate} -> ${filterValues.dueDate.endDate}`
                    : "Creation Date"}
                </div>
              ) : (
                ""
              )
            }
            heading="Confirmation Date"
          />
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
          <FilterRangePicker // not working yet
            onChange={(dateString: string[]) =>
              setCreationDate({
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === SCHEDULED}
            onOpen={() => setOpenDateRange(SCHEDULED)}
            onCancel={() => setOpenDateRange("")}
            onApply={() => applyDateRange("creationDate")}
            title={
              filterValues.bookingDate?.startDate && (
                <div>
                  {filterValues.bookingDate
                    ? `${filterValues.bookingDate.startDate} -> ${filterValues.bookingDate.endDate}`
                    : "Creation Date"}
                </div>
              )
            }
            heading="Scheduled Date"
          />
        </div>

        <div className="lg:ml-3 sm:mt-0">
          <SelectStatusTypeFilter
            placeholder="Appointment Status"
            onChange={(value) => onChangeFields("status", value as string)}
            value={filterValues.status}
          />
        </div>
        <div className="lg:ml-3 sm:mt-0">
          <Select
            placeholder="Payment Status"
            onChange={(value) => onChangeFields("paymentStatus", value)}
            className="w-full sm:w-50"
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

export default AdminAppointmentFilter;
