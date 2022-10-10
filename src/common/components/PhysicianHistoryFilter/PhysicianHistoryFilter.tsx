import React, { useState } from "react";
import { Input, Button, Select, Space, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  BookingDate,
  GetAppointmentInput,
  useGetAllAppointmentServiceTypesQuery,
} from "generated/graphql";
import { getDateInFormat } from "../../utils/date";
import _classes from "./PhysicianHistoryFilters.module.scss";
import searchStyle from "./style.module.scss";
import { DateType } from "common/types/types";
import Image from "next/image";
import { calendarFilterIcon } from "utils/images";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (e: GetAppointmentInput) => void;
};

function PhysicianSearchFilters(props: Props) {
  const [filterState, setFilterState] = useState<GetAppointmentInput>({});

  const { onChange } = props;

  const [openDateRange1, setOpenDateRange1] = useState(false);
  const [openDateRange2, setOpenDateRange2] = useState(false);
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dueDate, setDueDate] = useState<BookingDate>({});

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function onClear() {
    setFilterState({});
    onChange({});
  }

  const applyBookingDateRange = () => {
    setOpenDateRange1(false);
    onFilterValuesChange("bookingDate", bookingDate);
  };

  const applyDueDateRange = () => {
    setOpenDateRange2(false);
    onFilterValuesChange("dueDate", dueDate);
  };

  function onFilterValuesChange(
    key: string,
    value: string | number | DateType | BookingDate
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
      className={`${_classes["page-filters"]} flex flex-col md:flex-row items-center  flex-wrap space-2 gap-2 mb-3`}
    >
      <span className="text-gray-1  w-full 2xl:w-fit ">Search by</span>
      {/* <div className="flex flex-col w-full lg:w-96 md:flex-row gap-2"> */}
      <div className="w-full  md:w-full lg:w-96 ">
        <Input
          value={filterState.searchString || ""}
          placeholder="ID# or patient name"
          prefix={<SearchOutlined />}
          onChange={(e) => onFilterValuesChange("searchString", e.target.value)}
        />
      </div>

      <div className="w-full md:w-44 xl:w-60">
        <Select
          placeholder="Appointment type"
          className={`${searchStyle.placeholderColor} w-full`}
          onChange={(e) => onFilterValuesChange("serviceId", e)}
          value={filterState.serviceId || "Appointment type"}
        >
          {appointmentServiceTypes?.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* </div> */}
      {/* <div className="flex-none sm:flex">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-56 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              value={null}
              open={openDateRange1}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              onChange={(_, dateString: string[]) =>
                setBookingDate({
                  startDate: String(dateString[0]),
                  endDate: String(dateString[1]),
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
                    onClick={applyBookingDateRange}
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
                    : "Booking date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-between items-center w-full px-3">
                    <div className="flex items-center font-thin">
                      <span className="mr-2 mt-1">
                        <Image
                          priority={true}
                          width={18}
                          height={18}
                          src={calendarFilterIcon}
                          alt=""
                        />
                      </span>
                      Booking date
                    </div>
                    <div>
                      <CaretDownOutlined />
                    </div>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div> */}
      <div className="w-full md:w-fit flex-col sm:flex-row flex space-2 gap-2">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-60 xl:w-60   "
        >
          <div className="relative">
            <RangePicker
              value={null}
              open={openDateRange2}
              onChange={(_, dateString: string[]) =>
                setDueDate({
                  startDate: dateString[0],
                  endDate: dateString[1],
                })
              }
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              renderExtraFooter={() => (
                <div className="flex space-3 gap-3 justify-end p-3">
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
                    onClick={applyDueDateRange}
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
                    : "Appointment date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full ">
                  <div className="flex justify-between items-center w-full px-3">
                    <div className="flex items-center font-thin">
                      <span className="mr-2 mt-1">
                        <Image
                          priority={true}
                          width={18}
                          height={18}
                          src={calendarFilterIcon}
                          alt=""
                        />
                      </span>
                      <span className="font-normal font-rubik">
                        Appointment date
                      </span>
                    </div>
                    <div>
                      <CaretDownOutlined />
                    </div>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <div className="w-full md:w-44 xl:w-60">
        <Select
          placeholder="Payment status"
          className={`${searchStyle.placeholderColor} w-full`}
          onChange={(e) => onFilterValuesChange("paymentStatus", e)}
          value={filterState.paymentStatus}
        >
          <Select.Option value="paid">Paid</Select.Option>
          <Select.Option value="unpaid">Unpaid</Select.Option>
        </Select>
      </div>
      <div className="flex w-full md:w-44 xl:w-60 mr-0">
        <Button
          onClick={onClear}
          type="text"
          className={`${_classes["btn-clear"]} `}
        >
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1 text-sm">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default PhysicianSearchFilters;
