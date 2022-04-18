import React, { useState } from "react";
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

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

type Props = {
  appointments: Appointment | undefined | any;
  setDataListPhysician: string | any;
  setDoctorId: number | any;
  setAppointmentIds: number | any;
  setServiceIds: number | any;
  setStartDate: Date | null | any;
  setEndDate: Date | null | any;
};

function SearchFilters(props: Props) {
  const {
    appointments,
    setDataListPhysician,
    setServiceIds,
    setAppointmentIds,
    setDoctorId,
    setEndDate,
    setStartDate,
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
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <span className="text-gray-1">Filter</span>
      <div className="flex-none sm:flex sm:mb-3 lg:mb-0">
        <div className="sm:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Physician"
            className={`${searchStyle.placeholderColor} w-full sm:w-40`}
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
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Service"
            className={`${searchStyle.placeholderColor} w-full sm:w-64`}
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
        <Space direction="vertical" size={12} className="sm:ml-3 mt-3 sm:mt-0">
          <div className="relative w-64 -mt-7">
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
                <div className="flex justify-between items-center">
                  <div className="self-center">
                    <Image
                      width={15}
                      height={15}
                      src={aimsCalendarIcon}
                      alt=""
                    />
                  </div>
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
        <Button onClick={onClear} type="text" className="sm:ml-3">
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchFilters;
