import React, { useEffect, useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Appointment,
  useDoctorProfilesQuery,
  useGetAllAppointmentServiceTypesQuery,
  useGetAllRequestedAppointmentsQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";
import Image from "next/image";
import { aimsCalendarIcon } from "../../../utils/images";
import { getDateInFormat } from "../../utils/date";
import _classes from "./SearchFilters.module.scss";

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

type Props = {
  // appointments: Appointment | undefined | any;
  setDataListPhysician: string | any;
  setDoctorId: number | any;
  setAppointmentIds: number | any;
  setServiceIds: number | any;
  setStartDate: Date | null | any;
  setEndDate: Date | null | any;
  // setStatus: (data: string) => void | string;
};

function SearchFilters(props: Props) {
  const {
    // appointments,
    // setDataListPhysician,
    setServiceIds,
    // setAppointmentIds,
    setDoctorId,
    setEndDate,
    setStartDate,
    // setStatus,
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

  const [{ data: dataList }] = useDoctorProfilesQuery();
  const { doctorProfiles } = dataList || {};

  const [{ data }] = useGetAllAppointmentServiceTypesQuery();
  const { appointmentServiceTypes } = data || {};

  const handlePhysicianChange = (selectedItem: any, name: any) => {
    setSelectedPhysicianItems(name.children);
    setDoctorId(selectedItem);
  };

  const handleServiceChange = (selectedItem: any, name: any) => {
    setSelectedServiceItems(name.children);
    setServiceIds(selectedItem);
  };

  function onChange(date: any, dateString: any) {
    console.log(date, dateString);
    selectDateRangeValues(date);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    selectDateRange(date);
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
  };

  const applyDateRange = () => {
    setOpenDateRange(false);
  };

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5`}
    >
      <span className="text-gray-1 mr-3 mb-3">Filter</span>
      <div className="flex-none sm:flex">
        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3">
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
        <div className="w-full md:w-44 xl:w-60 mr-3 mb-3">
          <Select
            placeholder="Service"
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
          className="w-full md:w-44 xl:w-60 sm:mb-3"
        >
          <div className="relative">
            <RangePicker
              // dateRange={dateRange}
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
                  {/* <div className="self-center">
                    <Image
                      width={15}
                      height={15}
                      src={aimsCalendarIcon}
                      alt=""
                    />
                  </div> */}
                  <div>Creation Date</div>
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
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchFilters;
