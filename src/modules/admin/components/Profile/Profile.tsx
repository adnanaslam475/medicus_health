/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";

import { ExclamationCircleOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
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
  Menu,
   Dropdown,
   Tabs, Badge, Modal,
   notification,
   Select

} from "antd";

import { useUpdateDoctorProfileMutation } from "../../../../generated/graphql";
import ReactS3Client from "react-aws-s3-typescript";
import config from "../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import Language from "../../../admin/components/Languague/Language";

export const Profile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
}: any) {

  const { Option } = Select;
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");

  const { first_name, last_name, password, email, contact_number } =
    doctorData?.user || {};

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};

  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

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

  function handleMenuClick(e) {
    console.log('click', e);
  }
  const menu= ( 
  <Menu onClick={handleMenuClick}>
  <Menu.Item key="1"  >
    Published
  </Menu.Item>
  <Menu.Item key="2" >
  UnPublished
  </Menu.Item>

</Menu>);
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
                  size={104}
                  style={{
                    borderColor: "transparent",
                    borderWidth: 2,
                    lineHeight: "40px",
                  }}
                  src={userProfileImage}
                />
              
              </div>
            </Upload>
            <div>
              <span>PY-123</span>
              <h2 className="mb-0">{`${first_name} ${last_name}`}</h2>
              <span className="block">{email}</span>
              <Select  defaultValue="published"style={{ width: 200 }} >
            <Option selected value="published">Published</Option>
            <Option value="unpublished">UnPublished</Option>
          </Select>
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
          <div className="mr-auto">Languages</div>
          <div className="flex justify-between mr-auto">
          <Language/>
          <Language/>
          </div>
        </div>
      </div>
    </div>
  );
});

// export default Profile;
