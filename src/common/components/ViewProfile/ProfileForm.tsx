import { Form, Input, notification } from "antd";
import { useState } from "react";
import { useUpdateDoctorProfileMutation } from "../../../generated/graphql";
import {
  bioForm,
  professionalBGData,
  educationalBGData,
} from "../../../utils/helper";
import { Schedule } from "../../../utils/types";
import AboutMe from "../AboutMe/AboutMe";
import InputWithLi from "../InputWithLi/InputWithLi";
import LanguageList from "../Languages/LanguageList";
import MultiRangeDatePicker from "../MultiRangeDatePicker/MultiRangeDatePicker";

import _classes from "./PhysicianProfile.module.scss";
interface Props {
  doctorId?: string;
  doctorData: any;
  showLoginInfo?: boolean;
  schedules?: Schedule[] | undefined;
}

function ProfileForm({
  doctorId,
  doctorData,
  showLoginInfo,
  schedules,
}: Props) {
  const [formInstance] = Form.useForm();
  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const [image, setImage] = useState<string>("");
  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};
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

  return (
    <div className="w-full pb-10">
      <Form
        form={formInstance}
        name="basic"
        onFinish={onFinish}
        layout="vertical"
      >
        {bioForm.map((item, index) => {
          return (
            <div className="flex flex-row gap-3" key={index}>
              {item.map((val, valIndex) => {
                return (
                  <Form.Item
                    label={val?.label || ""}
                    name={val?.name || ""}
                    className="flex-1"
                    key={valIndex}
                  >
                    {val.name === "password" ||
                    val.name === "confirmPassword" ? (
                      <Input.Password
                        // value={val || ""}
                        disabled={true}
                      />
                    ) : (
                      <Input
                        // value={val || ""}
                        disabled={true}
                      />
                    )}
                  </Form.Item>
                );
              })}
            </div>
          );
        })}

        <LanguageList />
        <AboutMe />

        <InputWithLi disable={true} />

        <MultiRangeDatePicker disable={true} schedules={schedules} />
        <div className={`my-6 ${_classes["professional"]}`}>
          <h5>Professional Background</h5>
          {professionalBGData.map((item) => {
            return item.map((val, index) => {
              return (
                <div className="border-b border-gray-4 my-3" key={index}>
                  <Form.Item
                    label={val?.label || ""}
                    name={val?.name || ""}
                    className="flex-1"
                  >
                    <Input
                      value={val.value || ""}
                      defaultValue={val.defaultValue || ""}
                      disabled={true}
                    />
                  </Form.Item>
                </div>
              );
            });
          })}
        </div>

        <div className={`my-6 ${_classes["educational"]}`}>
          <h6>Educational Background</h6>
          {educationalBGData.map((item, index) => {
            return item.map((val) => {
              return (
                <div
                  className={`${index === 0 && "border-b border-gray-4"} my-3`}
                  key={index}
                >
                  <Form.Item
                    label={val?.label || ""}
                    name={val?.name || ""}
                    className="flex-1"
                  >
                    <Input
                      value={val.value || ""}
                      defaultValue={val.defaultValue || ""}
                      disabled={true}
                    />
                  </Form.Item>
                </div>
              );
            });
          })}
          {showLoginInfo && (
            <div className={`my-6 ${_classes["educational"]}`}>
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
          )}
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;
