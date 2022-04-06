import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
// import { useDoctorProfilesQuery } from "../../../../../generated/graphql";
import {
  Table,
  Tag,
  Modal,
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
  Select,
} from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import yourImage from "../../../../../../public/assets/images/your_photo.png";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
} from "../../../../../generated/graphql";
import dayjs from "dayjs";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function AdminPhysicianAdd() {
  // const [{ data }] = useDoctorProfilesQuery();
  // const { doctorProfiles } = data || {};

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const props = {
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
        // console.log("fileList", fileList);
        // console.log("file", file);
        setImage(file?.name);
      }
    },
  };

  const [form] = Form.useForm();
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();

  function selectCountryId(id: number): void {
    setCountryId(id);
  }

  function selectStateId(id: number): void {
    setStateId(id);
  }

  function disabledDate(current: any) {
    return current && current > dayjs().startOf("day");
  }

  const [getStatesByCountry] = useGetStatesByCountryQuery({
    variables: {
      input: countryId || 0,
    },
    pause: countryId === undefined,
  });

  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: stateId || 0,
    },
    pause: stateId === undefined,
  });

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add a Physician</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              <div className="w-full mb-10">
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
                  <Upload {...props}>Update Photo</Upload>
                </a>
              </div>
              <div className="w-full">
                <Form
                  name="addAPhysician"
                  // initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <div className="flex flex-row gap-3">
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

                  <div className="flex flex-row gap-0">
                    <Form.Item
                      name={["user", "email"]}
                      label="Email"
                      rules={[{ type: "email" }]}
                      className="flex-1"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex flex-row gap-3">
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: "Password" }]}
                      className="flex-1"
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      rules={[{ required: true, message: "Confirm password!" }]}
                      className="flex-1"
                    >
                      <Input.Password />
                    </Form.Item>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Form.Item
                      className="flex-1"
                      label="Specialization"
                      name="Specialization"
                      rules={[
                        {
                          required: true,
                          message: "Specialization",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  {/* Address, City, State, Country Postal Address */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <Form.Item
                      className="flex-1"
                      label="Street Address"
                      name="streetAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your street address",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Form.Item
                      className="flex-1"
                      label="Country"
                      name="country_id"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your country",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        filterOption={(input, country: any) =>
                          country.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) => {
                          selectCountryId(e);
                          form.setFieldsValue({
                            state_id: null,
                            city_id: null,
                          });
                        }}
                        placeholder="Country"
                      >
                        {React.Children.toArray(
                          countries?.map((el, i) => {
                            return (
                              <Select.Option value={el?.id}>
                                {el?.country_name}
                              </Select.Option>
                            );
                          })
                        )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="flex-1"
                      label="State"
                      name="state_id"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your state",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        filterOption={(input, state: any) =>
                          state.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) => {
                          selectStateId(e);
                          form.setFieldsValue({
                            city_id: null,
                          });
                        }}
                        placeholder="State"
                      >
                        {React.Children.toArray(
                          getStatesByCountry?.data?.getStatesByCountry?.map(
                            (el, i) => {
                              return (
                                <Select.Option value={el.id}>
                                  {el?.state_name}
                                </Select.Option>
                              );
                            }
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Form.Item
                      className="flex-1"
                      label="City"
                      name="city_id"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your city",
                        },
                      ]}
                    >
                      <Select
                        placeholder="City"
                        showSearch
                        filterOption={(input, city: any) =>
                          city.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {React.Children.toArray(
                          getCityByState?.data?.getCitiesByState?.map(
                            (el, i) => {
                              return (
                                <Select.Option value={el.id}>
                                  {el?.city_name}
                                </Select.Option>
                              );
                            }
                          )
                        )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="flex-1"
                      label="Postal Code"
                      name="zip_code"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your postal code",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <div className="flex items-center justify-end">
                      <Button type="primary" htmlType="submit">
                        Add Patient
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianAdd;
