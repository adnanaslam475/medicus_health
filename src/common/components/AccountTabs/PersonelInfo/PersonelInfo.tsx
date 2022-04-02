import React, { useEffect, useRef, useState } from "react";
import { Avatar, Tabs, Button } from "antd";
import Router from "next/router";
import Image from "next/image";
import yourImage from "../../../../../public/assets/images/your_photo.png";
import PersonalInfoList from "../../../../modules/common/components/PersonalInfoList/PersonalInfoList";
import { PersonalInfoDetail } from "../../../../modules/common/components/PersonalInfoDetail/PersonalInfoDetail";
import {
  useGetUserQuery,
  User,
  useUpdateUserProfileMutation,
} from "../../../../generated/graphql";
import { getUserData } from "../../../utils/userData";
// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;

const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState(false as boolean);

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
    try {
      await updateUserProfile({
          id: 405,
          updateUserInput: {
            first_name: values?.first_name,
            last_name: values?.lastName,
            email: values?.email,
            gender: "gender",
            date_of_birth: values?.dateOfbirth,
            country_id: values?.country,
            contact_number: values?.conntactNumber,
            city_id: 34,
            password: values?.city,
            state_id:values?. state,
            role:"Doctor",
            zip_code: values?.postalCode,
            streetAddress:values?.streetAddress,
            // patientProfile:{
            //   maritalStatus: "",
            //   profileImage
            //   children: "",
            //   occupation: "",
            //   occupationalExposure: "",
            //   pets: ""
            // }
          },
      });
    } catch (error) {
      console.log(error)
    }
  };

  console.log("result",result)

  return (
    <>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <div className="flex w-1/2 justify-start items-center py-3 pl-0 pr-3">
            <Avatar
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
              Update Photo
            </a>
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
