import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import { Collapse, Button, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const PaymentHeader = () => (
  <div className="flex flex-1 flex-row justify-between items-center py-2 rounded-md border-primary-1">
    <div className="inline-block w-full">
      <div className="flex w-full justify-between">
        <div className="px-3">
          <div className="flex flex-col">
            <div className="text-dark font-bold">Visa ending with 2256</div>
            <div className="text-dark ">05/2026</div>
          </div>
        </div>
      </div>
    </div>
    <div className="text-primary">
      <Tag color="#30CEC2" className="rounded-full">
        Default
      </Tag>
    </div>
  </div>
);

export default PaymentHeader;
