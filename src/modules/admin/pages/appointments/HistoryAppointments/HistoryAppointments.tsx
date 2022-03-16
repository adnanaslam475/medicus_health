import { Select, DatePicker, Space, Button } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { CloseOutlined } from "@ant-design/icons";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">History</h2>
        <div className="w-3/5 mb-10">
          <div className="flex items-center">
            <span className="mx-3">Filter</span>
            <div className="mx-3">
              <Select
                placeholder="Doctor"
                className=" lg:w-44 font-medium text-primary placeholder-primary  text-center"
              >
                <Select.Option
                  className="text-primary placeholder-gray-500"
                  value="Doctor Francis"
                >
                  Doctor Francis
                </Select.Option>
              </Select>
            </div>

            <Select
              placeholder="Service"
              className="mx-3 lg:w-44 font-medium text-primary placeholder-primary  text-center"
            >
              <Select.Option
                className="text-primary placeholder-gray-500"
                value="Doctor Francis"
              >
                Doctor Francis
              </Select.Option>
            </Select>
            <Space direction="vertical" size={12} className="mx-3">
              <RangePicker />
            </Space>

            <Button type="text" size="large" className="w-50">
              <CloseOutlined />
              <span className="text-gray-2 mx-3">Clear</span>
            </Button>
          </div>
        </div>
        {/* Transaction History table */}
        <TransactionHistory />
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
