import React from "react";
import moment from "moment";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Form, Select, Avatar, notification, Button, Skeleton } from "antd";
import { CloseOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import ConfirmationModal from "./ConfirmationModal";
import InputFields from "./InputFields";
import Envelope from "../../../../../public/assets/images/envelope.svg";
import ViewProfileFields from "./ViewFields";
import {
  useCountriesQuery,
  useEnableOrDisablePatientMutation,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  useGetUserQuery,
  User,
  useRemovePatientUserMutation,
  useUpdateUserProfileMutation,
  useUserForgotPasswordMutation,
} from "generated/graphql";
import _classes from "./ProfileTab.module.scss";
import { AdminPatientUpdateInput } from "common/types/types";
import { GraphQLError } from "graphql";
import userDefaultPicture from "../../../../../public/assets/images/profile.jpg";
import chat from "./../../../../../public/assets/icon/chat-bubble.svg";

type Props = {};
type CountryOrStateObject = { id: number | string | undefined | null };
function AdminPatientProfileTab({}: Props) {
  const { query } = useRouter();
  const [countryId, setCountryId] = React.useState<CountryOrStateObject>({
    id: 0,
  });
  const [stateId, setStateId] = React.useState<CountryOrStateObject>({ id: 0 });
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [userDisableInput, setUserDisableInput] = React.useState<boolean>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [formInstance] = Form.useForm();
  const [{ fetching: loading }, setForgotPass] =
    useUserForgotPasswordMutation();
  const [{ fetching: isUpdating }, updateUserProfile] =
    useUpdateUserProfileMutation();

  const [{ fetching: deleting }, removeUser] = useRemovePatientUserMutation();

  const [{ data }] = useGetUserQuery({
    variables: {
      input: Number(query.id),
    },
    pause: !query.id,
  });

  const { user } = data || {};
  const {
    id,
    first_name,
    last_name,
    country_id,
    city_id,
    status,
    state_id,
    email,
    patientProfile,
  } = user || {};

  const [{ fetching: disableLoading }, enableOrDisableAdmin] =
    useEnableOrDisablePatientMutation();
  const [{ data: countriesData }] = useCountriesQuery({
    requestPolicy: "network-only",
  });
  const { countries } = countriesData || {};
  const [{ data: city_data }] = useGetCitiesByStateQuery({
    variables: {
      input: Number(stateId?.id || state_id),
    },
    pause: state_id === undefined,
    requestPolicy: "network-only",
  });
  const { getCitiesByState } = city_data || {};

  const [{ data: states_data }] = useGetStatesByCountryQuery({
    variables: {
      input: Number(countryId?.id || country_id),
    },
    pause: !country_id,
    requestPolicy: "network-only",
  });
  const { getStatesByCountry } = states_data || {};

  function prepareAndSetEditPayload() {
    const userGender = user?.gender
      ? `${user?.gender?.charAt(0)?.toUpperCase()}${user?.gender?.slice(1)}`
      : "";
    formInstance.setFieldsValue({
      ...user,
      ...patientProfile,
      country_name: country_id || "",
      state_name: state_id || "",
      city_name: city_id || "",
      date_of_birth: user?.date_of_birth ? moment(user?.date_of_birth) : "",
      gender: userGender,
    });
    setUserDisableInput(status || false);
  }

  React.useEffect(() => {
    if (user) prepareAndSetEditPayload();
  }, [user]);

  React.useEffect(() => {
    if (countryId?.id) {
      formInstance.setFieldsValue({
        ...formInstance.getFieldsValue(),
        state_name: getStatesByCountry ? getStatesByCountry[0]?.id : "",
      });
      getStatesByCountry && setStateId(getStatesByCountry[0]);
    }
  }, [getStatesByCountry, first_name]);

  React.useEffect(() => {
    stateId?.id &&
      formInstance.setFieldsValue({
        ...formInstance.getFieldsValue(),
        city_name: getCitiesByState ? getCitiesByState[0]?.id : "",
      });
  }, [getCitiesByState, first_name]);

  const handleResetLink = async () => {
    try {
      const response = await setForgotPass({
        input: user?.email as string,
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "Link Sent Successfully",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };

  const deleteProfileHandler = async () => {
    try {
      const response = await removeUser({
        id: Number(query.id),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        setOpen(false);
        Router.push(`/admin/patients/`);
        notification.success({
          message: "User deleted successfully",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong",
      });
    }
  };
  const changeAccountStatusHandler = async (value: boolean) => {
    setUserDisableInput(value);
    try {
      const response = await enableOrDisableAdmin({
        id: Number(query.id),
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
  const onFinish = async (values: AdminPatientUpdateInput) => {
    const { password, confirm_password } = values;
    if (password && password !== confirm_password) {
      return notification.error({
        message: "Password does not match!",
      });
    }
    try {
      const response = await updateUserProfile({
        id: Number(query?.id),
        updateUserInput: {
          first_name: values.first_name,
          last_name: values.last_name,
          gender: values.gender.toLowerCase(),
          date_of_birth: values.date_of_birth,
          email: values.email,
          contact_number: values.contact_number,
          country_id: values?.country_name,
          password: values.password || "",
          state_id: values.state_name,
          city_id: values.city_name || values.state_name,
          streetAddress: values.streetAddress,
          zip_code: values?.zip_code,
          maritalStatus: values.maritalStatus,
          haveChildren: values?.haveChildren,
          children: Number(values?.children) | 0,
          occupation: values.occupation || "No",
          occupationalExposure: values.occupation
            ? values.occupationalExposure
            : "No",
          exposureDuration: values?.exposureDuration,
          pets: values.pets,
        },
      });

      if (response?.error) {
        let graphQLError = response?.error?.graphQLErrors[0]?.extensions
          ?.response as GraphQLError;
        let customError = response?.error?.graphQLErrors[0]?.extensions
          ?.exception as GraphQLError;
        let errorMessage =
          graphQLError?.message[0] ||
          customError?.message ||
          "Something went wrong";
        notification.error({
          message: errorMessage,
        });
      }
      if (response.data) {
        Router.push("/admin/patients");
        formInstance.resetFields();
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Something went wrong",
      });
    }
  };
  const country_name = React.useMemo(() => {
    return countries?.find((value) => value.id === country_id)?.country_name;
  }, [countries]);
  const state_name = React.useMemo(() => {
    return getStatesByCountry?.find((value) => value.id === state_id)
      ?.state_name;
  }, [getStatesByCountry]);
  const city_name = React.useMemo(() => {
    return getCitiesByState?.find((value) => value.id === city_id)?.city_name;
  }, [getCitiesByState]);

  return (
    <div
      className={`relative ${_classes["admin-patient-profile-page"]} pt-16 sm:pt-0`}
    >
      <div className="w-full mb-10 flex gap-8 items-center pt-10">
        <div className="relative">
          <Avatar
            size={{ xs: 80, sm: 80, md: 80, lg: 100, xl: 100, xxl: 130 }}
            className={`profile-avatar`}
            src={patientProfile?.profileImage}
            icon={!patientProfile?.profileImage && <UserOutlined />}
          />
        </div>

        <div>
          <Skeleton
            loading={loading || !first_name}
            paragraph={{ rows: 1 }}
            active
          >
            <h2 className="mb-0">{`${first_name || ""} ${last_name || ""}`}</h2>
          </Skeleton>
          <span className="block">{email}</span>
          <div className="gap-y-2 flex-col sm:flex-row flex gap-2 pt-2">
            <div
              className={
                userDisableInput
                  ? `${_classes["profile-select-enable"]}`
                  : `${_classes["profile-select-disable"]}`
              }
            >
              <Select
                className={`mr-5 disable-select`}
                onChange={changeAccountStatusHandler}
                value={userDisableInput}
                style={{ width: 120 }}
              >
                <Select.Option value={true}>Enabled</Select.Option>
                <Select.Option className="text-red" value={false}>
                  Disabled
                </Select.Option>
              </Select>
            </div>
            <Button type="default" onClick={() => setIsEdit(!isEdit)}>
              <EditOutlined />
              Edit info
            </Button>
            <Button
              icon={
                <Image
                  priority={true}
                  width={15}
                  height={15}
                  src={chat}
                  alt=""
                  className=""
                />
              }
              className={`${_classes["appointments-btn"]} mr-1 sm:mr-3`}
              onClick={() => {
                const query: any = {
                  chat: "admin",
                  patientId: id,
                };
                Router.push({
                  pathname: "/admin/messages",
                  query,
                });
              }}
            >
              <span className="pl-2">Message patient</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex mb-8 absolute top-0 left-0 md:right-0 flex-wrap justify-start sm:justify-end w-full">
        <Button
          className={`${_classes["first-btn"]}} md:ml-auto`}
          loading={loading}
          type="link"
          disabled={loading || disableLoading}
          icon={
            <span className="mr-2 mt-0.5">
              <Image priority={true} src={Envelope} alt="" />
            </span>
          }
          onClick={handleResetLink}
        >
          Send reset password link
        </Button>
        <Button
          type="link"
          danger
          onClick={() => setOpen(true)}
          disabled={deleting}
          loading={deleting || disableLoading}
          icon={
            <span className="mr-0.5">
              <CloseOutlined className="mb-2.5" />
            </span>
          }
        >
          Delete profile
        </Button>
      </div>
      {isEdit ? (
        <Form layout="vertical" onFinish={onFinish} form={formInstance}>
          <InputFields
            data={{
              countries,
              states: getStatesByCountry,
              cities: getCitiesByState,
            }}
            formInstance={formInstance}
            setStateId={setStateId}
            setCountryId={setCountryId}
            isUpdating={isUpdating}
          />
        </Form>
      ) : (
        <>
          <ViewProfileFields
            data={user as User}
            country_name={country_name}
            state_name={state_name}
            city_name={city_name}
          />
        </>
      )}
      <ConfirmationModal
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={deleteProfileHandler}
        message="Are you sure you want ot delete this user?"
      />
    </div>
  );
}

export default AdminPatientProfileTab;
