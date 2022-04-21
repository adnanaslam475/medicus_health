/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import end from "./../../../../../public/assets/images/engFlag.png";
import esp from "./../../../../../public/assets/images/espanolFlag.png";
import _classes from "./PhysicianProfile.module.scss";

import yourImage from "../../../../../public/assets/images/your_photo.png";
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
const { TextArea } = Input;
const { RangePicker } = DatePicker;

import {
  useEnableOrDisableDoctorMutation,
  useUpdateDoctorProfileMutation,
} from "../../../../generated/graphql";
import ReactS3Client from "react-aws-s3-typescript";
import config from "../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import Language from "../../../admin/components/Languague/Language";
import InputWithLi from "../InputWithLi/InputWithLi";
import MultiRangeDatePicker from "../MultiRangeDatePicker/MultiRangeDatePicker";

const { Option } = Select;

export const ViewProfile = React.forwardRef(function Profile({
  doctorId,
  doctorData,
  setIsEdit,
}: any) {
  const { Option } = Select;
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
      if (doctorData) {
        prepareAndSetEditPayload();
      }
    }
  }, [doctorData]);

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
    } catch (error) {}
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
          profile_image: image ? image : userProfileImage,
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

  function handleMenuClick(e: object) {
    console.log("click", e);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Published</Menu.Item>
      <Menu.Item key="2">Unpublished</Menu.Item>
    </Menu>
  );

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
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  pr-0 2xl:pr-40 gap-3">
        <div className="flex flex-col w-full justify-start  py-3">
          <div className="w-full mb-10 flex gap-8 items-center">
            {/* <Upload
							onChange={fileChange}
							maxCount={1}
							beforeUpload={onBeforeUpload}
							itemRender={() => <div />}
							customRequest={() => null}
						> */}
            <div className="relative">
              <Avatar
                // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                size={130}
                style={{
                  borderColor: "transparent",
                  borderWidth: 2,
                  lineHeight: "40px",
                }}
                src={userProfileImage}
              />
            </div>
            {/* </Upload> */}

            <div>
              {/* <span>{doctorId}</span> */}
              <h2 className="mb-0">
                {first_name ? `${first_name} ${last_name}` : ""}
              </h2>
              <span className="block">{email}</span>
              <div className="flex gap-2 pt-2">
                <Button
                  type="primary"
                  style={{
                    background: "#E2F8F7",
                    borderColor: "#E2F8F7",
                    color: "#30CEC2",
                  }}
                  className={`${_classes["published-button"]}`}
                >
                  {status ? "Published" : "Unpublished"}
                </Button>

                <Button
                  type="default"
                  className={`${_classes["edit-button"]}`}
                  onClick={() => setIsEdit(true)}
                >
                  <EditOutlined />
                  Edit Info
                </Button>
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
              <div className="flex flex-row gap-3">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  className="flex-1"
                >
                  <Input disabled defaultValue="usama" />
                </Form.Item>
                <Form.Item label="Last name" name="lastName" className="flex-1">
                  <Input disabled defaultValue="khan" />
                </Form.Item>
              </div>

              <div className="flex flex-row gap-3">
                <Form.Item
                  name="email"
                  // name={["user", "email"]}
                  label="Email"
                  className="flex-1"
                >
                  <Input disabled defaultValue="usama@gmail.com" />
                </Form.Item>
                <Form.Item
                  label="Contact Number"
                  name="contact"
                  className="flex-1"
                >
                  <Input disabled defaultValue="090078601" />
                </Form.Item>
              </div>
              <div className="flex flex-row gap-3">
                <Form.Item label="Password" name="password" className="flex-1">
                  <Input.Password disabled />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  className="flex-1"
                >
                  <Input.Password disabled />
                </Form.Item>
              </div>
              {/* <Form.Item>
                <div className="flex items-center justify-end">
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </div>
              </Form.Item> */}
            </Form>
            <Form layout="vertical">
              <div className="mr-auto font-medium text-lightBold-1 my-2">
                Languages
              </div>
              <div className="flex mr-auto">
                <Language
                  end={end}
                  title="English"
                  check={true}
                  disable={true}
                />
                <Language
                  end={esp}
                  title="Spanish"
                  check={false}
                  disable={true}
                />
              </div>
              <div className="mt-5">
                <Form.Item label="About me" name="about" className="flex-1">
                  <TextArea
                    rows={10}
                    placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
                    maxLength={6}
                    disabled
                  />
                </Form.Item>
              </div>

              <InputWithLi disable={true} />
              <MultiRangeDatePicker disable={true} />
              <div className={`my-6 ${_classes["professional"]}`}>
                <h5>Professional Background</h5>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Role" name="role" className="flex-1">
                    <Input defaultValue="University" disabled />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="Role" name="role" className="flex-1">
                    <Input defaultValue="University" disabled />
                  </Form.Item>
                </div>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="Hospital/Clinic/Institution"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "role" }]}
                    className="flex-1"
                  >
                    <Input defaultValue="University" disabled />
                  </Form.Item>
                </div>
              </div>

              <div className={`my-6 ${_classes["educational"]}`}>
                <h6>Educational Background</h6>
                <div className="border-b border-gray-4 my-3">
                  <Form.Item
                    label="University/Institution"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    label="Degree/Diploma/Certification"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="my-3">
                  <Form.Item
                    label="University/Institution"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    label="Degree/Diploma/Certification"
                    name="institute"
                    className="flex-1"
                  >
                    <Input
                      value="University of Oklahoma College of Medicine"
                      defaultValue="University of Oklahoma College of Medicine"
                      disabled
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
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
          </div>
        </div>
      </div>
    </div>
  );
});
