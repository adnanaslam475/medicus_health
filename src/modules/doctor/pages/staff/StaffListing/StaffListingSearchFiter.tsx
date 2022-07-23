import React, { useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { physicianFilterType } from "common/types/types";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: physicianFilterType) => void;
};

function StaffListingSearchFilter({ onChange }: Props) {
  const [filterState, setFilterState] = useState<physicianFilterType>({});

  function clear() {
    setFilterState({});
    onChange({});
  }

  const [openDateRange, setOpenDateRange] = useState(false);

  const applyDateRange = () => {
    setOpenDateRange(false);
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
    if (!filters.patientName) {
      delete filters.patientName;
    }
    if (!filters.serviceId) {
      delete filters.serviceId;
    }

    onChange(filters);
  }
  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70">
          <Input
            value={filterState.patientName}
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              onChangeFields("patientName", e.target.value);
            }}
          />
        </div>

        <div className="relative mb-6 pl-2 ">
          <RangePicker
            value={null}
            onChange={(_, dateString: string[]) =>
              onChangeFields("bookingDate", {
                startDate: dateString[0],
                endDate: dateString[1],
              })
            }
            open={openDateRange}
            className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
            renderExtraFooter={() => (
              <div className="flex gap-3 justify-end p-3">
                <Button
                  className="bg-gray-300"
                  onClick={() => {
                    setOpenDateRange(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className=" text-white"
                  type="primary"
                  onClick={() => {
                    applyDateRange();
                  }}
                >
                  Apply
                </Button>
              </div>
            )}
          />
          <Button
            className="flex date-btn"
            block
            type="default"
            onClick={() => setOpenDateRange?.(!openDateRange)}
          >
            {filterState.bookingDate?.startDate ? (
              <div>
                {filterState.bookingDate
                  ? `${filterState.bookingDate.startDate} -> ${filterState.bookingDate.endDate}`
                  : "Account Creation Date"}
              </div>
            ) : (
              <div className="flex justify-between items-center w-full px-3">
                <div>Creation Date</div>
                <div>
                  <CaretDownOutlined style={{ color: `primary` }} />
                </div>
              </div>
            )}
          </Button>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Service"
            className="w-full sm:w-40"
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState.serviceId}
          >
            <Option value="consultation">Consultation</Option>
            <Option value="second opinion">Second opinion</Option>
          </Select>
        </div>
        <Button type="text" className="sm:ml-3" onClick={clear}>
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default StaffListingSearchFilter;
