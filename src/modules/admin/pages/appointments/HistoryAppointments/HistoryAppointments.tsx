import { Select, DatePicker, Space, Button } from "antd";
import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { CloseOutlined } from "@ant-design/icons";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";
import SearchFilters from "../../../../../common/components/SearchFilters/SearchFilters";

const { RangePicker } = DatePicker;

function CancelledAppointment() {
  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">History</h2>
        <div className="w-5/6">
          {/* <SearchFilters /> */}
        </div>
        
        <div className="custom-table-ui">
          <TransactionHistory />
        </div>
      </div>
    </AppLayout>
  );
}
export default CancelledAppointment;
