import React, { useEffect, useRef, useState } from "react";
import { Avatar, Tabs, Button, notification } from "antd";
import Router from "next/router";
import Image from "next/image";
// import S3 from "react-aws-s3-typescript";
import ReactS3Client from "react-aws-s3-typescript";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import PersonalInfoList from "../../../../modules/common/components/PersonalInfoList/PersonalInfoList";
import { PersonalInfoDetail } from "../../../../modules/common/components/PersonalInfoDetail/PersonalInfoDetail";
import {
  useGetUserQuery,
  User,
  useUpdateUserProfileMutation,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { date } from "../../../utils";
import { UploadChangeParam } from "antd/lib/upload";
import config from "../../../../../config";

const { TabPane } = Tabs;

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  // GET USER ID
  const { user } = getUserData();
  const id: number = user?.id;

  const form: any = useRef();

  // GET USER DATA API CALL
  // const [{ data: createCardsData }, executeCardMutation] =
  const [{ data: userData }] = useGetUserQuery({
    variables: { input: id },
  });

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profileImage: userProfileImage } =
    userData?.user?.patientProfile || {};

  // UPDATE USER PROFILE
  const [, updateUserProfile] = useUpdateUserProfileMutation();

  const updateUserDetail = async (values: any) => {
    console.log({ values });
    // return null;
    try {
      await updateUserProfile({
        id: id,
        updateUserInput: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          gender: values?.gender,
          // date_of_birth: values?.date_of_birth,
          date_of_birth: date.convertBirthDateToUTC(values.date_of_birth._i),
          country_id: Number(values?.country_id),
          contact_number: values?.conntactNumber,
          city_id: Number(values?.city_id),
          password: values?.password,
          state_id: Number(values?.state_id),
          zip_code: values?.postalCode,
          streetAddress: values?.streetAddress,
          maritalStatus: values?.maritalStatus,
          // profileImage: image,
          profileImage:
            "https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg",
          children: Number(values?.children),
          occupation: values?.occupation,
          occupationalExposure: values?.occupationalExposure,
          exposureDuration: values?.exposureDuration,
          pets: values?.pets,
        },
      });
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
  const listFiles = async () => {
    const s3 = new ReactS3Client(configS3);

    try {
      const fileList = await s3.listFiles();

      console.log(fileList);
      /*
       * {
       *   Response: {
       *     message: "Objects listed succesfully",
       *     data: {                   // List of Objects
       *       ...                     // Meta data
       *       Contents: []            // Array of objects in the bucket
       *     }
       *   }
       * }
       */
    } catch (exception) {
      console.log(exception);
      /* handle the exception */
    }
  };

  const fileChange = async (info: UploadChangeParam) => {
    const s3 = new ReactS3Client(configS3);

    try {
      const url = await s3.uploadFile(info.file.originFileObj as File);
    } catch (error: any) {
      console.log("error", error);

      notification.error({
        message: error?.message || "Something went wrong",
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
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            <Upload
              onChange={fileChange}
              maxCount={1}
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              customRequest={() => null}
            >
              <div className="relative">
                <Avatar
                  size={50}
                  style={{
                    borderColor: "transparent",
                    borderWidth: 2,
                    lineHeight: "40px",
                  }}
                />
              </div>
            </Upload>
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
            // onFinish={(values) => updateUserDetail( values )}
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
