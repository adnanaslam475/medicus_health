import React from "react";
import { Card, Input, Button, Select, Space, DatePicker } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

function onChange(date: any, dateString: any) {
  console.log(date, dateString);
}

function PatientSearchFilters() {
  return (
    <div className="page-filters flex-none lg:flex items-center mb-5">
      {/* <span className="text-gray-1">Filter</span> */}
      <div className="flex-none sm:flex sm:mb-3 lg:mb-0">
        <div className="lg:ml-3 sm:w-full md:w-full lg:w-70">
          <Input
            placeholder="Search by ID or physician name"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="sm:ml-3 mt-3 sm:mt-0">
          <Select placeholder="Specialization" className="w-full sm:w-40">
            <Option value="Dr.Paul Wallner">Cardiologist</Option>
            <Option value="Dr.Carolina Giménez">Family Physician</Option>
            <Option value="Dr.Megan Perkins">Neurologist</Option>
          </Select>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select placeholder="Language" className="w-full sm:w-40">
            <Option value="First Consultation">English</Option>
            <Option value="Second Opinion">Espanol</Option>
          </Select>
        </div>
        <Button type="text" className="sm:ml-3">
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default PatientSearchFilters;
