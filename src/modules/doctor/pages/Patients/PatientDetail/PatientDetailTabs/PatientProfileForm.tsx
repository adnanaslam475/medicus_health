/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import yourImage from "../../../../../../../public/assets/images/your_photo.png";
import {
  Table,
  Tag,
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";

const props = {};
function PatientProfileForm() {
  return (
    <Form name="basic" layout="vertical">
      <div className="flex flex-row gap-3">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First Name!" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Last Name!" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-row gap-3">
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email" }]}
          className="flex-1"
        >
          <Input />
        </Form.Item>
      </div>
      <div className="flex flex-row gap-3">
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password" }]}
          className="flex-1"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Confirm password!" }]}
          className="flex-1"
        >
          <Input.Password />
        </Form.Item>
      </div>
    </Form>
  );
}

export default PatientProfileForm;
