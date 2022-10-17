import { Divider, Form, Input, notification } from "antd";
import { useState } from "react";
import { useUpdateDoctorProfileMutation } from "../../../generated/graphql";
import {
  bioForm,
  professionalBGData,
  educationalBGData,
  certificationBGPlaceholder,
  honorsBGPlaceholder,
} from "../../../utils/helper";
import { Schedule } from "../../types/types";
import AboutMe from "../AboutMe/AboutMe";
import InputWithLi from "common/components/InputWithLi/InputWithLi";
import LanguageList from "../Languages/LanguageList";
import MultiRangeDatePicker from "../MultiRangeDatePicker/MultiRangeDatePicker";

import _classes from "./PhysicianProfile.module.scss";
import TextArea from "antd/lib/input/TextArea";
interface Props {
  doctorId?: string;
  doctorData: any;
  showLoginInfo?: boolean;
  schedules?: Schedule[] | undefined;
  formInstance?: any;
  professionalExperience?: any;
  educationalBackground?: any;
  certificationBackground: any;
  honorsBackground: any;
}

type clinicType = {
  institution: string;
  role: string;
};

type educationType = {
  institution: string;
  degree: string;
};

function ProfileForm({
  doctorId,
  doctorData,
  showLoginInfo,
  schedules,
  formInstance,
  professionalExperience,
  educationalBackground,
  certificationBackground,
  honorsBackground,
}: Props) {
  // const [formInstance] = Form.useForm();
  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const [image, setImage] = useState<string>("");
  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage, condition_treated } =
    doctorData || {};
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
          specialization: values?.specialization,
          year_of_experience: values?.year_of_experience,
          contact_number: values?.contact_number,
          email: values?.email,
          password: values?.password,
          profile_image: image ? image : userProfileImage,
          streetAddress: values.street_address,
          city_id: values.city_id,
          country_id: values.country_id,
          state_id: values.state_id,
          zip_code: values.zip_code,
        },
      });

      if (res?.data) {
        res?.data?.updateDoctorProfile &&
          notification.success({
            message: "Updated successfully",
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
  let formatedLanguage =
    doctorData?.language !== undefined && doctorData?.language?.includes("{")
      ? JSON.parse(doctorData?.language)
      : doctorData?.language;
  return (
    <div className={`${_classes["profile-form"]} w-full pb-10`}>
      <Form
        form={formInstance}
        name="basic"
        onFinish={onFinish}
        layout="vertical"
      >
        {bioForm.map((item, index) => {
          return (
            <div className="flex flex-col sm:flex-row gap-3 " key={index}>
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
                      <Input.Password disabled={true} />
                    ) : (
                      <Input disabled={true} />
                    )}
                  </Form.Item>
                );
              })}
            </div>
          );
        })}

        <div className="my-6 mt-0 border-b border-gray-3 w-full"></div>
        <div className="my-6  border-b border-gray-3 w-full">
          <LanguageList disable={true} language={formatedLanguage} />
        </div>

        <AboutMe />
        <div className="my-6 mt-0 border-b border-gray-3 w-full"></div>

        {!condition_treated && (
          <div className="my-6 pb-[30px] border-b border-gray-3 w-full">
            <span className="font-medium text-lightBlue-1">
              Conditions treated
            </span>
            <br />
          </div>
        )}

        {condition_treated && (
          <InputWithLi
            disable={true}
            initialValue={condition_treated && condition_treated?.split(",")}
          />
        )}

        <MultiRangeDatePicker disable={true} schedules={schedules} />

        <div
          className={`my-6 border-b border-gray-3 ${_classes["professional"]}`}
        >
          <h5 className={`pb-[15px] ${_classes["wordspacing-5"]}`}>
            Certification & licensure
          </h5>
          {certificationBackground?.map((certificate: any, index: number) => {
            return (
              <div className=" my-3 py-3 pb-[8px] mb-[0px]" key={index}>
                <Form.Item className="flex-1">
                  {/* <Input
                    name={`certification_and_licensure`}
                    value={certificate?.certification_and_licensure}
                    disabled
                  /> */}
                  <TextArea
                    name={`certification_and_licensure`}
                    value={certificate?.certification_and_licensure}
                    disabled
                    rows={3}
                    // placeholder="certificates and licensure details"
                  />
                </Form.Item>
              </div>
            );
          })}
          {!certificationBackground &&
            certificationBGPlaceholder.map((item) => {
              return item.map((val: any, index: number) => {
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

        <div
          className={`my-6 border-b border-gray-3 ${_classes["professional"]}`}
        >
          <h5 className={`pb-[15px] ${_classes["wordspacing-5"]}`}>
            Professional background
          </h5>
          {professionalExperience?.map((clinic: clinicType, index: number) => {
            return (
              <div className="border-b border-gray-4 my-3" key={index}>
                <Form.Item
                  label="Hospital/Clinic/Institution"
                  rules={[
                    {
                      required: false,
                      message: "Hospital/Clinic/Institution",
                    },
                  ]}
                  className="flex-1"
                >
                  <Input
                    name={`institution`}
                    value={clinic?.institution}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label="Role"
                  rules={[{ required: false, message: "role" }]}
                  className="flex-1"
                >
                  <Input value={clinic?.role} name={`role`} disabled />
                </Form.Item>
              </div>
            );
          })}
          {!professionalExperience &&
            professionalBGData.map((item) => {
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

        <div
          className={`my-6 border-b border-gray-3 ${_classes["educational"]}`}
        >
          <h6 className={`pb-[15px] ${_classes["wordspacing-5"]}`}>
            Educational background
          </h6>
          {educationalBackground &&
            educationalBackground?.map(
              (education: educationType, index: number) => {
                return (
                  <div className="border-b border-gray-4 my-3" key={index}>
                    <Form.Item
                      label="University/Institution"
                      rules={[
                        {
                          required: false,
                          message: "University/Institution",
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input value={education?.institution} disabled />
                    </Form.Item>
                    <Form.Item
                      label="Degree/Diploma/Certification"
                      rules={[
                        {
                          required: false,
                          message: "Degree/Diploma/Certification",
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input value={education?.degree} disabled />
                    </Form.Item>
                  </div>
                );
              }
            )}
          {!educationalBackground &&
            educationalBGData.map((item, index) => {
              return item.map((val) => {
                return (
                  <div
                    className={`${
                      index === 0 && "border-b border-gray-4"
                    } my-3`}
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
                  label="Email address"
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
                    label="Confirm password"
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

        <div
          className={`my-6 border-b border-gray-3 ${_classes["professional"]}`}
        >
          <h5 className={`pb-[15px] ${_classes["wordspacing-5"]}`}>
            Awards, honors & recognition
          </h5>
          {honorsBackground?.map((honor: any, index: number) => {
            return (
              <div className="my-3 py-3" key={index}>
                <Form.Item className="flex-1">
                  <Input
                    name={`awards_honors_and_recognition`}
                    value={honor?.awards_honors_and_recognition}
                    disabled
                  />
                </Form.Item>
              </div>
            );
          })}
          {!honorsBackground &&
            honorsBGPlaceholder.map((item) => {
              return item.map((val: any, index: number) => {
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
      </Form>
    </div>
  );
}

export default ProfileForm;
