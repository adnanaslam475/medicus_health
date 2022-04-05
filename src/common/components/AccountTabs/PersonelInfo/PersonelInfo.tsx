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

// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState(false as boolean);
  const [image, setImage] = useState("" as string);

  // GET USER ID
  const { user } = getUserData();
  const id: number = user?.id;

  const form: any = useRef();

  // GET USER DATA API CALL
  // const [{ data: createCardsData }, executeCardMutation] =
  const [{ data: userData }] = useGetUserQuery({
    variables: { input: id },
  });

  // UPDATE USER PROFILE
  const [result, updateUserProfile] = useUpdateUserProfileMutation();

  const updateUserDetail = async (values: any) => {
    console.log("values", values);
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
          country_id: Number(values?.country),
          contact_number: values?.conntactNumber,
          city_id: Number(values?.city),
          password: values?.password,
          state_id: Number(values?.state),
          zip_code: values?.postalCode,
          streetAddress: values?.streetAddress,
          maritalStatus: values?.maritalStatus,
          // profileImage: image,
          profileImage:"https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg",
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

  // const region = "us-east-1";
  // const bucketName = "aims-pro";
  // const accessKeyId = "AKIAUT3OWCGNAONYU3PG";
  // const secertAccessKey = "hkyTLeIbclNx5k1q2mxGKgDy8Ud9KLlHddZPmEC6";

//   const region = "us-east-2";
// const bucketName = "medicus-dev2";
// const accessKeyId = "AKIAUT3OWCGNAONYU3PG";
// const secertAccessKey = "hkyTLeIbclNx5k1q2mxGKgDy8Ud9KLlHddZPmEC6";

const region = "us-east-1";
const bucketName = "medicus-test-1";
const accessKeyId = "AKIAX5BHJZJDOJH2ROOU";
const secertAccessKey ="6M0qn9yrL8IMJ+5H/exVshAOocRsTgIyQqTgcwKJ";


  const config = {
    region: region,
    bucketName: bucketName,
    accessKeyId: accessKeyId,
    secretAccessKey: secertAccessKey,
  };
  const listFiles = async () => {
    /* Import s3 config object and call the constrcutor */
    const s3 = new ReactS3Client(config);

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
    console.log("info", info);
    const s3 = new ReactS3Client(config);

    try {
      const url = await s3.uploadFile(info.file.originFileObj as File);
      console.log("url", url);
    } catch (error) {
      console.log("error", error);

      notification.error({
        message: error?.message || "Something went wrong",
      });
    }
  };
  const onBeforeUpload = (file: File) => {
    const isPNG = file.type === "image/png";
    const isJPG = file.type === "image/jpeg";
    // if (!isPNG && !isJPG) {
    //   notification.error({ message: "This file type is not accepted" });
    // }
    return isPNG || isJPG || Upload.LIST_IGNORE;
  };

  useEffect(() => {
    listFiles();
  }, []);
  return (
    <>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            {/* <Avatar
              size={64}
              src={
                <Image
                  alt=""
                  src={yourImage}
                  width={128}
                  height={128}
                  className="border rounded border-gray-2"
                />
              }
            />
            <a
              href="javascript:void(0)"
              className="text-primary underline ml-3 text-xs"
            >
              <Upload accept=".png, .jpg, .jpeg" customRequest={() => null}>
                Update Photo
              </Upload>
            </a> */}
            {/* <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}

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
                  // icon={<UserOutlined />}
                  // src={organizationDetails?.organization_image}
                  style={{
                    borderColor: "purple",
                    borderWidth: 2,
                    lineHeight: "40px",
                  }}
                />
                <span className="rounded-full absolute p-1 left-8 -top-2">
                  <Avatar
                    style={{
                      backgroundColor: "purple",
                      width: "15px",
                      height: "15px",
                      padding: "20%",
                    }}
                    size="small"
                    src="/assets/icons/editAvatar.png"
                  />
                </span>
              </div>
            </Upload>
          </div>

          <div className="edit-btn flex justify-end">
            {/* <Button
                type="default"
                className="text-xs p-5"
                size="large"
                // onClick={() => setIsEdit(true)}
              >
                <span className="text-xs">EDIT</span>
              </Button> */}
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
