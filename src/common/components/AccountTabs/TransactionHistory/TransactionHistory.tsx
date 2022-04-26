import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";

interface col {
  title: string;
  dataIndex: string;
  key: "string";
  width: "30%";
}

type Props = {
  data?: any;
  columns?: any;
};

const TransactionHistory = (props: Props) => {
  const { data, columns } = props || {};

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default TransactionHistory;
