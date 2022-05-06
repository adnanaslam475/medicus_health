import React, { useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { getDateInFormat } from "../../../../common/utils/date";
const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

function onChange(date: any, dateString: any) {
  console.log(date, dateString);
}

function UpcomingAppointmentFilter() {
  const [dateRangeValues, selectDateRangeValues] = useState(null);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dateRange, selectDateRange] = useState(null);
  const applyDateRange = () => {
    setOpenDateRange(false);
  };

  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      {/* <span className="text-gray-1">Filter</span> */}
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70">
          <Input
            placeholder="Search by ID or physician name"
            prefix={<SearchOutlined />}
          />
        </div>

        <div className="relative mb-6 pl-2 ">
          <RangePicker
            value={dateRangeValues}
            onChange={onChange}
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
            {dateRange ? (
              <div>
                {dateRange
                  ? `${getDateInFormat(dateRange?.[0])} -> ${getDateInFormat(
                      dateRange?.[1]
                    )}`
                  : "Creation Date"}
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
          <Select placeholder="Service" className="w-full sm:w-40">
            <Option value="First Consultation">English</Option>
            <Option value="Second Opinion">Espanol</Option>
          </Select>
        </div>
        <Button type="text" className="sm:ml-3">
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default UpcomingAppointmentFilter;
