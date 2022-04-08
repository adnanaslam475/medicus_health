/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import yourImage from "../../../../../public/assets/images/your_photo.png";
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

const props = {
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }: any) {
    if (file.status !== "uploading") {
      // console.log("fileList", fileList);
      // console.log("file", file);
      // setImage(file?.name);
    }
  },
};
function Profile() {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8">
            <Avatar
              size={128}
              src={
                <Image
                  alt=""
                  src={yourImage}
                  width={228}
                  height={228}
                  className="border rounded border-gray-2"
                />
              }
            />
            {/* <Button type="link" className="text-primary underline ml-3 text-xs">
              <Upload {...props}>Update Photo</Upload>
            </Button> */}
            <div>
              <span>PY-123</span>
              <h2 className="mb-0">Maxime Bauwents</h2>
              <span className="block">usama@gmail.com</span>
              <Button size="large" className="px-0 mx-0">
                {" "}
                <EditOutlined />
                Edit Info
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Form
              name="basic"
              // initialValues={{ remember: true }}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              layout="vertical"
            >
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
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  rules={[{ required: true, message: "Contact Number!" }]}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
