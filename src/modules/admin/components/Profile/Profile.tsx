/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import editicon from "../../../../../public/assets/icon/edit.svg";
import { Avatar, Upload, Form, Input, Button, notification } from "antd";
import _classes from "./PhysicianProfile.module.scss";

import { LoginUserInput, useUpdateAdminUserMutation } from "generated/graphql";
import { UploadChangeParam } from "antd/lib/upload";
import { useMediaUploader } from "common/hooks/media";
import { getUserData } from "common/utils/userData";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import { UserOutlined } from "@ant-design/icons";
import { GraphQLError } from "graphql";
import { useUserData } from "common/components/Context/UserContext";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const [countryCode, setCountryCode] = useState(null);

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
  const { data: userContextData, saveUserData } = useUserData();

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
        let loggedInUserData = localStorage.getItem("loggedInUserData");
        let updatedLoggedInUserData: LoginUserInput | any =
          loggedInUserData && JSON.parse(loggedInUserData);
        if (
          updatedLoggedInUserData?.user &&
          updatedLoggedInUserData?.user?.role === "Admin"
        ) {
          updatedLoggedInUserData.user.first_name = values?.firstName;
          updatedLoggedInUserData.user.last_name = values?.lastName;
          if (updatedLoggedInUserData.user.adminProfilePicture) {
            updatedLoggedInUserData.user.adminProfilePicture.profile_picture =
              image || userProfileImage || profilePicture;
          }
          localStorage.setItem(
            "loggedInUserData",
            JSON.stringify(updatedLoggedInUserData)
          );
        }
        saveUserData?.({
          firstName: values?.firstName,
          lastName: values?.lastName,
          profilePicture: image || userProfileImage || profilePicture,
        });
        setIsEdit(false);
      }

      if (res?.error?.graphQLErrors) {
        let graphQLError = res?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = res?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message[0] ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
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

  const onContactNoValidation = (_rule: any, value: string, callback: any) => {
    console.log("value", value);
    if (value?.trim().length === 0 || !value) {
      // callback(t("contact_number_message"));
      callback("Por favor ingrese su número de contacto");
    } else if (value?.trim().length < 9) {
      // callback(t("contact_number_message"));
      callback("Por favor ingrese el número de contacto correcto");
    } else {
      callback();
    }
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
                  icon={<UserOutlined />}
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
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Email is required",
                    },
                  ]}
                  className="flex-1"
                >
                  <Input disabled={true} />
                </Form.Item>
                {/* <Form.Item label="Contact #" className="flex-1" name="contact">
                  <ReactPhoneInput
                    containerStyle={{
                      border: "1px solid #9296af",
                      borderRadius: "6px",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "46px",
                      fontWeight: "600",
                    }}
                    country={"us"}
                    enableAreaCodes
                  />
                </Form.Item> */}
                <Form.Item
                  // className="flex-1"
                  // label={t("contact_number")}
                  label="Contact #"
                  name="contact"
                  validateFirst
                  rules={[
                    {
                      required: true,
                      validator: onContactNoValidation,
                    },
                  ]}
                >
                  {/* <Input /> */}
                  <ReactPhoneInput
                    country={"us"}
                    placeholder={"Ingrese su número de contacto"}
                    enableAreaCodes
                    onChange={(_value, country: any) => {
                      const code = country?.dialCode;
                      if (code) {
                        // setCountryCode(code);
                        // form.setFieldsValue({
                        //   contact_number: code
                        // });
                      }
                    }}
                    value={countryCode}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  label="Password"
                  name="password"
                  className="flex-1"
                  // rules={[{ required: true, message: "Password is required" }]}
                  rules={[
                    // {
                    //   message: "Please enter your password!",
                    // },
                    {
                      min: 8,
                      message: "Password must be minimum 8 characters.",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  className="flex-1"
                  dependencies={["password"]}
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Please confirm your password!",
                    // },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
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
