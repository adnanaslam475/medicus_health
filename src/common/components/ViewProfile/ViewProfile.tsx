/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";

import _classes from "./PhysicianProfile.module.scss";
import { Avatar, Upload, Form, Button, Menu, notification } from "antd";

import ReactS3Client from "react-aws-s3-typescript";
import { UploadChangeParam } from "antd/lib/upload";
import {
  useUpdateDoctorProfileMutation,
  useEnableOrDisableDoctorMutation,
  User,
} from "../../../generated/graphql";
import { configS3 } from "../../../utils/helper";
import ProfileForm from "./ProfileForm";
import { Schedule } from "../../../common/types/types";
import { parseJson } from "common/utils/helper";

type props = {
  doctorId?: string;
  doctorData?: User | any;
  setIsEdit?: (e: boolean) => void;
  showLoginInfo?: boolean;
  schedules?: Schedule[] | undefined;
};

export const ViewProfile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
  showLoginInfo,
  schedules,
}: props) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");

  const {
    first_name,
    last_name,
    password,
    email,
    contact_number,
    status,
    language,
    doctorProfile,
  } = doctorData?.user || {};

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const {
    specialization,
    year_of_experience,
    profile_image: userProfileImage,
    about_me,
    educational_background,
    professional_experience,
  } = doctorProfile || {};

  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

  const educationalBackground = parseJson(educational_background || "[]") || [];

  const professionalExperience =
    parseJson(professional_experience || "[]") || [];

  useEffect(() => {
    if (doctorData) {
      prepareAndSetEditPayload();
    }
  }, [doctorData]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      specialization: specialization,
      year_of_experience: year_of_experience,
      contact: contact_number,
      email: email,
      password: "",
      confirmPassword: "",
      ["eb-institution-0"]: educationalBackground[0]?.institution,
      ["eb-degree-0"]: educationalBackground[0]?.degree,
      ["eb-institution-1"]: educationalBackground[1]?.institution,
      ["eb-degree-1"]: educationalBackground[1]?.degree,

      ["pe-institution-0"]: professionalExperience[0]?.institution,
      ["pe-role-0"]: professionalExperience[0]?.role,
      ["pe-institution-1"]: professionalExperience[1]?.institution,
      ["pe-role-1"]: professionalExperience[1]?.role,
      ["pe-institution-2"]: professionalExperience[2]?.institution,
      ["pe-role-2"]: professionalExperience[2]?.role,
      about_me: about_me,
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
          specialization: values?.specialization,
          year_of_experience: values?.year_of_experience,
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

  function handleMenuClick(e: object) {
    console.log("click", e);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Published</Menu.Item>
      <Menu.Item key="2">UnPublished</Menu.Item>
    </Menu>
  );

  async function handleChange() {
    const res = await EnableOrDisableDoctor({
      id: Number(doctorId),
    });

    if (res?.data?.enableOrDisableDoctor?.status) {
      res?.data?.enableOrDisableDoctor?.status &&
        notification.success({
          message: "Published",
        });
    }

    if (!res?.data?.enableOrDisableDoctor?.status) {
      !res?.data?.enableOrDisableDoctor?.status &&
        notification.success({
          message: "Unpublished",
        });
    }
  }

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
                {`${first_name && first_name} ${last_name && last_name}` || ""}
              </h2>
              <span className="block">{email}</span>
              <div className="flex gap-2 pt-2">
                <Button
                  type="primary"
                  // style={{
                  //   background: "#E2F8F7",
                  //   borderColor: "#E2F8F7",
                  //   color: "#30CEC2",
                  // }}
                  className={`${_classes["published-button"]}`}
                >
                  {status ? "Published" : "Unpublished"}
                </Button>

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
          <ProfileForm
            doctorId={doctorId}
            doctorData={doctorData}
            showLoginInfo={showLoginInfo}
            schedules={schedules}
            formInstance={formInstance}
          />
        </div>
      </div>
    </div>
  );
});
