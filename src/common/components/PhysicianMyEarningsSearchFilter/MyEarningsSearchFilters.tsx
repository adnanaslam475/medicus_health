import React, { useEffect, useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker, Form } from "antd";
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
import _classes from "./MyEarningsSearchFilters.module.scss";
import RangeDropdown from "../RangeDropDown/RangeDropDown";

const { Option } = Select;

function handleChange(value: any) {}

const { RangePicker } = DatePicker;

type Props = {
  setDataListPhysician: string | any;
  setDoctorId: number | any;
  setAppointmentIds: number | any;
  setServiceIds: number | any;
  setStartDate: Date | null | any;
  setEndDate: Date | null | any;
};

function MyEarningsSearchFilters(props: Props) {
  const { setServiceIds, setDoctorId, setEndDate, setStartDate } = props;
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
        <div className="lg:ml-3 w-full sm:w-full md:w-full lg:w-70 mr-2">
          <Input
            placeholder="Search by ID or patient name"
            prefix={<SearchOutlined />}
          />
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

          {/* <RangeDropdown btnName="Score Range" className="w-full lg:w-auto" />
              <RangeDropdown btnName="Percentage Range" className="w-full lg:w-auto" /> */}
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
                  {/* <div className="self-center">
                    <Image
                      width={15}
                      height={15}
                      src={aimsCalendarIcon}
                      alt=""
                    />
                  </div> */}
                  <div>Date</div>
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
          <span className="text-gray-1 text-sm">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default MyEarningsSearchFilters;
