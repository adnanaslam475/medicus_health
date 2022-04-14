import React, { useState } from "react";
import { Card, Input, Button, Select, Space, DatePicker } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Appointment,
  useGetAllRequestedAppointmentsQuery,
} from "../../../generated/graphql";

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

function onChange(date: any, dateString: any) {
  console.log(date, dateString);
}

type Props = {
  appointments: Appointment | undefined | any;
  setDataList: any;
};

function SearchFilters(props: Props) {
  const { appointments, setDataList } = props;
  const [selectedPhysicianItems, setSelectedPhysicianItems] = useState<string>("");
  const [selectedServiceItems, setSelectedServiceItems] = useState<string>("");

  const physicianData = ["test doctor", "Hassan doc", "Test doctor"];
  const serviceData = ["Consultation", "Second Appointment"];

  const handlePhysicianChange = (selectedItem: any) => {
    const filterDataPhysician = appointments.filter(
      (item: { doctor: { first_name: any } }) =>
        item?.doctor?.first_name === selectedItem
    );
    setSelectedPhysicianItems(selectedItem);
    setDataList(filterDataPhysician);
  };

  const handleServiceChange = (selectedItem: any) => {
    const filterDataService = appointments.filter(
      (item: { serviceType: { name: any } }) =>
        item?.serviceType?.name.toLowerCase() === selectedItem.toLowerCase()
    );
    setSelectedServiceItems(selectedItem);
    setDataList(filterDataService);
  };

  const onClear = () => {
    setSelectedPhysicianItems("");
    setDataList(appointments);
    setSelectedServiceItems("");
  }

  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      <span className="text-gray-1">Filter</span>
      <div className="flex-none sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 sm:w-full md:w-full lg:w-70">
          <Input
            placeholder="Search by ID or physician name"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="sm:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Physician"
            className="w-full sm:w-40"
            onChange={handlePhysicianChange}
            // value={selectedPhysicianItems}
          >
            {physicianData?.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select
            placeholder="Service"
            className="w-full sm:w-64"
            onChange={handleServiceChange}
            // value={selectedServiceItems}
          >
            {serviceData?.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Space direction="vertical" size={12} className="sm:ml-3 mt-3 sm:mt-0">
          <RangePicker />
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
