import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
// import { useDoctorProfilesQuery } from "../../../../../generated/graphql";
import {
  Table,
  Tag,
  Modal,
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import yourImage from "../../../../../../public/assets/images/your_photo.png";

function AdminPhysicianAdd() {
  // const [{ data }] = useDoctorProfilesQuery();
  // const { doctorProfiles } = data || {};

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const props = {
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
        // console.log("fileList", fileList);
        // console.log("file", file);
        setImage(file?.name);
      }
    },
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add a Physician</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              <div className="w-full mb-10">
                <Avatar
                  size={64}
                  src={
                    <Image
                      alt=""
                      src={yourImage}
                      width={128}
                      height={128}
                      className="border rounded border-gray-2"
                    />
                  }
                />
                <a
                  href="javascript:void(0)"
                  className="text-primary underline ml-3 text-xs"
                >
                  <Upload {...props}>Update Photo</Upload>
                </a>
              </div>
              <div className="w-full">
                <Form
                  name="basic"
                  // initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
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

                  <div className="flex flex-row gap-0">
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
                  <Form.Item>
                    <div className="flex items-center justify-end">
                      <Button type="primary" htmlType="submit">
                        Add Patient
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianAdd;
