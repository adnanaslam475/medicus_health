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

function SearchFilters() {
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
          <Select placeholder="Physician" className="w-full sm:w-40">
            <Option value="Dr.Paul Wallner">Dr.Paul Wallner</Option>
            <Option value="Dr.Carolina Giménez">Dr.Carolina Giménez</Option>
            <Option value="Dr.Megan Perkins">Dr.Megan Perkins</Option>
          </Select>
        </div>
      </div>
      <div className="flex-none sm:flex">
        <div className="lg:ml-3 mt-3 sm:mt-0">
          <Select placeholder="Service" className="w-full sm:w-40">
            <Option value="First Consultation">First Consultation</Option>
            <Option value="Second Opinion">Second Opinion</Option>
          </Select>
        </div>
        <Space direction="vertical" size={12} className="sm:ml-3 mt-3 sm:mt-0">
          <RangePicker />
          {/* <DatePicker onChange={onChange} /> */}
        </Space>
        <Button type="text" className="sm:ml-3">
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchFilters;
