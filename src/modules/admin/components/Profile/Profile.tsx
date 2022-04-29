/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import end from "./../../../../../public/assets/images/engFlag.png";
import esp from "./../../../../../public/assets/images/espanolFlag.png";
import editicon from "../../../../../public/assets/icon/edit.svg";
import {
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
} from "antd";
import _classes from "./PhysicianProfile.module.scss";
const { TextArea } = Input;

import {
  DoctorProfile,
  useEnableOrDisableDoctorMutation,
  useUpdateDoctorProfileMutation,
} from "../../../../generated/graphql";
import ReactS3Client from "react-aws-s3-typescript";
import config from "../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import Language from "../../../admin/components/Languague/Language";
import InputWithLi from "common/components/InputWithLi/InputWithLi";
import MultiRangeDatePicker from "common/components/MultiRangeDatePicker/MultiRangeDatePicker";
import { configS3 } from "utils/helper";
import { Schedule } from "utils/types";

type profileType = {
  doctorId: string;
  doctorData: any;
  setIsEdit: (e: boolean) => void;
  schedules: Schedule[] | undefined;
  setDeleteScheduleId: (e: string) => void;
  setAddScheduleTime: (e: [string, string]) => void;
  setAddScheduleDay: React.Dispatch<React.SetStateAction<string>>;
  setAddScheduleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  edit: () => void;
};

export const Profile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
  schedules,
  setDeleteScheduleId,
  setAddScheduleTime,
  setAddScheduleDay,
  setAddScheduleClick,
}: profileType) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");
  const [ispublish, setIsPublish] = useState(true);

  const { first_name, last_name, password, email, contact_number, status } =
    doctorData?.user || {};

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};

  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

  useEffect(() => {
    if (doctorData) {
      prepareAndSetEditPayload();
    }
  }, [doctorData]);
  console.log("doctorDatadoctorDatadoctorData", doctorData);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      contact: contact_number,
      email: email,
      password: "",
      confirmPassword: "",
    });
  }

  const onFinish = async (values: any) => {
    try {
      updateDoctorProfile(values);
      setIsEdit(false);
    } catch (error) {
      setIsEdit(true);
    }
  };

  const updateDoctorProfile = async (values: any) => {
    if (doctorData) {
      const res = await updateDoctor({
        updateDoctorProfileInput: {
          doctor_id: Number(doctorId),
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          password: values?.password,
          profile_image: image || userProfileImage,
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
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <Upload
              onChange={fileChange}
              maxCount={1}
              beforeUpload={onBeforeUpload}
              itemRender={() => <div />}
              customRequest={() => null}
            >
              <div className="relative">
                <Avatar
                  size={130}
                  className="border-transparent border-2 leading-10"
                  src={image ? image : userProfileImage}
                />
                <span className="rounded-full absolute p-1 right-0 bottom-0">
                  <Image
                    alt=""
                    src={editicon}
                    width={30}
                    height={30}
                    className="border rounded border-gray-2"
                  />
                </span>
              </div>
            </Upload>

            <div>
              {/* <span>{doctorId}</span> */}
              <h2 className="mb-0">
                {first_name ? `${first_name} ${last_name}` : ""}
              </h2>
              <span className="block">{email}</span>
              <div className=" grid grid-cols-2 gap-3">
                <div className="lg:ml-0 mt-0 sm:mt-0 pt-2">
                  <Button
                    type="primary"
                    className={`${_classes["published-button"]}`}
                    onClick={handleChange}
                  >
                    {status ? "Published" : "Unpublished"}
                  </Button>
                </div>
                {/* <Button type="default" className="px-0 mx-0">
                  <EditOutlined />
                  Edit Info
                </Button> */}
              </div>
            </div>
          </div>

          <div className="w-full pb-10">
            <Form
              form={formInstance}
              name="basic"
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "First Name!" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last Name!" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  name="email"
                  // name={["user", "email"]}
                  label="Email"
                  rules={[{ type: "email" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  label="Password"
                  name="password"
                  // rules={[{ required: true, message: "Password" }]}
                  className="flex-1"
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  // rules={[{ required: true, message: "Confirm password!" }]}
                  className="flex-1"
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <Form.Item>
                <div className="flex items-center justify-end gap-2">
                  <Button type="default" onClick={() => setIsEdit(false)}>
                    Close
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Form layout="vertical">
              <div className="font-medium text-lightBlue-1 my-2">Languages</div>
              <div className="flex mr-auto">
                <Language
                  end={end}
                  title="English"
                  check={true}
                  disable={false}
                />
                <Language
                  end={esp}
                  title="Spanish"
                  check={false}
                  disable={false}
                />
              </div>
              <div className="mt-5">
                <Form.Item
                  label="About me"
                  name="about"
                  className={`{${_classes["font-size-custom"]}}`}
                >
                  <TextArea
                    rows={10}
                    placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
                    maxLength={6}
                  />
                </Form.Item>
              </div>

              <InputWithLi disable={false} />

              {/* Its editable component so all props are required */}
              <MultiRangeDatePicker
                disable={false}
                schedules={schedules}
                setDeleteScheduleId={setDeleteScheduleId}
                setAddScheduleTime={setAddScheduleTime}
                setAddScheduleDay={setAddScheduleDay}
                setAddScheduleClick={setAddScheduleClick}
              />
              <div className={`my-6 ${_classes["professional"]}`}>
                <h5>Professional Background</h5>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "Hospital/Clinic/Institution",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: false, message: "role" }]}
                    className="flex-1"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "Hospital/Clinic/Institution",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: false, message: "role" }]}
                    className="flex-1"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "Hospital/Clinic/Institution",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: false, message: "role" }]}
                    className="flex-1"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className={`my-6 ${_classes["educational"]}`}>
                <h6>Educational Background</h6>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="University/Institution"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "University/Institution",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                  <Form.Item
                    label="Degree/Diploma/Certification"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "Degree/Diploma/Certification",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                </div>
                <div className="my-3">
                  <Form.Item
                    label="University/Institution"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "University/Institution",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                  <Form.Item
                    label="Degree/Diploma/Certification"
                    name="institute"
                    rules={[
                      {
                        required: false,
                        message: "Degree/Diploma/Certification",
                      },
                    ]}
                    className="flex-1"
                  >
                    <Input value="University of Oklahoma College of Medicine" />
                  </Form.Item>
                </div>
              </div>
              {/* <div className=" bg-white -ml-7 fixed bottom-0  w-full  border-t border-gray-4  items-center ">
              <Form.Item className="">
                <div className="items-center  -mb-5 mt-2  w-4/5 xl:w-4/6 2xl:w-4/5 flex justify-end gap-3">
                  <Button htmlType="submit" className="">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" className="">
                    Save Changes
                  </Button>
                </div>
              </Form.Item>
            </div> */}
              {/* </Form> */}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
function updateDoctorProfileInput(updateDoctorProfileInput: any, arg1: string) {
  throw new Error("Function not implemented.");
}
