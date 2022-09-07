import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, notification } from "antd";
// import ReactS3Client from "react-aws-s3-typescript";
import PersonalInfoList from "../../../../modules/common/components/PersonalInfoList/PersonalInfoList";
import { PersonalInfoDetail } from "../../../../modules/common/components/PersonalInfoDetail/PersonalInfoDetail";
import {
  LoginUserInput,
  useGetTimeZonesQuery,
  useGetUserQuery,
  User,
  useUpdateUserProfileMutation,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
import { Upload } from "antd";
import { date } from "../../../utils";
import { UploadChangeParam } from "antd/lib/upload";
import { useMediaUploader } from "common/hooks/media";
import userDefaultPicture from "../../../../../public/assets/images/profile.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MDNextImage from "common/components/MDNextImage/MDNextImage";
import { GraphQLError } from "graphql";
import { useUserData } from "common/components/Context/UserContext";

const PersonalInfo = () => {
  const t = useTranslations("AccountDetail");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  // File Upload Hook
  const mediaUploader = useMediaUploader();

  // GET USER ID
  const { user } = getUserData();
  const id = user?.id;

  const form: any = useRef();

  const [{ data: userData }, executeUseGetUserQuery] = useGetUserQuery({
    variables: { input: id as number },
  });

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profileImage: userProfileImage } =
    userData?.user?.patientProfile || {};

  // UPDATE USER PROFILE
  const [result, updateUserProfile] = useUpdateUserProfileMutation();
  const { error } = result;
  const [patientTimeZoneId, setPatientTimeZoneId] = useState();
  const [getTimeZones] = useGetTimeZonesQuery();
  const { data: userContextData, saveUserData } = useUserData();

  useEffect(() => {
    if (patientTimeZoneId) {
      const timeZone = getTimeZones?.data?.getTimeZones.filter(
        (item) => item.id === patientTimeZoneId
      )[0]?.timeZone;
      const offset = getTimeZones?.data?.getTimeZones.filter(
        (item) => item.id === patientTimeZoneId
      )[0]?.gmtOffset;
      localStorage.setItem("timeZone", JSON.stringify(timeZone));
      localStorage.setItem("offset", JSON.stringify(offset));
    }
  }, [patientTimeZoneId]);

  const updateUserDetail = async (values: any) => {
    if (values?.timeZone) {
      setPatientTimeZoneId(values?.timeZone);
    }
    try {
      console.log({ values });
      const res = await updateUserProfile({
        id: id as number,
        updateUserInput: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          gender: values?.gender,
          // date_of_birth: new Date(values.date_of_birth).toLocaleDateString(),
          date_of_birth: date?.formatMMMMDDYYYY(values.date_of_birth),
          country_id: Number(values?.country_id),
          contact_number: values?.conntactNumber,
          city_id: Number(values?.city_id),
          password: values?.password,
          state_id: Number(values?.state_id),
          zip_code: values?.postalCode,
          streetAddress: values?.streetAddress,
          maritalStatus: values?.maritalStatus,
          profileImage: image ? image : userProfileImage,
          // haveChildren: values?.haveChildren ? "No" : "Yes",
          haveChildren: values?.haveChildren,
          children: Number(values?.children) | 0,
          occupation: values?.occupation,
          occupationalExposure: values?.occupationalExposure,
          exposureDuration: values?.exposureDuration,
          pets: values?.pets,
          timeZoneId: values?.timeZone || 86, // 86 is default id for UTC
        },
      });
      let loggedInUserData = localStorage.getItem("loggedInUserData");
      let updatedLoggedInUserData: LoginUserInput | any =
        loggedInUserData && JSON.parse(loggedInUserData);
      if (res) {
        res?.data?.updateUser &&
          notification.success({
            message: "Successfully updated",
          });
        executeUseGetUserQuery({ requestPolicy: "network-only" });
      }
      if (
        updatedLoggedInUserData?.user &&
        updatedLoggedInUserData?.user?.role === "User" &&
        !res?.error
      ) {
        updatedLoggedInUserData.user.first_name = values?.firstName;
        updatedLoggedInUserData.user.last_name = values?.lastName;
        if (updatedLoggedInUserData.user.patientProfile) {
          updatedLoggedInUserData.user.patientProfile.profileImage =
            image || userProfileImage;
        }
        localStorage.setItem(
          "loggedInUserData",
          JSON.stringify(updatedLoggedInUserData)
        );
        saveUserData?.({
          firstName: values?.firstName,
          lastName: values?.lastName,
          profilePicture: image ? image : userProfileImage,
        });
      }

      if (res?.error && res?.error?.message) {
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
    } catch (error) {
      console.log(error);
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

  const onSave = async () => {
    try {
      await form?.current?.validateFields();
      form?.current?.submit();
      setIsEdit(false);
    } catch (error: any) {
      error?.errorFields?.forEach((e: any) => {
        notification.error({
          message: e.errors[0],
        });
      });
    }
  };

  return (
    <>
      <div className="w-full md:w-4/6">
        <div className="flex justify-between items-center">
          <div>
            <MDNextImage
              objectFit="cover"
              src={image || userProfileImage || ""}
              layout="fixed"
              width={74}
              height={74}
              className="bg-gray border rounded-full border-gray"
              fallbackImage="/assets/images/profile.svg"
            />

            {/* <Image
              priority={true}
              alt="Profile Image"
              height="74"
              width="74"
              onError={(e) => console.log(e)}
              src={image || userProfileImage || userDefaultPicture}
              className="bg-gray border rounded-full border-gray"
            /> */}
            {isEdit && (
              <Upload
                onChange={fileChange}
                maxCount={1}
                beforeUpload={onBeforeUpload}
                itemRender={() => <div />}
                customRequest={() => null}
                accept="image/jpg, image/jpeg,"
              >
                <div className="relative">
                  <div className="flex flex-col justify-start">
                    <Button
                      type="link"
                      className="text-primary underline text-xs"
                    >
                      Actualizar foto
                      {/* {t("update_photo")} */}
                    </Button>
                    {/* <span className="hint font-rubik font-normal text-gray-1 font-xs cursor-default">
                      Upload 600px*600px image
                    </span> */}
                  </div>
                </div>
              </Upload>
            )}
          </div>

          <div className="edit-btn">
            {isEdit ? (
              <div className="flex gap-2 flex-wrap">
                <Button
                  danger
                  className="text-xs p-5 text-red"
                  size="large"
                  onClick={() => setIsEdit(false)}
                >
                  <span className="text-xs">
                    Cancelar
                    {/* {t("cancel")} */}
                  </span>
                </Button>
                <Button
                  style={{ background: "#30CEC2", borderColor: "transparent" }}
                  className="text-xs p-5"
                  size="large"
                  onClick={onSave}
                >
                  <span className="text-xs text-white px-1">
                    Ahorrar
                    {/* {t("save")} */}
                  </span>
                </Button>
              </div>
            ) : (
              <Button
                type="default"
                className="text-xs p-5"
                size="large"
                onClick={() => setIsEdit(true)}
              >
                <span className="text-xs">
                  Editar
                  {/* {t("edit")} */}
                </span>
              </Button>
            )}
          </div>
        </div>
        {isEdit ? (
          <PersonalInfoDetail
            onFinish={updateUserDetail}
            user={userData?.user as User}
            loading={true}
            ref={form}
          />
        ) : (
          <PersonalInfoList userDetail={userData?.user} />
        )}
      </div>
    </>
  );
};

export default PersonalInfo;
