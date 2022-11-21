/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Form,
  Button,
  Skeleton,
  notification,
  Select,
  Tooltip,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  useDeleteDoctorMutation,
  useEnableOrDisableDoctorMutation,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
  useGetOnboardingAccountLinkMutation,
  useGetStatesByCountryQuery,
  useGetUserQuery,
  useOnboardingTosAcceptanceMutation,
  User,
} from "generated/graphql";
import { Schedule } from "common/types/types";
import { parseJson } from "common/utils/helper";
import ProfileForm from "./ProfileForm";
import _classes from "./PhysicianProfile.module.scss";
import { getRole } from "common/utils/userData";
import userDefaultPicture from "../../../../public/assets/images/profile.jpg";
import user from "../../../../pages/admin/users";
import { graphqlError, isChrome, timezoneLabel } from "utils/helper";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Router from "next/router";
import { usePublishOrUnpublishDoctorMutation } from "generated/graphql";
// import _classes from "./ProfileTab.module.scss";

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [userDisableInput, setUserDisableInput] = React.useState<boolean>();
  const [publishStatus, setPublishStatus] = useState();
  const [{ fetching: disableLoading1 }, enableOrDisableDoctorByAdmin] =
    useEnableOrDisableDoctorMutation();

  const [{ fetching: disableLoading2 }, PublishOrUnpublishDoctorMutation] =
    usePublishOrUnpublishDoctorMutation();

  const [{ fetching }, executeUseDeleteDoctorMutation] =
    useDeleteDoctorMutation();

  const [
    { data: tosData, fetching: tosFetching },
    executeUseOnboardingTosAcceptanceMutation,
  ] = useOnboardingTosAcceptanceMutation();

  const [
    { data: onBoardingData, fetching: onBoardingFetching },
    executeUseGetOnboardingAccountLinkMutation,
  ] = useGetOnboardingAccountLinkMutation();

  const [
    { data: userData, fetching: userDataLoading },
    executeUseGetUserQuery,
  ] = useGetUserQuery({
    variables: { input: Number(doctorId) },
    pause: doctorId === undefined,
  });
  const {
    first_name,
    last_name,
    email,
    streetAddress,
    zip_code,
    country,
    state,
    city,
    timeZone,
    tos_acceptance,
  } = userData?.user || {};
  const { country_name } = country || {};
  const { state_name } = state || {};
  const { city_name } = city || {};

  const {
    specialization,
    condition_treated,
    year_of_experience,
    about_me,
    educational_background,
    professional_experience,
    certification_and_licensure,
    awards_honors_recognition,
  } = doctorData || {};
  const { profile_image } = doctorData || {};

  const educationalBackground = parseJson(educational_background || "[]") || [];

  const professionalExperience =
    parseJson(professional_experience || "[]") || [];
  const certificationBackground =
    parseJson(certification_and_licensure || "[]") || [];
  const honorsBackground = parseJson(awards_honors_recognition || "[]") || [];

  useEffect(() => {
    if (doctorData || userData?.user) {
      prepareAndSetEditPayload();
    }
  }, [doctorData, userData?.user]);

  const changeAccountStatusHandler = async (value: boolean) => {
    setUserDisableInput(value);
    try {
      const response = await enableOrDisableDoctorByAdmin({
        id: Number(doctorId),
      });

      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "User updated successfully",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };

  async function handlePublish_Unpublish() {
    const res = await PublishOrUnpublishDoctorMutation({
      id: Number(doctorId),
    });

    if (res?.data?.publishOrUnpublishDoctor?.status) {
      res?.data?.publishOrUnpublishDoctor?.status &&
        notification.success({
          message: "Published",
        });
    }
    if (!res?.data?.publishOrUnpublishDoctor?.status) {
      !res?.data?.publishOrUnpublishDoctor?.status &&
        notification.success({
          message: "Unpublished",
        });
    }
  }
  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      year_of_experience: year_of_experience,
      // contact: contact_number,
      contact: contact_number ? `+${contact_number}` : "",
      email: email,
      password: password,
      confirmPassword: password,
      about_me: about_me,
      condition_treated: condition_treated,
      specialization: specialization,
      streetAddress: streetAddress || "",
      city: city_name || "",
      country: country_name || "",
      // contact_number: contact_number || "",
      state: state_name || "",
      zip_code: zip_code || "",
      // timeZone: timezoneLabel(timeZone?.timeZone),
      timeZone: timeZone?.timeZoneName,
    });
    setUserDisableInput(
      doctorData?.user?.is_active || userData?.user.is_active
    );
    setPublishStatus(doctorData?.user?.status || userData?.user.status);
  }

  const deleteAdminUser = async () => {
    try {
      const response = await executeUseDeleteDoctorMutation({
        id: Number(doctorId),
      });
      if (response?.error) {
        notification.error({ message: graphqlError(response) });
        setOpen(false);
      }
      if (response.data) {
        notification.success({
          message: "User Delete Successfully",
        });
        setOpen(false);
        Router.push(`/admin/physicians`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };
  const [tosLoading, setTosLoading] = useState(false);
  const HandleTOS = () => {
    setTosLoading(true);
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        executeUseOnboardingTosAcceptanceMutation({
          ip: data?.IPv4,
          doctorId: Number(doctorId),
        })
          .then((mutationResponse) => {
            executeUseGetUserQuery({ requestPolicy: "network-only" });
            setTosLoading(false);
            notification.success({
              message: "Successfully accepted Terms for Stripe",
            });
          })
          .catch((mutationError) => {
            setTosLoading(false);
          });
      });
  };
  const HandleOnBoarding = async () => {
    const { data } = await executeUseGetOnboardingAccountLinkMutation({
      doctorId: Number(doctorId),
    });
    const url = data?.getOnboardingAccountLink?.url;
    if (url?.length) {
      window.open(String(url), "_blank");
    }
  };

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2  pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start py-3">
          <div className="w-full mt-10 sm:mt-auto mb-10 flex gap-8 items-center  sm:mt-0 flex-wrap">
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
              <div className="flex gap-2 pt-2 flex-wrap">
                {getRole() === "Admin" && (
                  <>
                    <Select
                      className="mr-5 disable-select "
                      onChange={changeAccountStatusHandler}
                      value={userDisableInput}
                      style={{ width: 120 }}
                    >
                      <Select.Option value={true}>Enabled</Select.Option>
                      <Select.Option className="text-red" value={false}>
                        Disabled
                      </Select.Option>
                    </Select>
                    <Tooltip
                      title={doctorData ? "" : "Please complete doctor profile"}
                    >
                      <Button
                        type="primary"
                        className="ant-btn ant-btn-default  antCustomBtn"
                        onClick={handlePublish_Unpublish}
                        // disabled={doctorData ? false : true}
                      >
                        {publishStatus ? "Published" : "Unpublished"}
                      </Button>
                    </Tooltip>
                    <Button
                      type="default"
                      className="ant-btn ant-btn-default  antCustomBtn"
                      onClick={() => setIsEdit?.(true)}
                    >
                      <EditOutlined />
                      Edit info
                    </Button>
                  </>
                )}
                {getRole() !== "Admin" && (
                  <Button
                    type="default"
                    className={`${_classes["edit-button"]}  ${
                      isChrome && "antCustomBtn"
                    }`}
                    onClick={() => setIsEdit?.(true)}
                  >
                    <EditOutlined />
                    Edit info
                  </Button>
                )}

                <Skeleton loading={userDataLoading}>
                  {/* {getRole() === "Doctor" && (
                    <>
                      {!tos_acceptance && (
                        <Button
                          type="default"
                          className={`${_classes["edit-button"]}  ${
                            isChrome && "antCustomBtn"
                          }`}
                          onClick={HandleTOS}
                          loading={tosLoading || tosFetching || userDataLoading}
                        >
                          Accept TOS
                        </Button>
                      )}

                      <Button
                        type="default"
                        className={`${_classes["edit-button"]}  ${
                          isChrome && "antCustomBtn"
                        }`}
                        onClick={HandleOnBoarding}
                        loading={onBoardingFetching}
                      >
                        Stripe connect account
                      </Button>
                    </>
                  )} */}
                </Skeleton>
              </div>

              {getRole() === "Admin" && (
                <div className="flex justify-end mb-8 absolute top-0 left-0 md:right-0 w-full">
                  <Button
                    className={`${isChrome && "antCustomBtn"}`}
                    type="link"
                    danger
                    onClick={() => setOpen(true)}
                    disabled={fetching}
                    loading={fetching}
                    icon={
                      <span className="mr-0.5">
                        <CloseOutlined className="mb-2.5" />
                      </span>
                    }
                  >
                    Delete profile
                  </Button>
                </div>
              )}
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
            certificationBackground={certificationBackground}
            honorsBackground={honorsBackground}
          />
          <ConfirmationModal
            visible={open}
            confirmLoading={fetching}
            onCancel={() => setOpen(false)}
            onOk={deleteAdminUser}
            message="Are you sure you want to delete this physician?"
          />
        </div>
      </div>
    </div>
  );
});
