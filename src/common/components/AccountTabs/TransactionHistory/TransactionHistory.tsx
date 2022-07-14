import React, { useState } from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import { date } from "../../../utils";
import { EyeFilled } from "@ant-design/icons";
import { Appointment, Transaction } from "../../../../generated/graphql";

const transactionsColumns = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
];

type Props = {
  data: Transaction[] | undefined;
};

const TransactionHistory = (props: Props) => {
  const { data } = props || {};
  // const [pagination, setPagination] = React.useState({
  //   page: 1,
  //   limit: 10,
  // });
  // const [sorting, setSorting] = React.useState({
  //   column: "",
  //   order: "",
  // });

  // const onChange = (...params: any) => {
  //   const [, , sorter] = params;
  //   setSorting({
  //     order: sorter.order?.replace("end", "") || "",
  //     column: `user.${sorter.field}` || "",
  //   });
  // };

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <Table
      columns={transactionsColumns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: true }}
    />
  );
};

export default TransactionHistory;
