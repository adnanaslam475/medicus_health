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
  setDueDate?: React.Dispatch<React.SetStateAction<BookingDate>>;
  setClearFilter?: React.Dispatch<React.SetStateAction<boolean>>;
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
    setDueDate,
    setClearFilter,
  } = props;
  const [selectedPhysicianItems, setSelectedPhysicianItems] = useState<
    string | null
  >();
  const [selectedServiceItems, setSelectedServiceItems] = useState<
    string | null
  >();
  const [dueDateRangeValues, selectDueDateRangeValues] = useState(null);
  const [bookingDateRangeValues, selectBookingDateRangeValues] = useState(null);
  const [openBookingDateRange, setOpenBookingDateRange] = useState(false);
  const [openDueDateRange, setOpenDueDateRange] = useState(false);
  const [bookingDateRange, selectBookingDateRange] = useState(null);
  const [dueDateRange, selectDueDateRange] = useState(null);
  const [patientName, setPatientName] = useState<string>();
  const [localAppointment_Id, setLocalAppointment_Id] = useState<
    number | null | undefined
  >();
  const [dueDateRangeState, setDueDateRangeState] = useState<BookingDate>({});
  const [bookingDateRangeState, setBookingDateRangeState] =
    useState<BookingDate>({});
  // const [dueDate, setDueDate] = useState<BookingDate>({});

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

  function BookingDateChangeHandler(date: any, dateString: any) {
    selectBookingDateRangeValues(date);
    selectBookingDateRange(date);
    setBookingDateRangeState({
      startDate: dateString[0],
      endDate: dateString[1],
    });
  }

  function onDueDateChangeHandler(date: any, dateString: any) {
    selectDueDateRangeValues(date);
    selectDueDateRange(date);
    setDueDateRangeState({
      startDate: dateString[0],
      endDate: dateString[1],
    });
  }

  const onClear = () => {
    setSelectedPhysicianItems(null);
    setSelectedServiceItems(null);
    setDoctorId(undefined);
    setServiceIds(undefined);
    selectBookingDateRangeValues(null);
    selectDueDateRangeValues(null)
    setEndDate(null);
    setStartDate(null);
    setOpenBookingDateRange(false);
    setOpenDueDateRange(false);
    selectBookingDateRange(null);
    selectDueDateRange(null);
    selectDueDateRange(null);
    setPatientName("");
    setSearchPatient && setSearchPatient(null);
    setAppointmentId(undefined);
    setLocalAppointment_Id(null);
    setBookingDate?.({});
    setDueDate?.({});
    setClearFilter?.((prev: boolean) => !prev);
  };
  const applyBookingDateRange = () => {
    setOpenBookingDateRange(false);
    setBookingDate?.(bookingDateRangeState);
  };

  const applyDueDateRange = () => {
    setOpenDueDateRange(false);
    setDueDate?.(dueDateRangeState);
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
              value={bookingDateRangeValues}
              onChange={BookingDateChangeHandler}
              open={openBookingDateRange}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              renderExtraFooter={() => (
                <div className="flex gap-3 justify-end p-3">
                  <Button
                    className="bg-gray-300"
                    onClick={() => {
                      setOpenBookingDateRange(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" text-white"
                    type="primary"
                    onClick={() => {
                      applyBookingDateRange();
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
              onClick={() => setOpenBookingDateRange?.(!openBookingDateRange)}
            >
              {bookingDateRange ? (
                <div>
                  {bookingDateRange
                    ? `${getDateInFormat(
                        bookingDateRange?.[0]
                      )} -> ${getDateInFormat(bookingDateRange?.[1])}`
                    : "Booking Date"}
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
                    Booking Date
                  </div>
                  <div>
                    <CaretDownOutlined style={{ color: `primary` }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Space>
      </div>
      <div className="flex-none sm:flex ml-3">
        <Space
          direction="vertical"
          size={0}
          className="w-full md:w-44 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              value={dueDateRangeValues}
              onChange={onDueDateChangeHandler}
              open={openDueDateRange}
              className="h-0 overflow-hidden text-black p-0 absolute bottom-0 invisible"
              renderExtraFooter={() => (
                <div className="flex gap-3 justify-end p-3">
                  <Button
                    className="bg-gray-300"
                    onClick={() => {
                      setOpenDueDateRange(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" text-white"
                    type="primary"
                    onClick={() => {
                      applyDueDateRange();
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
              onClick={() => setOpenDueDateRange?.(!openDueDateRange)}
            >
              {dueDateRange ? (
                <div>
                  {dueDateRange
                    ? `${getDateInFormat(
                        dueDateRange?.[0]
                      )} -> ${getDateInFormat(dueDateRange?.[1])}`
                    : "Due Date"}
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
                    Due Date
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
