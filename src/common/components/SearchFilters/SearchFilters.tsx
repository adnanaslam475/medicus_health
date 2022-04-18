import React, { useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Appointment,
  useDoctorProfilesQuery,
  useGetAllAppointmentServiceTypesQuery,
  useGetAllRequestedAppointmentsQuery,
} from "../../../generated/graphql";
import searchStyle from "./style.module.scss";

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
  setDueDates: Date | null | any;
};

function SearchFilters(props: Props) {
  const {
    appointments,
    setDataListPhysician,
    setServiceIds,
    setAppointmentIds,
    setDoctorId,
    setDueDates,
  } = props;
  const [selectedPhysicianItems, setSelectedPhysicianItems] =
    useState<string | null>();
  const [selectedServiceItems, setSelectedServiceItems] =
    useState<string | null>();
  const [dateRangeValues, selectDateRangeValues] = useState(null);

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
    setDueDates(date);
  }

  const onClear = () => {
    setSelectedPhysicianItems(null);
    setSelectedServiceItems(null);
    setDoctorId(undefined);
    setServiceIds(undefined);
    selectDateRangeValues(null);
    setDueDates(null);
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
          <RangePicker
            value={dateRangeValues}
            onChange={onChange}
          />
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
