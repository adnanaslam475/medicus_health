import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const PaymentHeader2 = () => (
  <div className="flex flex-1 flex-row justify-between items-center py-2 rounded-md border-primary-1">
    <div className="inline-block w-full">
      <div className="flex w-full justify-between">
        <div className="px-3">
          <div className="flex flex-col">
            <div className="text-dark font-bold">Visa ending with 3563</div>
            <div className="text-dark ">02/2028</div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="text-primary">
      <Tag color="#653374" className="rounded-full">
        DEFAULT
      </Tag>
    </div> */}
  </div>
);

export default PaymentHeader2;
