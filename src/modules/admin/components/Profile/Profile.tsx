/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal, notification, Select } from "antd";
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
import {
  useEnableOrDisableDoctorMutation,
  useUpdateDoctorProfileMutation,
} from "../../../../generated/graphql";
import ReactS3Client from "react-aws-s3-typescript";
import config from "../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";

export const Profile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
}: any) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");
  const [ispublish, setIsPublish] = useState(true);

  const { first_name, last_name, password, email, contact_number, status } =
    doctorData?.user || {};

  console.log("status", status);

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};

  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

  useEffect(() => {
    if (doctorData) {
      if (doctorData) {
        prepareAndSetEditPayload();
      }
    }
  }, [doctorData]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      contact: contact_number,
      email: email,
      password: password,
      confirmPassword: password,
    });
  }

  const onFinish = async (values: any) => {
    try {
      updateDoctorProfile(values);
    } catch (error) {}
  };

  const updateDoctorProfile = async (values: any) => {
    if (doctorData) {
      const res = await updateDoctor({
        updateDoctorProfileInput: {
          doctor_id: Number(doctorId),
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          password: values?.password,
          profile_image: image ? image : userProfileImage,
        },
      });

      if (res?.data) {
        res?.data?.updateDoctorProfile &&
          notification.success({
            message: "Updated Successfully",
          });
      }

      if (res?.error) {
        res?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message:
              res?.error?.graphQLErrors[0]?.message || "Something went wrong",
          });
      }
    }
  };

  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
  };

  const fileChange = async (info: UploadChangeParam) => {
    const s3 = new ReactS3Client(configS3);

    try {
      const url = await s3.uploadFile(info.file.originFileObj as File);
      setImage(url?.location);
    } catch (error) {}
    if (error) {
      notification.error({
        message: error?.graphQLErrors[0]?.message || "Something went wrong",
      });
    }
  };

  const onBeforeUpload = (file: File) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg";
    return isPNG || isJPG || Upload.LIST_IGNORE;
  };

  const { Option } = Select;
  async function handleChange(value: string) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }

    const res = await EnableOrDisableDoctor({
      id: Number(doctorId),
    });

    // if (res?.data?.enableOrDisableDoctor.status) {
    //   setIsPublish(true);
    // } else {
    //   setIsPublish(false);
    // }

    console.log("EnableOrDisableDoctor", res);
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8">
            <Upload
              onChange={fileChange}
              maxCount={1}
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              customRequest={() => null}
            >
              <div className="relative">
                <Avatar
                  size={50}
                  style={{
                    borderColor: "transparent",
                    borderWidth: 2,
                    lineHeight: "40px",
                  }}
                  src={userProfileImage}
                />
                <Button
                  type="link"
                  className="text-primary underline ml-3 text-xs"
                >
                  Update Photo
                </Button>
              </div>
            </Upload>

            <div>
              <span>PY-123</span>
              <h2 className="mb-0">{`${first_name} ${last_name}`}</h2>
              <span className="block">{email}</span>
              <div className=" grid grid-cols-2 gap-4">
                <div className="lg:ml-0 mt-0 sm:mt-0">
                  <Select
                    style={{ width: 120 }}
                    onChange={handleChange}
                    defaultValue="Published"
                    className="w-full sm:w-40"
                  >
                    <Option value={"Published"}>Unpublished</Option>
                    <Option value={"Unpublished"}>Published</Option>
                  </Select>
                </div>
                <Button size="large" className="px-0 mx-0">
                  <EditOutlined />
                  Edit Info
                </Button>
              </div>
              <div className="flex">
                <div className="physicianStatus">
                  {status ? <Tag>Published</Tag> : <Tag>Unpublished</Tag>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Form
              form={formInstance}
              name="basic"
              onFinish={onFinish}
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
                  name="email"
                  // name={["user", "email"]}
                  label="Email"
                  rules={[{ type: "email" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  rules={[{ message: "Contact Number!" }]}
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
                    Save Changes
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

// export default Profile;
