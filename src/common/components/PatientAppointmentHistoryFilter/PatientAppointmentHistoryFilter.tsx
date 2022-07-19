import React, { useState } from "react";
import { Button, Space, DatePicker, Form, Input } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { BookingDate, GetAppointmentInput } from "generated/graphql";
import _classes from "./PatientAppointmentHistoryFilter.module.scss";
import { SelectServiceTypeFilter } from "../SelectServiceTypeFilter/SelectServiceTypeFilter";
import { SelectPhysicianTypeFilter } from "../SelectPhysicianTypeFilter/SelectPhysicianTypeFilter";
import { calendarFilterIcon } from "utils/images";
import Image from "next/image";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: GetAppointmentInput) => void;
};

function PatientAppointmentHistoryFilter(props: Props) {
  const [filterState, setFilterState] = useState<GetAppointmentInput>({});
  const [bookingDate, setBookingDate] = useState<BookingDate>({});
  const [dueDate, setDueDate] = useState<BookingDate>({});

  const [form] = Form.useForm();
  const { onChange } = props;

  const [openDateRange, setOpenDateRange] = useState(false);
  const [openDateRange1, setOpenDateRange1] = useState(false);

  function clear() {
    setFilterState({});
    onChange({});
    form.resetFields();
  }

  const applyDateRange = () => {
    setOpenDateRange(false);
    onChangeFields("bookingDate", bookingDate);
  };

  const applyDueDate = () => {
    setOpenDateRange1(false);
    onChangeFields("dueDate", dueDate);
  };

  function onChangeFields(key: string, value: string | number | object) {
    const filters = {
      ...filterState,
      [key]: value,
    };
    setFilterState(filters);

    if (!filters?.searchString) {
      delete filters?.searchString;
    }
    if (!filters?.appointmentId) {
      delete filters?.appointmentId;
    }

    if (!filters?.doctorId) {
      delete filters?.doctorId;
    }

    if (!filters?.serviceId) {
      delete filters?.serviceId;
    }

    if (!filters?.bookingDate?.startDate && !filters?.bookingDate?.startDate) {
      delete filters?.bookingDate;
    }

    if (!filters?.dueDate?.startDate && !filters?.dueDate?.startDate) {
      delete filters?.dueDate;
    }

    onChange(filters);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5 flex-wrap`}
    >
      <div className="flex-none sm:flex">
        <div className="mb-2 sm:mb-0  w-full sm:w-full md:w-full lg:w-60 mr-2 sm:mr-0">
          <Input
            placeholder={"Search by ID or physician name"}
            prefix={<SearchOutlined />}
            onChange={(event) =>
              onChangeFields("searchString", String(event.target.value))
            }
            value={filterState?.searchString || undefined}
          />
        </div>
        <div className="sm:mb-0  w-full md:w-44 xl:w-60 mr-3 mb-2 sm:pl-3">
          <SelectPhysicianTypeFilter
            onChange={(value) => onChangeFields("doctorId", value)}
            value={filterState?.doctorId || "Physician"}
          />
        </div>

        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3 mt-3 sm:mt-0 ">
          <SelectServiceTypeFilter
            onChange={(value) => onChangeFields("serviceId", value)}
            value={filterState?.serviceId || "Appointment type"}
          />
        </div>
      </div>
      <div className="flex-none sm:flex">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3 mr-2"
        >
          {/* <div className="flex-none sm:flex flex-wrap"> */}
          <div className="relative">
            <RangePicker
              value={null}
              onChange={(_, dateString: string[]) =>
                setDueDate({
                  startDate: dateString[0],
                  endDate: dateString[1],
                })
              }
              open={openDateRange1}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
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
                    onClick={applyDueDate}
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
              {filterState.dueDate?.startDate ? (
                <div>
                  {filterState.dueDate
                    ? `${filterState.dueDate.startDate} -> ${filterState.dueDate.endDate}`
                    : "Appointment Due Date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div className="flex items-center font-thin">
                    <span className="mr-2 mt-1">
                      <Image
                        width={18}
                        height={18}
                        src={calendarFilterIcon}
                        alt=""
                      />
                    </span>
                    Appointment Due Date
                  </div>
                  <div>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <div className="flex-none sm:flex">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3 mr-2 mt-3 sm:mt-0"
        >
          {/* <div className="flex-none sm:flex flex-wrap"> */}
          <div className="relative">
            <RangePicker
              value={null}
              onChange={(_, dateString: string[]) =>
                setBookingDate({
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
                    : "Booking date"}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full px-3">
                  <div className="flex items-center font-thin">
                    <span className="mr-2 mt-1">
                      <Image
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
              )}
            </Button>
          </div>
        </Space>

        <Button
          onClick={clear}
          type="text"
          className={`${_classes["btn-clear"]} sm:ml-3`}
        >
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1 text-sm">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default PatientAppointmentHistoryFilter;
