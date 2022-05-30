import React, { useState } from "react";
import Router from "next/router";
import { Form, Select, Modal, DatePicker, Input, Button, Tag } from "antd";
import { MessageOutlined, VideoCameraFilled } from "@ant-design/icons";
import _classes from "./AppointmentButtons.module.scss";
import { ButtonType } from "antd/lib/button";

function AppointmentInfo() {
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
    <React.Fragment>
      <ul className="w-4/6">
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">ID</div>
          <div className="w-full text-secondary">A-0001</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Patient</div>
          <div className="w-full text-secondary">Mark Manson</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Type</div>
          <div className="w-full text-secondary">Second Opinion</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Date</div>
          <div className="w-full text-secondary">March 03, 2022</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Time</div>
          <div className="w-full text-secondary">10:30 AM - 11:00 AM</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Total Amount</div>
          <div className="w-full text-secondary">$40.00</div>
        </li>
        <li className="flex border-b border-gray-5 py-3">
          <div className="w-full text-gray-1">Status</div>
          <div className="w-full text-secondary">
            <Tag
              color="#FFF6E0"
              className="ant-typography ant-typography-secondary"
            >
              Pending
            </Tag>
          </div>
        </li>
      </ul>
      <div className="w-4/6 flex justify-between mt-4">
        <div className="flex flex-auto justify-between">
          <Button className="border border-red">Reject</Button>
          <div>
            <Button
              icon={<MessageOutlined />}
              className={`${_classes["appointments-btn"]}`}
              onClick={showModal}
            >
              Propose Time
            </Button>
            <Button
              type="primary"
              icon={<VideoCameraFilled />}
              className={`${_classes["appointments-btn"]} bg-current ml-3`}
              onClick={showModal}
            >
              Edit Appointment
            </Button>
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2>Propose New Time</h2>
        <Form layout="vertical">
          <div className="flex">
            <div className="w-5/6">
              <Form.Item label="Service*" name="service">
                <Select placeholder="Service*" className="w-full">
                  <Select.Option>First Consultation</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
              <Form.Item label="Amount" name="Amount">
                <Input placeholder="" className="w-full" />
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Requested Date*" name="requestedDate">
            <DatePicker
              placeholder="mm/dd/yy"
              format={"MM-DD-YYYY"}
              className="w-full"
            />
          </Form.Item>
          <label>Availability*</label>
          <div className="flex mt-2">
            <div className="w-32">
              <Form.Item label="Start Time" name="Start Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-32 ml-4">
              <Form.Item label="End Time" name="End Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="w-32">
              <Form.Item label="Start Time" name="Start Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-32 ml-4">
              <Form.Item label="End Time" name="End Time">
                <Select placeholder="Select" className="w-full">
                  <Select.Option>08:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>09:00 AM</Select.Option>
                  <Select.Option>08:30 AM</Select.Option>
                  <Select.Option>10:00 AM</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
export default AppointmentInfo;
