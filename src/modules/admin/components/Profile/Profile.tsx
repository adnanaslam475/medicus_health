/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import editicon from "../../../../../public/assets/icon/edit.svg";
import { Avatar, Upload, Form, Input, Button, notification } from "antd";
import _classes from "./PhysicianProfile.module.scss";

import { useUpdateAdminUserMutation } from "generated/graphql";
import { UploadChangeParam } from "antd/lib/upload";
import { useMediaUploader } from "common/hooks/media";
import { getUserData } from "common/utils/userData";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import { UserOutlined } from "@ant-design/icons";

type profileType = {
  doctorId?: string | string[] | undefined;
  doctorData: any;
  setIsEdit: (e: boolean) => void;
  edit: () => void;
};

export const Profile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
}: profileType) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");

  const { user } = getUserData();
  const { id } = user || {};

  const {
    first_name,
    last_name,
    password,
    email,
    contact_number,
    status,
    adminProfilePicture,
  } = doctorData || {};
  const { profile_image: userProfileImage } = doctorData || {};
  const { profile_picture: profilePicture } = adminProfilePicture || {};

  const mediaUploader = useMediaUploader();

  const [result, executeUseUpdateAdminUserMutation] =
    useUpdateAdminUserMutation();
  const { error, fetching } = result || {};

  useEffect(() => {
    if (doctorData) {
      prepareAndSetEditPayload();
    }
  }, [doctorData]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      contact: contact_number,
      email: email,
      password: "",
      confirmPassword: "",
    });
  }

  const onFinish = async (values: any) => {
    try {
      updateAdminProfile(values);
    } catch (error) {
      setIsEdit(true);
    }
  };
  const updateAdminProfile = async (values: any) => {
    if (doctorData) {
      const res = await executeUseUpdateAdminUserMutation({
        updateAdminUserInput: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          contact_number: values?.contact,
          password: values?.password,
          profile_picture: image || userProfileImage || profilePicture,
        },
        id: Number(id),
      });

      if (res?.data) {
        res?.data?.updateAdminUser &&
          notification.success({
            message: "Updated Successfully",
          });
        setIsEdit(false);
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

  const fileChange = async (info: UploadChangeParam) => {
    try {
      const url = await mediaUploader.upload(info.file.originFileObj as File);
      if (url) {
        setImage(url?.location);
      }
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

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <Upload
              onChange={fileChange}
              maxCount={1}
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              customRequest={() => null}
            >
              <div className="relative">
                <Avatar
                 icon={ <UserOutlined  />} 
                  size={130}
                  className="border-transparent border-2 leading-10 profile-avatar"
                  src={
                    fetching
                      ? yourImage
                      : image || userProfileImage || profilePicture
                  }
                />
                <span className="rounded-full absolute p-1 right-0 bottom-0">
                  <Image
                    priority={true}
                    alt=""
                    src={editicon}
                    width={30}
                    height={30}
                    className="border rounded border-gray-2"
                  />
                </span>
              </div>
            </Upload>

            <div>
              <h2 className="mb-0">
                {first_name ? `${first_name} ${last_name}` : ""}
              </h2>
              <span className="block">{email}</span>
            </div>
          </div>

          <div className="w-full pb-10">
            <Form
              form={formInstance}
              name="basic"
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[{ required: true, message: "First name!" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name!" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ type: "email", required: true, message: "Email!" }]}
                  className="flex-1"
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Contact number"
                  className="flex-1"
                  name="contact"
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  label="Password"
                  name="password"
                  className="flex-1"
                  // rules={[{ required: true, message: "Password!" }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  className="flex-1"
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <Form.Item>
                <div className="flex items-center justify-end gap-2">
                  <Button type="default" onClick={() => setIsEdit(false)}>
                    Close
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save changes
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
