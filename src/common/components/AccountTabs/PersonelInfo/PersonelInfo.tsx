import React, { useRef, useState } from "react";
import { Avatar, Button, notification } from "antd";
// import ReactS3Client from "react-aws-s3-typescript";
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
import { useMediaUploader } from "common/hooks/media";
import userDefaultPicture from "../../../../../public/assets/images/profile.jpg";
import Image from "next/image";

const PersonalInfo = () => {
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

  const updateUserDetail = async (values: any) => {
    try {
      const res = await updateUserProfile({
        id: id as number,
        updateUserInput: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          gender: values?.gender,
          date_of_birth: new Date(values.date_of_birth).toLocaleDateString(),
          country_id: Number(values?.country_id),
          contact_number: values?.conntactNumber,
          city_id: Number(values?.city_id),
          password: values?.password,
          state_id: Number(values?.state_id),
          zip_code: values?.postalCode,
          streetAddress: values?.streetAddress,
          maritalStatus: values?.maritalStatus,
          profileImage: image ? image : userProfileImage,
          haveChildren: values?.haveChildren ? "No" : "Yes",
          children: Number(values?.children) | 0,
          occupation: values?.occupation,
          occupationalExposure: values?.occupationalExposure,
          exposureDuration: values?.exposureDuration,
          pets: values?.pets,
        },
      });

      if (res) {
        res?.data?.updateUser &&
          notification.success({
            message: "Successfully Updated",
          });
        executeUseGetUserQuery({ requestPolicy: "network-only" });
      }

      if (res?.error) {
        notification.error({
          message:
            res?.error?.graphQLErrors[0]?.message || "Something went wrong",
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
            <Image
              priority={true}
              alt="Profile Image"
              height="74"
              width="74"
              onError={(e) => console.log(e)}
              src={image || userProfileImage || userDefaultPicture}
              className="bg-gray border rounded-full border-gray"
            />
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
                  <Button
                    type="link"
                    className="text-primary underline text-xs"
                  >
                    Update photo
                  </Button>
                </div>
              </Upload>
            )}
          </div>

          <div className="edit-btn">
            {isEdit ? (
              <div className="flex gap-4 flex-wrap">
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
                  onClick={onSave}
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
                <span className="text-xs">Edit</span>
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
