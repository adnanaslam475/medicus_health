/* eslint-disable react/jsx-key */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import end from "./../../../../../../../public/assets/images/engFlag.png";
import esp from "./../../../../../../../public/assets/images/espanolFlag.png";
import editicon from "../../../../../../../public/assets/icon/edit.svg";
import yourImage from "../../../../../../../public/assets/images/your_photo.png";
import {
  Table,
  Tag,
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Dropdown,
  Tabs,
  Badge,
  Modal,
  notification,
  Select,
  DatePicker,
} from "antd";
import _classes from "./EditProfile.module.scss";
import Language from "../../../../../admin/components/Languague/Language";
import InputWithLi from "common/components/InputWithLi/InputWithLi";
import MultiRangeDatePicker from "../../../../../../common/components/MultiRangeDatePicker/MultiRangeDatePicker";
import ReactS3Client from "react-aws-s3-typescript";
import error from "next/error";
import { info } from "sass";

import {
  DoctorProfile,
  useEnableOrDisableDoctorMutation,
  useUpdateDoctorProfileMutation,
} from "generated/graphql";
import { configS3 } from "../../../../../../utils/helper";
import config from "../../../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import { Schedule } from "utils/types";
import { RangeValue } from "rc-picker/lib/interface";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const { Option } = Select;

