import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import { Collapse, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BillingItem from "./BillingItem";
import PaymentHeader from "./PaymentHeader";
import PaymentHeader2 from "./PaymentHeader2";

const { Panel } = Collapse;

const PaymentMethods = () => {
  // function callback(key) {
  //   console.log(key);
  // }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-3/4 p-3">
          <div className="mb-5 bg-gray-4">
            <Collapse
              defaultActiveKey={["1"]}
              expandIconPosition="right"
              className="bg-primary-1 mb-3 w-full"
            >
              <Panel header={<PaymentHeader />} key="1" className="bg-gray-4">
                <BillingItem />
              </Panel>
            </Collapse>
          </div>

          <Collapse
            defaultActiveKey={["2"]}
            expandIconPosition="right"
            className="bg-primary-1 mb-3 w-full mt-5"
          >
            <Panel header={<PaymentHeader2 />} key="2" className="bg-primary-1">
              <BillingItem />
            </Panel>
          </Collapse>

          <Button
            type="default"
            onClick={showModal}
            icon={<PlusOutlined />}
            className="text-primary mt-5"
          >
            Add Payment Method
          </Button>

          <Modal
            title="Add Payment Method"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
