/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

import _classes from "./PhysicianProfile.module.scss";
import { Input, Avatar, Form, Button } from "antd";

import { User } from "generated/graphql";
import { adminBioForm } from "utils/helper";

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

  const {
    first_name,
    last_name,
    email,
    contact_number,
    doctorProfile,
    adminProfilePicture,
  } = doctorData || {};

  const { profile_image: userProfileImage } = doctorProfile || {};
  const { profile_picture } = adminProfilePicture || {};

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

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start  py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <div className="relative">
              <Avatar
                icon={<UserOutlined />}
                size={130}
                className="border-transparent border-2 leading-10 profile-avatar"
                src={userProfileImage || profile_picture}
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
            <Form form={formInstance} name="basic" layout="vertical">
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