type Props = {
  doctorId?: string;
  doctorData?: DoctorProfile | any;
  setIsEdit: (e: boolean) => void;
  schedules: Schedule[] | undefined;
  setDeleteScheduleId: (e: string) => void;
  setAddScheduleTime: React.Dispatch<
    React.SetStateAction<{
      time: RangeValue<moment.Moment> | null;
      timeString: string[];
    }>
  >;
  setAddScheduleDay: React.Dispatch<React.SetStateAction<string | number>>;
  setAddScheduleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  onAddClick?: () => void;
  edit?: () => void;
  addScheduleTime?: {
    timeString: string[];
    time: RangeValue<moment.Moment> | null;
  };
  addScheduleDay: string;
  loading?: boolean;
};
function EditProfile({
  doctorId,
  doctorData,
  setIsEdit,
  schedules,
  setDeleteScheduleId,
  setAddScheduleTime,
  setAddScheduleDay,
  loading,
  addScheduleDay,
  setAddScheduleClick,
  onAddClick,
  addScheduleTime,
}: Props) {
  const { Option } = Select;
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");
  const [ispublish, setIsPublish] = useState(true);

  const { first_name, last_name, password, email, contact_number, status } =
    doctorData?.user || {};

  console.log(doctorData, "doctorData");

  const {
    about_me,
    condition_treated,
    doctor_id,
    language,
    educational_background,
    professional_experience,
  } = doctorData || {};

  const educationalBackground = JSON.parse(educational_background) || [];

  const professionalExperience = JSON.parse(professional_experience) || [];

  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};
  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: first_name,
      lastName: last_name,
      contact: contact_number,
      email: email,
      password: "",
      confirmPassword: "",
      ["eb-institution-0"]: educationalBackground[0]?.institution,
      ["eb-degree-0"]: educationalBackground[0]?.degree,
      ["eb-institution-1"]: educationalBackground[1]?.institution,
      ["eb-degree-1"]: educationalBackground[1]?.degree,

      ["pe-institution-0"]: professionalExperience[0]?.institution,
      ["pe-role-0"]: professionalExperience[0]?.role,
      ["pe-institution-1"]: professionalExperience[1]?.institution,
      ["pe-role-1"]: professionalExperience[1]?.role,
      ["pe-institution-2"]: professionalExperience[2]?.institution,
      ["pe-role-2"]: professionalExperience[2]?.role,
      about_me: about_me,
    });
  }

  const updateDoctorProfile = async (values: any) => {
    if (doctorData) {
      const res = await updateDoctor({
        updateDoctorProfileInput: {
          doctor_id: doctor_id,
          first_name: values?.firstName,
          last_name: values?.lastName,
          email: values?.email,
          password: values?.password,
          profile_image: image || userProfileImage,
          about_me: values?.about_me,
          condition_treated: condition_treated,
          language: language,
          educational_background: [
            {
              institution: values["eb-institution-0"],
              degree: values["eb-degree-0"],
            },
            {
              institution: values["eb-institution-1"],
              degree: values["eb-degree-1"],
            },
          ],
          // year_of_experience: year_of_experience,
          professional_experience: [
            {
              institution: values["pe-institution-0"],
              role: values["pe-role-0"],
            },
            {
              institution: values["pe-institution-1"],
              role: values["pe-role-1"],
            },
            {
              institution: values["pe-institution-2"],
              role: values["pe-role-2"],
            },
          ],
        },
      });
      console.log({ doctorData, res });

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

  const onFinish = async (values: any) => {
    try {
      updateDoctorProfile(values);
      setIsEdit(false);
    } catch (error) {
      setIsEdit(true);
    }
  };

  useEffect(() => {
    if (doctorData) {
      prepareAndSetEditPayload();
    }
  }, [doctorData]);

  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
  };

  const fileChange = async (info: UploadChangeParam) => {
    const s3 = new ReactS3Client(configS3);
    console.log({ s3 });
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
      id: Number(doctor_id),
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

  const handleConditionTreated = async (list: string[]) => {
    console.log({ list });
    const values = formInstance.getFieldsValue();
    const res = await updateDoctor({
      updateDoctorProfileInput: {
        doctor_id: doctor_id,
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        condition_treated: list.toString(),
      },
    });
    // if (res?.data) {
    //   res?.data?.updateDoctorProfile &&
    //     notification.success({
    //       message: "Updated Successfully",
    //     });
    // }

    if (res?.error) {
      res?.error?.graphQLErrors[0]?.message &&
        notification.error({
          message:
            res?.error?.graphQLErrors[0]?.message || "Something went wrong",
        });
    }
  };

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            <Upload
              maxCount={1}
              beforeUpload={onBeforeUpload}
              onChange={fileChange}
              itemRender={() => <div />}
              customRequest={() => null}
            >
              <div className="relative">
                <Avatar size={130} src={image || userProfileImage} />
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
              <h2 className="mb-0">
                {`${first_name && first_name} ${last_name && last_name}` || ""}
              </h2>
              <span className="block">{email}</span>
              <div className=" grid grid-cols-2 gap-3">
                <div className="lg:ml-0 mt-0 sm:mt-0 pt-2">
                  <Button
                    type="primary"
                    className={`${_classes["published-button"]}`}
                    // onClick={handleChange}
                  >
                    {status ? "Published" : "Unpublished"}
                  </Button>
                </div>
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
                  label="Email"
                  rules={[{ type: "email" }]}
                  className="flex-1"
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item label="Password" name="password" className="flex-1">
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  className="flex-1"
                  dependencies={["password"]}
                  rules={[
                    {
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>

              <InputWithLi disable={false} />

              <MultiRangeDatePicker
                loading={loading}
                disable={false}
                schedules={schedules}
                setDeleteScheduleId={setDeleteScheduleId}
                setAddScheduleTime={setAddScheduleTime}
                setAddScheduleDay={setAddScheduleDay}
                onAddClick={onAddClick}
                setAddScheduleClick={setAddScheduleClick}
              />
              <div className={`my-6 ${_classes["professional"]}`}>
                <h5>Professional Background</h5>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="pe-institution-0"
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
                    name="pe-role-0"
                    rules={[{ required: false, message: "role" }]}
                    className="flex-1"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="pe-institution-1"
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
                    name="pe-role-1"
                    rules={[{ required: false, message: "role" }]}
                    className="flex-1"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="pe-institution-2"
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
                    name="pe-role-2"
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
                    name="eb-institution-0"
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
                    name="eb-degree-0"
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
                    name="eb-institution-1"
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
                    name="eb-degree-1"
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

              <div className="mt-5">
                <Form.Item label="About me" name="about_me">
                  <TextArea
                    rows={10}
                    placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
                  />
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
              {/* <div className="mt-5">
                <Form.Item label="About me" name="about">
                  <TextArea
                    rows={10}
                    placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
                  />
                </Form.Item>
              </div> */}

              <InputWithLi
                disable={false}
                onChange={(list) => {
                  handleConditionTreated(list);
                }}
                initialValue={condition_treated?.split(",")}
              />
              {/* Physician - Account - Its editable component so all props are required */}
              <MultiRangeDatePicker
                loading={loading}
                disable={false}
                schedules={schedules}
                setDeleteScheduleId={setDeleteScheduleId}
                setAddScheduleTime={setAddScheduleTime}
                addScheduleTime={addScheduleTime}
                addScheduleDay={addScheduleDay}
                setAddScheduleDay={setAddScheduleDay}
                onAddClick={onAddClick}
              />

              <div className={`my-6 hidden ${_classes["educational"]}`}>
                <h6>Login Information</h6>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Email Address"
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
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
