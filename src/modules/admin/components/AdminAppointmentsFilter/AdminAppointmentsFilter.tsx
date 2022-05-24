import React from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  BOOKING,
  CONFIRMED,
  SCHEDULED,
  UPCOMING,
} from "common/constants/status";
import {
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

  function clear() {
    onChange({});
  }

  const applyDateRange = () => {
    setOpenDateRange("");
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
  const handleSearchChange = (event: any) =>
    onChangeFields("searchString", event.target.value);
  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0 flex-wrap">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:max-w-[400px]">
          <Input
            value={filterValues.searchString as string}
            placeholder="Search by ID, physician name or patient name"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
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
              onChangeFields("bookingDate", {
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === BOOKING}
            onOpen={() => setOpenDateRange(BOOKING)}
            onCancel={() => setOpenDateRange("")}
            onApply={applyDateRange}
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
              onChangeFields("dueDate", {
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === CONFIRMED}
            onOpen={() => setOpenDateRange(CONFIRMED)}
            onCancel={() => setOpenDateRange("")}
            onApply={applyDateRange}
            title={
              filterValues.dueDate?.startDate && (
                <div>
                  {filterValues.dueDate
                    ? `${filterValues.dueDate.startDate} -> ${filterValues.dueDate.endDate}`
                    : "Creation Date"}
                </div>
              )
            }
            heading="Confirmation Date"
          />
        </div>
        <div className="w-full sm:w-full md:w-full lg:max-w-[200px]">
          <FilterRangePicker // not working yet
            onChange={(dateString: string[]) =>
              onChangeFields("", {
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange === SCHEDULED}
            onOpen={() => setOpenDateRange(SCHEDULED)}
            onCancel={() => setOpenDateRange("")}
            onApply={applyDateRange}
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
            placeHolder="Appointment Status"
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
