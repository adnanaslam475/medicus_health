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
import { useTranslations } from "next-intl";

const { RangePicker } = DatePicker;

type Props = {
  onChange: (value: GetAppointmentInput) => void;
};

function PatientAppointmentHistoryFilter(props: Props) {
  const t = useTranslations("HistoryAppointments");

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
      className={`${_classes["page-filters"]} flex flex-col sm:flex-row items-center mb-5 flex-wrap gap-2`}
    >
      {/* <div className="w-full sm:w-fit flex flex-col sm:flex-row items-center gap-2"> */}
      <span className="text-gray-1  w-full 2xl:w-fit mr-0 mb-3 2xl:mr-3">
        {t("search_by")}
        {/* Search by */}
      </span>
      <div className=" w-full lg:w-60 ">
        <Input
          placeholder={t("id_or_physician_name")}
          prefix={<SearchOutlined />}
          onChange={(event) =>
            onChangeFields("searchString", String(event.target.value))
          }
          value={filterState?.searchString || undefined}
        />
      </div>
      {/* <div className="w-full md:w-44 xl:w-60">
          <SelectPhysicianTypeFilter
            onChange={(value) => onChangeFields("doctorId", value)}
            value={filterState?.doctorId || t("physician")}
          />
        </div> */}

      <div className="w-full md:w-44 xl:w-60 ">
        <SelectServiceTypeFilter
          onChange={(value) => onChangeFields("serviceId", value)}
          value={filterState?.serviceId || t("appointment_type")}
        />
      </div>
      {/* </div> */}
      <div className="w-full md:w-60 xl:w-60  flex flex-col sm:flex-row gap-2">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-60 xl:w-60  "
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
                    {/* {t("cancel")} */}
                    Cancel
                  </Button>
                  <Button
                    className=" text-white"
                    type="primary"
                    onClick={applyDueDate}
                  >
                    Apply
                    {/* {t("apply")} */}
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
                    : t("appointment_date")}
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
                    {t("appointment_date")}
                    {/* Appointment date */}
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
          className="w-full md:w-44 xl:w-60 "
        >
          {/* <div className="flex-none sm:flex flex-wrap"> */}
          {/* <div className="relative">
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
          </div> */}
        </Space>
      </div>
      <Button
        onClick={clear}
        type="text"
        className={`${_classes["btn-clear"]} mr-auto `}
      >
        <CloseOutlined className="text-sm" />
        <span className="text-gray-1 text-sm">{t("clear")}</span>
      </Button>
    </div>
  );
}

export default PatientAppointmentHistoryFilter;
