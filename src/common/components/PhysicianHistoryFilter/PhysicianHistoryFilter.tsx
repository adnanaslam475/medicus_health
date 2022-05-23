import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  GetAppointmentInput,
  useGetAllAppointmentServiceTypesQuery,
} from "generated/graphql";
import { getDateInFormat } from "../../utils/date";
import _classes from "./PhysicianHistoryFilters.module.scss";
import searchStyle from "./style.module.scss";
import { DateType } from "common/types/types";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (e: GetAppointmentInput) => void;
};

function PhysicianSearchFilters(props: Props) {
  const [filterState, setFilterState] = useState<GetAppointmentInput>({});

  const { onChange } = props;

  const [openDateRange1, setOpenDateRange1] = useState(false);
  const [openDateRange2, setOpenDateRange2] = useState(false);

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function onClear() {
    setFilterState({});
    onChange({});
  }

  const applyDateRange = () => {
    setOpenDateRange1(false);
  };

  function onFilterValuesChange(
    key: string,
    value: string | number | DateType
  ) {
    const filters = {
      ...filterState,
      [key]: value,
    };

    setFilterState(filters);
    onChange(filters);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5`}
    >
      <span className="text-gray-1 mr-3 mb-3">Filter</span>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70 mr-2">
          <Input
            value={filterState.searchString || ""}
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
            onChange={(e) =>
              onFilterValuesChange("searchPatient", e.target.value)
            }
          />
        </div>

        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3">
          <Select
            placeholder="Service"
            className={`${searchStyle.placeholderColor} w-full`}
            onChange={(e) => onFilterValuesChange("serviceId", e)}
            value={filterState.serviceId || "Service"}
          >
            {appointmentServiceTypes?.map((item) => (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3">
          <Select
            placeholder="Payment Status"
            className={`${searchStyle.placeholderColor} w-full`}
            onChange={(e) => onFilterValuesChange("paymentStatus", e)}
            value={filterState.paymentStatus}
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="unpaid">UnPaid</Select.Option>
          </Select>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              value={null}
              open={openDateRange1}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              onChange={(_, dateString: string[]) =>
                onFilterValuesChange("bookingDate", {
                  startDate: dateString[0],
                  endDate: dateString[1],
                })
              }
              renderExtraFooter={() => (
                <div className="flex gap-3 justify-end p-3">
                  <Button
                    className="bg-gray-300"
                    onClick={() => {
                      setOpenDateRange1(false);
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
              onClick={() => setOpenDateRange1?.(!openDateRange1)}
            >
              {filterState?.bookingDate?.endDate ? (
                <div>
                  {filterState?.bookingDate?.endDate
                    ? `${getDateInFormat(
                        filterState?.bookingDate?.startDate
                      )} -> ${getDateInFormat(
                        filterState?.bookingDate?.endDate
                      )}`
                    : "Booking Date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div>Booking Date</div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <div className="flex-none sm:flex ml-2">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              value={null}
              open={openDateRange2}
              onChange={(_, dateString: string[]) =>
                onFilterValuesChange("dueDate", {
                  startDate: dateString[0],
                  endDate: dateString[1],
                })
              }
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              renderExtraFooter={() => (
                <div className="flex gap-3 justify-end p-3">
                  <Button
                    className="bg-gray-300"
                    onClick={() => {
                      setOpenDateRange2(false);
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
              onClick={() => setOpenDateRange2?.(!openDateRange2)}
            >
              {filterState?.dueDate?.endDate ? (
                <div>
                  {filterState?.dueDate?.endDate
                    ? `${getDateInFormat(
                        filterState.dueDate.startDate
                      )} -> ${getDateInFormat(filterState.dueDate.endDate)}`
                    : "Due Date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div>Due Date</div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>

      <Button
        onClick={onClear}
        type="text"
        className={`${_classes["btn-clear"]} sm:ml-3`}
      >
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1 text-sm">Clear</span>
      </Button>
    </div>
  );
}

export default PhysicianSearchFilters;
