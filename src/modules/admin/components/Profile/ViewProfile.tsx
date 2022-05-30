/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";

import _classes from "./PhysicianProfile.module.scss";
import { Input, Avatar, Upload, Form, Button, Menu, notification } from "antd";

import ReactS3Client from "react-aws-s3-typescript";
import { UploadChangeParam } from "antd/lib/upload";
import {
  useUpdateDoctorProfileMutation,
  useEnableOrDisableDoctorMutation,
  User,
} from "generated/graphql";
import { adminBioForm, configS3 } from "utils/helper";
import { parseJson } from "common/utils/helper";

type props = {
  doctorId?: string;
  doctorData?: User | any;
  setIsEdit?: (e: boolean) => void;
};

export const ViewProfile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
}: props) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");

  const {
    first_name,
    last_name,
    password,
    email,
    contact_number,
    doctorProfile,
  } = doctorData?.user || {};

  const { profile_image: userProfileImage } = doctorProfile || {};

  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

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
    console.log("Values are", values);
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

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start  py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <div className="relative">
              <Avatar
                size={130}
                style={{
                  borderColor: "transparent",
                  borderWidth: 2,
                  lineHeight: "40px",
                }}
                src={userProfileImage}
              />
            </div>

            <div>
              <h2 className="mb-0">
                {`${first_name || ""} ${last_name || ""}`}
              </h2>
              <span className="block">{email}</span>
              <div className="flex gap-2 pt-2">
                <Button
                  type="default"
                  className={`${_classes["edit-button"]}`}
                  onClick={() => setIsEdit?.(true)}
                >
                  <EditOutlined />
                  Edit Info
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full pb-10">
            <Form
              form={formInstance}
              name="basic"
              onFinish={onFinish}
              layout="vertical"
            >
              {adminBioForm.map((item, index) => {
                return (
                  <div className="flex flex-row gap-3" key={index}>
                    {item.map((val, valIndex) => {
                      return (
                        <Form.Item
                          label={val?.label || ""}
                          name={val?.name || ""}
                          className="flex-1"
                          key={valIndex}
                        >
                          {val.name === "password" ||
                          val.name === "confirmPassword" ? (
                            <Input.Password disabled={true} />
                          ) : (
                            <Input disabled={true} />
                          )}
                        </Form.Item>
                      );
                    })}
                  </div>
                );
              })}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
