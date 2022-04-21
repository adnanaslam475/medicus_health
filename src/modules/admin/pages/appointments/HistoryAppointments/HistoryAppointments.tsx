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
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
        <div className="w-5/6 mb-10">
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
        <div className="custom-table-ui">
          <TransactionHistory />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
