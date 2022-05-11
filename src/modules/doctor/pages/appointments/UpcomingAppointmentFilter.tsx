import React, { Dispatch, SetStateAction, useState } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const { RangePicker } = DatePicker;

type Props = {
  setIdOrName: (e: any) => void;
  setServiceType: (e: any) => any;
  setCreationDate: (e: string[]) => void;
  clearFilter: () => void;
  idOrName: string | number | undefined;
  serviceType: string | number | undefined;
  creationDate: string[];
};

function UpcomingAppointmentFilter({
  setIdOrName,
  setCreationDate,
  setServiceType,
  clearFilter,
  idOrName,
  serviceType,
  creationDate,
}: Props) {
  const [openDateRange, setOpenDateRange] = useState(false);
  const applyDateRange = () => {
    setOpenDateRange(false);
  };

  function onChange(date: any, dateString: string[]) {
    setCreationDate(dateString);
  }
  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <div className="flex items-center sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70">
          <Input
            placeholder="Search by ID or physician name"
            prefix={<SearchOutlined />}
            value={idOrName}
            onChange={(e) => setIdOrName(e.target.value)}
          />
        </div>

        <div className="relative mb-6 pl-2 ">
          <RangePicker
            value={null}
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
            {creationDate.length ? (
              <div>
                {creationDate
                  ? `${creationDate[0]} -> ${creationDate[1]}`
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
          <Select
            placeholder="Service"
            className="w-full sm:w-40"
            onChange={(value) => setServiceType(String(value))}
            value={serviceType || "Service"}
          >
            <Option value="consultation">Consultation</Option>
            <Option value="second opinion">Second Opinion</Option>
          </Select>
        </div>
        <Button type="text" className="sm:ml-3" onClick={() => clearFilter()}>
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default UpcomingAppointmentFilter;
