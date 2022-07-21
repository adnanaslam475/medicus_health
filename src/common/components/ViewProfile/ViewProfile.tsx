/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Form, Button, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useGetUserQuery, User } from "generated/graphql";
import { Schedule } from "common/types/types";
import { parseJson } from "common/utils/helper";
import ProfileForm from "./ProfileForm";
import _classes from "./PhysicianProfile.module.scss";
import { getRole } from "common/utils/userData";
import userDefaultPicture from "../../../../public/assets/images/profile.jpg";

type props = {
  doctorId?: string;
  doctorData?: User | any;
  setIsEdit?: (e: boolean) => void;
  showLoginInfo?: boolean;
  schedules?: Schedule[] | undefined;
  loading?: boolean;
};

export const ViewProfile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
  showLoginInfo,
  schedules,
  loading,
}: props) {
  const [formInstance] = Form.useForm();
  const { contact_number, status, language, password } = doctorData?.user || {};

  const [{ data: userData }] = useGetUserQuery({
    variables: { input: Number(doctorId) },
  });
  const {
    first_name,
    last_name,
    email,
  } = userData?.user || doctorData?.user || {};

  const {
    specialization,
    year_of_experience,
    about_me,
    educational_background,
    professional_experience,
  } = doctorData || {};
  const { profile_image } = doctorData || {};

  const educationalBackground = parseJson(educational_background || "[]") || [];

  const professionalExperience =
    parseJson(professional_experience || "[]") || [];

  useEffect(() => {
    if (doctorData || userData) {
      prepareAndSetEditPayload();
    }
  }, [doctorData,userData]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      specialization: specialization,
      year_of_experience: year_of_experience,
      contact: contact_number,
      email: email,
      password: password,
      confirmPassword: password,
      about_me: about_me,
    });
  }
  
  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2  pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start  py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <div className="relative">
              <Avatar
                size={{ xs: 80, sm: 80, md: 80, lg: 100, xl: 100, xxl: 130 }}
                className={"profile-avatar"}
                src={profile_image}
                icon={!profile_image && <UserOutlined />}
              />
            </div>

            <div>
              <Skeleton
                loading={loading || !first_name}
                paragraph={{ rows: 1 }}
                active
              >
                <h2 className="mb-0">
                  {`${first_name || " "} ${last_name || " "}`}
                </h2>
              </Skeleton>
              <span className="block">{email}</span>
              <div className="flex gap-2 pt-2">
                {getRole() === "Admin" && (
                  <Button
                    type="primary"
                    className={`${_classes["published-button"]}`}
                  >
                    {status ? "Published" : "Unpublished"}
                  </Button>
                )}

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
            professionalExperience={professionalExperience}
            educationalBackground={educationalBackground}
/>
        </div>
      </div>
    </div>
  );
});
