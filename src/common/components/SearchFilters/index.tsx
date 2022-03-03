import React from "react";
import { Card, Button, Select,  Space, DatePicker} from "antd";
import CloseOutlined from '@ant-design/icons';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const { RangePicker } = DatePicker;

function SearchFilters() {

  return (
    <div className="flex items-center my-10">
    <span className="mx-3">Filter</span>
    <div className="mx-3">
      <Select
        placeholder="Doctor"
        className=" lg:w-44 font-medium text-primary placeholder-primary  text-center"
      >
        <Option
          className="text-primary placeholder-gray-500"
          value="Doctor Francis"
        >
          Doctor Francis
        </Option>
      </Select>
    </div>

    <Select
      placeholder="Service"
      className="mx-3 lg:w-44 font-medium text-primary placeholder-primary  text-center"
    >
      <Option
        className="text-primary placeholder-gray-500"
        value="Doctor Francis"
      >
        Doctor Francis
      </Option>
    </Select>
    <Space direction="vertical" size={12} className="mx-3">
      <RangePicker />
    </Space>

    <Button type="text" size="large" className="w-50">
      <CloseOutlined />
      <span className="text-gray-2 mx-3">Clear</span>
    </Button>
  </div>
  );
}

export default SearchFilters;
