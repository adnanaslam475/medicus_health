import React, { useRef, useState } from "react";
import { Avatar, Button, notification } from "antd";
import ReactS3Client from "react-aws-s3-typescript";
import PersonalInfoList from "../../../../modules/common/components/PersonalInfoList/PersonalInfoList";
import { PersonalInfoDetail } from "../../../../modules/common/components/PersonalInfoDetail/PersonalInfoDetail";
import {
  useGetUserQuery,
  User,
  useUpdateUserProfileMutation,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
import { Upload } from "antd";
import { date } from "../../../utils";
import { UploadChangeParam } from "antd/lib/upload";
import config from "../../../../../config";

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  // GET USER ID
  const { user } = getUserData();
  const id: number = user?.id;

  const form: any = useRef();

  const [{ data: userData }] = useGetUserQuery({
    variables: { input: id },
  });

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profileImage: userProfileImage } =
    userData?.user?.patientProfile || {};

  // UPDATE USER PROFILE
  const [result, updateUserProfile] = useUpdateUserProfileMutation();
  const { error } = result;

  const updateUserDetail = async (values: any) => {
    try {
      await updateUserProfile({
        id: id,
        updateUserInput: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          gender: values?.gender,
          date_of_birth: date.convertStringDateToUTC(values.date_of_birth._i),
          country_id: Number(values?.country_id),
          contact_number: values?.conntactNumber,
          city_id: Number(values?.city_id),
          password: values?.password,
          state_id: Number(values?.state_id),
          zip_code: values?.postalCode,
          streetAddress: values?.streetAddress,
          maritalStatus: values?.maritalStatus,
          profileImage: image ? image : userProfileImage,
          children: Number(values?.children),
          occupation: values?.occupation,
          occupationalExposure: values?.occupationalExposure,
          exposureDuration: values?.exposureDuration,
          pets: values?.pets,
        },
      });

      if (result) {
        result?.data?.updateUser &&
          notification.success({
            message: "Successfully Updated",
          });
      }

      if (error) {
        notification.error({
          message: error?.graphQLErrors[0]?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className="w-4/6">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            {isEdit ? (
              <Upload
                onChange={fileChange}
                maxCount={1}
                beforeUpload={onBeforeUpload}
                itemRender={() => <div />}
                customRequest={() => null}
                accept="image/jpg, image/jpeg,"
              >
                <div className="relative">
                  <Avatar
                    size={50}
                    style={{
                      borderColor: "transparent",
                      borderWidth: 2,
                      lineHeight: "40px",
                    }}
                    src={image ? image : userProfileImage}
                  />
                  <Button
                    type="link"
                    className="text-primary underline ml-3 text-xs"
                  >
                    Update Photo
                  </Button>
                </div>
              </Upload>
            ) : (
              <div className="relative">
                <Avatar
                  size={50}
                  style={{
                    borderColor: "transparent",
                    borderWidth: 2,
                    lineHeight: "40px",
                  }}
                  // src={userProfileImage}
                  src={image ? image : userProfileImage}
                />
              </div>
            )}
          </div>

          <div className="edit-btn flex justify-end">
            {isEdit ? (
              <div className="flex gap-4">
                <Button
                  danger
                  className="text-xs p-5 text-red"
                  size="large"
                  onClick={() => setIsEdit(false)}
                >
                  <span className="text-xs">CANCEL</span>
                </Button>
                <Button
                  style={{ background: "#30CEC2", borderColor: "transparent" }}
                  className="text-xs p-5"
                  size="large"
                  // loading={fetching}
                  onClick={() => form?.current?.submit()}
                >
                  <span className="text-xs text-white">SAVE</span>
                </Button>
              </div>
            ) : (
              <Button
                type="default"
                className="text-xs p-5"
                size="large"
                onClick={() => setIsEdit(true)}
              >
                <span className="text-xs">EDIT</span>
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
