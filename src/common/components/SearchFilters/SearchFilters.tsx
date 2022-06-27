import React, { useEffect, useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker, Form } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  BookingDate,
  useDoctorProfilesQuery,
  useGetAllAppointmentServiceTypesQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import Image from "next/image";
import { calendarFilterIcon } from "../../../utils/images";
import { getDateInFormat } from "../../utils/date";
import _classes from "./SearchFilters.module.scss";

const { Option } = Select;

function handleChange(value: any) {}

const { RangePicker } = DatePicker;

type Props = {
  setDataListPhysician: string | any;
  placeholder?: string;
  setDoctorId: number | any;
  setAppointmentId: number | any;
  setServiceIds: number | any;
  setStartDate: Date | null | any;
  setEndDate: Date | null | any;
  isFromPhysician?: boolean | null | any;
  setSearchPatient?: string | any;
  setBookingDate?: React.Dispatch<React.SetStateAction<BookingDate>>;
};

function SearchFilters(props: Props) {
  const {
    setServiceIds,
    setDoctorId,
    setEndDate,
    placeholder,
    setStartDate,
    setSearchPatient,
    isFromPhysician,
    setAppointmentId,
    setBookingDate,
  } = props;
  const [selectedPhysicianItems, setSelectedPhysicianItems] = useState<
    string | null
  >();
  const [selectedServiceItems, setSelectedServiceItems] = useState<
    string | null
  >();
  const [dateRangeValues, selectDateRangeValues] = useState(null);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dateRange, selectDateRange] = useState(null);
  const [patientName, setPatientName] = useState<string>();
  const [localAppointment_Id, setLocalAppointment_Id] = useState<
    number | null | undefined
  >();
  const [dateRangeState, setDateRangeState] = useState<BookingDate>({});

  const [{ data: dataList }] = useDoctorProfilesQuery();
  const { doctorProfiles } = dataList || {};

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  function handleAppointmentId(event: React.ChangeEvent<HTMLInputElement>) {
    setAppointmentId(Number(event.target.value));
    setLocalAppointment_Id(Number(event.target.value));
  }

  function handlePaitentName_ID(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchPatient(event.target.value);
    setPatientName(event.target.value);
  }

  const handlePhysicianChange = (selectedItem: any, name: any) => {
    setSelectedPhysicianItems(name.children);
    setDoctorId(selectedItem);
  };

  const handleServiceChange = (selectedItem: any, name: any) => {
    setSelectedServiceItems(name.children);
    setServiceIds(selectedItem);
  };

  function onChange(date: any, dateString: any) {
    selectDateRangeValues(date);
    selectDateRange(date);
    setDateRangeState({
      startDate: dateString[0],
      endDate: dateString[1],
    });
  }

  const onClear = () => {
    setSelectedPhysicianItems(null);
    setSelectedServiceItems(null);
    setDoctorId(undefined);
    setServiceIds(undefined);
    selectDateRangeValues(null);
    setEndDate(null);
    setStartDate(null);
    setOpenDateRange(false);
    selectDateRange(null);
    setPatientName("");
    setSearchPatient && setSearchPatient(null);
    setAppointmentId(undefined);
    setLocalAppointment_Id(null);
    setBookingDate?.({});
  };
  const applyDateRange = () => {
    setOpenDateRange(false);
    setBookingDate?.(dateRangeState);
  };

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5 flex-wrap`}
    >
      <span className="text-gray-1 mr-3 mb-3 w-full 2xl:w-fit">Filter</span>
      <div className="flex-none sm:flex">
        <div className="mb-2 sm:mb-0  w-full sm:w-full md:w-full lg:w-60 mr-2 sm:mr-0">
          <Input
            placeholder={"Search by ID"}
            prefix={<SearchOutlined />}
            onChange={(event) => handleAppointmentId(event)}
            value={localAppointment_Id || undefined}
            type="number"
          />
        </div>
        {isFromPhysician ? (
          <div className="sm:mb-0 mb:2 sm:ml-2 lg:ml-3 w-full sm:w-full md:w-full lg:w-70 mr-2">
            <Input
              placeholder={placeholder || "Search by ID or patient name"}
              prefix={<SearchOutlined />}
              onChange={(event) => handlePaitentName_ID(event)}
              value={patientName}
            />
          </div>
        ) : (
          <div className=" sm:mb-0  w-full md:w-44 xl:w-60 mr-3 mb-2 sm:pl-3">
            <Select
              placeholder="Physician"
              className={`${searchStyle.placeholderColor} w-full`}
              onChange={handlePhysicianChange}
              value={selectedPhysicianItems}
            >
              {doctorProfiles?.map((item) => (
                <Select.Option key={item?.doctor_id} value={item?.doctor_id}>
                  {item?.user?.first_name}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}

        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3 mt-3 sm:mt-0">
          <Select
            suffixIcon={
              <div className="text-gray">
                <CaretDownOutlined className="text-sm text-gray" />
              </div>
            }
            placeholder="Appointment Type"
            className={`${searchStyle.placeholderColor} w-full`}
            onChange={handleServiceChange}
            value={selectedServiceItems}
          >
            {appointmentServiceTypes?.map((item) => (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-60 xl:w-60 sm:mb-3"
        >
          <div className="relative">
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
                    : "Date"}
                </div>
              ) : (
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
                    Date
                  </div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
          {/* <DatePicker onChange={onChange} /> */}
        </Space>
        <Button
          onClick={onClear}
          type="text"
          className={`${_classes["btn-clear"]} sm:ml-3`}
        >
          <CloseOutlined className="text-sm mb-0.5" />
          <span className="text-gray-1 text-sm">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchFilters;
