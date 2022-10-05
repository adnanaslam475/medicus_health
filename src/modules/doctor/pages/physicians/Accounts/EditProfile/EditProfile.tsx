/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import end from "./../../../../../../../public/assets/images/engFlag.png";
import esp from "./../../../../../../../public/assets/images/espanolFlag.png";
import editicon from "../../../../../../../public/assets/icon/edit.svg";
import {
  Avatar,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Select,
  DatePicker,
  Tooltip,
} from "antd";
import _classes from "./EditProfile.module.scss";
import InputWithLi from "common/components/InputWithLi/InputWithLi";
import MultiRangeDatePicker from "common/components/MultiRangeDatePicker/MultiRangeDatePicker";
import ReactS3Client from "react-aws-s3-typescript";
import {
  LoginUserInput,
  useCountriesQuery,
  useDeleteDoctorMutation,
  useEnableOrDisableDoctorMutation,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  useGetTimeZonesQuery,
  useGetUserQuery,
  User,
  useUpdateDoctorProfileMutation,
} from "generated/graphql";
import config from "../../../../../../../config";
import { UploadChangeParam } from "antd/lib/upload";
import { Schedule } from "common/types/types";
import { RangeValue } from "rc-picker/lib/interface";
import { parseJson } from "common/utils/helper";
import { getRole, getUserData } from "common/utils/userData";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Router, { useRouter } from "next/router";
import userDefaultPicture from "../../../../../../../public/assets/images/profile.svg";
import {
  CloseOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUserData } from "common/components/Context/UserContext";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { graphqlError, timezoneLabel } from "utils/helper";
import { GraphQLError } from "graphql";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
// import ConfirmationModal from "modules/admin/pages/AdminPatientListingDetail/ConfirmationModal";

const { TextArea } = Input;

type clinicType = {
  institution: string;
  role: string;
};

type Props = {
  doctorId?: string;
  doctorData?: User | any;
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
  setProfileUpdated?: any;
  deleteScheduleFetching?: boolean;
  showCancelScheduleModal?: boolean;
  setShowCancelScheduleModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
type LanguageType = {
  Spanish?: boolean;
  English?: boolean;
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
  setProfileUpdated,
  deleteScheduleFetching,
  showCancelScheduleModal,
  setShowCancelScheduleModal,
}: Props) {
  const [formInstance] = Form.useForm();
  const [image, setImage] = useState<string>("");
  const [physicianLanguage, setPhysicianLanguage] = useState<LanguageType>({
    Spanish: false,
    English: false,
  });
  const user = getUserData();
  const { email: loggedInUserEmail, id: loggedInUserId } = user?.user || {};

  const router = useRouter();

  const { pathname, query } = router || {};

  const [{ data: userData }] = useGetUserQuery({
    variables: { input: Number(doctorId) },
  });

  const {
    first_name: doctor_first_name,
    last_name: doctor_last_name,
    email: doctor_email,
    streetAddress: street_address,
    city_id: city_id,
    country_id: country_id,
    state_id: state_id,
    zip_code: zip_code,
  } = userData?.user || {};

  const {
    id,
    first_name,
    last_name,
    password,
    email,
    contact_number,
    status,
    doctorProfile,
    timeZone = 86,
  } = doctorData?.user || {};

  const {
    about_me,
    condition_treated,
    doctor_id,
    language,
    year_of_experience,
    educational_background,
    professional_experience,
    certification_and_licensure,
    awards_honors_recognition,
    specialization,
  } = doctorData || {};
  let formatedLanguage =
    doctorData?.language !== undefined && doctorData?.language?.includes("{")
      ? JSON.parse(doctorData?.language)
      : doctorData?.language;

  useEffect(() => {
    setPhysicianLanguage({
      English: formatedLanguage?.English || false,
      Spanish: formatedLanguage?.Spanish || false,
    });
  }, [language]);
  const { data: userContextData, saveUserData } = useUserData();
  const [open, setOpen] = React.useState<boolean>(false);

  const educationalBackground = parseJson(educational_background) || [];

  const professionalExperience = parseJson(professional_experience) || [];
  const certificationBackground = parseJson(certification_and_licensure) || [];
  const honorsBackground = parseJson(awards_honors_recognition) || [];

  const [clinicList, setClinicList] = useState([{ institution: "", role: "" }]);
  const [educationList, setEducationList] = useState([
    { institution: "", degree: "" },
  ]);

  const [certificationList, setCertificationList] = useState([
    { certification_and_licensure: "" },
  ]);
  const [honorsList, setHonorsList] = useState([
    { awards_honors_and_recognition: "" },
  ]);

  const [countryId, setCountryId] = useState<number | undefined>(
    Number(country_id)
  );
  const [stateId, setStateId] = useState<number | undefined>(Number(state_id));
  //GET USER PROFILE IMAGE FROM useGetUserQuery
  const { profile_image: userProfileImage } = doctorData || {};
  const [result, updateDoctor] = useUpdateDoctorProfileMutation();
  const { error, fetching } = result || {};

  const [data, EnableOrDisableDoctor] = useEnableOrDisableDoctorMutation();

  function selectCountryId(id: number): void {
    setCountryId(id);
    formInstance.resetFields(["state_id", "city_id"]);
  }

  function selectStateId(id: number): void {
    setStateId(id);
  }

  useEffect(() => {
    if (professionalExperience?.length) {
      setClinicList(professionalExperience);
    }
    if (educationalBackground?.length) {
      setEducationList(educationalBackground);
    }
    if (certificationBackground?.length) {
      setCertificationList(certificationBackground);
    }
    if (honorsBackground?.length) {
      setHonorsList(honorsBackground);
    }
  }, []);
  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      firstName: doctor_first_name,
      lastName: doctor_last_name,
      specialization: specialization || "",
      year_of_experience: year_of_experience || "",
      streetAddress: street_address,
      city_id: city_id || "",
      country_id: country_id || "",
      state_id: state_id || "",
      zip_code: zip_code || "",
      contact: contact_number || "",
      email: doctor_email,
      password: "",
      confirmPassword: "",
      about_me: about_me,
      language: language,
      condition_treated: conditionTreatedList || "",
      // timeZoneId: timeZone?.timeZone,
      timeZone: timeZone?.id || 86,
    });
  }
  const [conditionTreatedList, setConditionTreatedList] =
    useState<any>(condition_treated);

  useEffect(() => {
    if (condition_treated?.trim()) {
      setConditionTreatedList(condition_treated);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("appointmentsAlertData");
    Router.push("/login");
  };

  const [physicianTimeZoneId, setPhysicianTimeZoneId] = useState();

  useEffect(() => {
    if (physicianTimeZoneId) {
      const timeZone = getTimeZones?.data?.getTimeZones.filter(
        (item) => item.id === physicianTimeZoneId
      )[0]?.timeZone;
      localStorage.setItem("timeZone", JSON.stringify(timeZone));
    }
  }, [physicianTimeZoneId]);

  const updateDoctorProfile = async (values: any) => {
    // if (doctorData) {
    if (values?.timeZone) {
      setPhysicianTimeZoneId(values?.timeZone);
    }
    const res = await updateDoctor({
      updateDoctorProfileInput: {
        doctor_id: pathname.includes("/admin/physicians")
          ? Number(query?.id)
          : Number(id) || Number(loggedInUserId),
        first_name: values?.firstName || "",
        last_name: values?.lastName || "",
        specialization: values?.specialization || "",
        year_of_experience: Number?.parseFloat(values?.year_of_experience || 0),
        streetAddress: values?.streetAddress,
        // contact_number: `+${values?.contact}`,
        contact_number: values?.contact,
        city_id: Number(values?.city_id || 0),
        country_id: Number(values?.country_id),
        state_id: Number(values?.state_id || 0),
        zip_code: values?.zip_code,
        email: values?.email || "",
        password: values?.password,
        profile_image: image || userProfileImage || "",
        about_me: values?.about_me || "",
        condition_treated: conditionTreatedList || "",
        language: physicianLanguage || "",
        educational_background: educationList?.map((item) => ({
          institution: item?.institution,
          degree: item?.degree,
        })),
        professional_experience: clinicList?.map((item) => ({
          institution: item?.institution,
          role: item?.role,
        })),
        certification_and_licensure: certificationList?.map((item) => ({
          certification_and_licensure: item?.certification_and_licensure,
        })),
        awards_honors_recognition: honorsList?.map((item) => ({
          awards_honors_and_recognition: item?.awards_honors_and_recognition,
        })),
        // timeZoneId: values?.timeZoneId,
        timeZoneId: values?.timeZone,
      },
    });

    if (res?.data) {
      res?.data?.updateDoctorProfile &&
        notification.success({
          message: "Updated successfully",
        });
      let loggedInUserData = localStorage.getItem("loggedInUserData");
      let updatedLoggedInUserData: LoginUserInput | any =
        loggedInUserData && JSON.parse(loggedInUserData);
      if (
        updatedLoggedInUserData?.user &&
        updatedLoggedInUserData?.user?.role === "Doctor"
      ) {
        updatedLoggedInUserData.user.first_name = values?.firstName;
        updatedLoggedInUserData.user.last_name = values?.lastName;
        if (updatedLoggedInUserData.user.doctorProfile) {
          updatedLoggedInUserData.user.doctorProfile.profile_image =
            image || userProfileImage;
        }
        localStorage.setItem(
          "loggedInUserData",
          JSON.stringify(updatedLoggedInUserData)
        );
      }
      saveUserData?.({
        firstName: values?.firstName,
        lastName: values?.lastName,
        profilePicture: image || userProfileImage,
      });

      setProfileUpdated?.(Math.random());
      if (getRole() === "Doctor") {
        //checking logged in user email matched with updated email
        let emailRegExpression = new RegExp(`^(${loggedInUserEmail})$`);
        let emailMatched = emailRegExpression.test(values?.email);

        // if user changed the email logged out the user
        if (!emailMatched) {
          notification.success({
            message: "Credentials Updated User Logged out",
          });
          logout();
        }
      }
    }

    if (res?.error) {
      let graphQLError = res?.error?.graphQLErrors[0]?.extensions
        ?.response as GraphQLError;
      let customError = res?.error?.graphQLErrors[0]?.extensions
        ?.exception as GraphQLError;
      let errorGraphQLMessage = res?.error?.graphQLErrors[0]?.message;
      let errorMessage =
        graphQLError?.message[0] ||
        customError?.message ||
        errorGraphQLMessage ||
        "Something went wrong";
      notification.error({
        message: errorMessage,
      });
    } else setIsEdit(false);

    // }
  };

  const onFinish = async (values: any) => {
    try {
      await updateDoctorProfile(values);
      // setIsEdit(false);
    } catch (error) {
      console.log("my error is", error);
      // setIsEdit(true);
    }
  };

  useEffect(() => {
    if (doctorData || userData?.user) {
      prepareAndSetEditPayload();
    }
  }, [doctorData, userData?.user]);

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

  async function handlePublish_Unpublish() {
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

  // const handleConditionTreated = async (list: string[]) => {
  //   const values = formInstance.getFieldsValue();
  //   const res = await updateDoctor({
  //     updateDoctorProfileInput: {
  //       doctor_id: pathname.includes("/admin/physicians")
  //         ? Number(query?.id)
  //         : Number(user?.user?.id),
  //       first_name: values?.firstName || "",
  //       last_name: values?.lastName || "",
  //       specialization: values?.specialization || "",
  //       year_of_experience: Number(values?.year_of_experience) || 0,
  //       streetAddress: values?.streetAddress,
  //       country_id: Number(values?.country || 0),
  //       state_id: Number(values?.state || 0),
  //       city_id: values?.city_id || 0,
  //       zip_code: values?.zip_code,
  //       email: values?.email || "",
  //       password: values?.password,
  //       profile_image: image || userProfileImage || "",
  //       about_me: values?.about_me || "",
  //       condition_treated: list.toString(),
  //       language: physicianLanguage || "",
  //       educational_background: educationList?.map((item) => ({
  //         institution: item?.institution,
  //         degree: item?.degree,
  //       })),
  //       professional_experience: clinicList?.map((item) => ({
  //         institution: item?.institution,
  //         role: item?.role,
  //       })),
  //     },
  //   });

  //   if (res?.error) {
  //     res?.error?.graphQLErrors[0]?.message &&
  //       notification.error({
  //         message:
  //           res?.error?.graphQLErrors[0]?.message || "Something went wrong",
  //       });
  //   }
  // };

  const handleChangeLanguage = (e: CheckboxChangeEvent, name: string) => {
    if (name === "English") {
      setPhysicianLanguage({ ...physicianLanguage, English: e.target.checked });
    }
    if (name === "Spanish") {
      setPhysicianLanguage({ ...physicianLanguage, Spanish: e.target.checked });
    }
  };

  let languageCheck =
    language?.English !== undefined ||
    language?.Spanish !== undefined ||
    language !== undefined;

  const addNewField = (fieldName: string) => {
    switch (fieldName) {
      case "clinic":
        setClinicList([...clinicList, { institution: "", role: "" }]);
        break;
      case "education":
        setEducationList([...educationList, { institution: "", degree: "" }]);
        break;
      case "certification":
        setCertificationList([
          ...certificationList,
          { certification_and_licensure: "" },
        ]);
        break;
      case "honors":
        setHonorsList([...honorsList, { awards_honors_and_recognition: "" }]);
        break;
      default:
        break;
    }
  };

  const removeField = (fieldName: string, index: number) => {
    switch (fieldName) {
      case "clinic":
        const clinicListLocal = [...clinicList];
        clinicListLocal?.splice(index, 1);
        setClinicList(clinicListLocal);
        break;
      case "education":
        const educationListLocal = [...educationList];
        educationListLocal?.splice(index, 1);
        setEducationList(educationListLocal);
        break;
      case "certification":
        const certificationListLocal = [...certificationList];
        certificationListLocal?.splice(index, 1);
        setCertificationList(certificationListLocal);
        break;
      case "honors":
        const honorsListLocal = [...honorsList];
        honorsListLocal?.splice(index, 1);
        setHonorsList(honorsListLocal);
        break;
      default:
        break;
    }
  };

  const handleClinicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const clinicListLocal = [...clinicList];
    //@ts-ignore
    clinicListLocal[index][name] = value;
    setClinicList(clinicListLocal);
  };

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const educationListLocal = [...educationList];
    //@ts-ignore
    educationListLocal[index][name] = value;
    setEducationList(educationListLocal);
  };

  const handleCertificationChange = (
    // e: React.ChangeEvent<HTMLInputElement>,
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const certificationListLocal = [...certificationList];
    //@ts-ignore
    certificationListLocal[index][name] = value;
    setCertificationList(certificationListLocal);
  };

  const handleHonorsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const honorsListLocal = [...honorsList];
    //@ts-ignore
    honorsListLocal[index][name] = value;
    setHonorsList(honorsListLocal);
  };

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

  const [{ data: countriesData }] = useCountriesQuery();
  const { countries } = countriesData || {};

  const onFinishedFailed = () => {
    window?.scrollTo(0, 0);
  };

  const [getTimeZones] = useGetTimeZonesQuery();

  const [{ fetching: deleteDoctorLoading }, executeUseDeleteDoctorMutation] =
    useDeleteDoctorMutation();

  const deleteAdminUser = async () => {
    try {
      const response = await executeUseDeleteDoctorMutation({
        id: Number(doctorId),
      });
      if (response?.error) {
        notification.error({ message: graphqlError(response) });
      }
      if (response.data) {
        notification.success({
          message: "User Delete Successfully",
        });
        Router.push(`/admin/physicians`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };

  return (
    <div className={`w-full ${_classes["profile"]}`}>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 pr-0 2xl:pr-40 gap-3">
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
                <Avatar
                  size={{ xs: 80, sm: 80, md: 80, lg: 100, xl: 100, xxl: 130 }}
                  className={"profile-avatar"}
                  src={image || userProfileImage}
                  icon={!image && !userProfileImage && <UserOutlined />}
                />
                <span className="rounded-full absolute p-1 right-0 bottom-0 imtiaz01">
                  <Tooltip title={"Upload 600px*600px image"} color="#FFF">
                    <Image
                      priority={true}
                      alt=""
                      // title="Upload 600px*600px image"
                      src={editicon}
                      width={30}
                      height={30}
                      className="border rounded border-gray-2"
                    />
                  </Tooltip>
                </span>
              </div>
            </Upload>
            <div>
              <h2 className="mb-0">
                {`${doctor_first_name && doctor_first_name} ${
                  doctor_last_name && doctor_last_name
                }`}
              </h2>

              <div className="flex justify-end mb-8 absolute top-0 left-0 md:right-0 w-full">
                <Button
                  type="link"
                  danger
                  onClick={() => setOpen(true)}
                  // disabled={deleting}
                  // loading={deleting || disableLoading}
                  icon={
                    <span className="mr-0.5">
                      <CloseOutlined className="mb-2.5" />
                    </span>
                  }
                >
                  Delete profile
                </Button>
              </div>
              <span className="block">{doctor_email}</span>
              {getRole() === "Admin" && (
                <div className=" grid grid-cols-2 gap-3">
                  <div className="lg:ml-0 mt-0 sm:mt-0 pt-2">
                    <Tooltip
                      title={doctorData ? "" : "Please complete doctor profile"}
                    >
                      <Button
                        type="primary"
                        className={`${_classes["published-button"]}`}
                        onClick={handlePublish_Unpublish}
                        disabled={doctorData ? false : true}
                      >
                        {status ? "Published" : "Unpublished"}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full pb-10">
            <Form
              form={formInstance}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishedFailed}
              layout="vertical"
              scrollToFirstError
            >
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                  className="flex-1"
                >
                  <Input
                    autoFocus={true}
                    onPressEnter={(e) => e.preventDefault()}
                  />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                  className="flex-1"
                >
                  <Input onPressEnter={(e) => e.preventDefault()} />
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                    {
                      required: true,
                      message: "Email is required",
                    },
                  ]}
                  className="flex-1"
                >
                  <Input onPressEnter={(e) => e.preventDefault()} />
                </Form.Item>
                <Form.Item
                  name="contact"
                  label="Contact #"
                  rules={[
                    { required: true, message: "Contact is required" },
                    {
                      min: 10,
                      message: "Contact number must be minimum 10 characters.",
                    },
                  ]}
                  className="flex-1"
                >
                  {/* <Input
                    type="number"
                    autoComplete="new-password"
                    onPressEnter={(e) => e.preventDefault()}
                  /> */}
                  <ReactPhoneInput
                    containerStyle={{
                      border: "1px solid #9296af",
                      borderRadius: "6px",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "46px",
                      border: "1px #9296af",
                    }}
                    country={"us"}
                    placeholder={"Ingrese su número de contacto"}
                    enableAreaCodes
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row  sm:gap-3">
                <Form.Item
                  label="Password"
                  name="password"
                  className="flex-1"
                  dependencies={["password"]}
                >
                  <Input.Password
                    autoComplete="new-password"
                    onPressEnter={(e) => e.preventDefault()}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm password"
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
                  <Input.Password
                    autoComplete="new-password"
                    onPressEnter={(e) => e.preventDefault()}
                  />
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  className="flex-1"
                >
                  <Input onPressEnter={(e) => e.preventDefault()} />
                </Form.Item>
                <Form.Item
                  label="Years of experience"
                  name="year_of_experience"
                  className="flex-1"
                >
                  <Input
                    type="number"
                    step={"any"}
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item
                  className="flex-1"
                  label={"Street address"}
                  name="streetAddress"
                  rules={[
                    {
                      required: true,
                      message: "street address required",
                      max: 300,
                    },
                  ]}
                >
                  <Input onPressEnter={(e) => e.preventDefault()} />
                </Form.Item>
                <Form.Item
                  className="flex-1"
                  label={"Country"}
                  name="country_id"
                  rules={[
                    {
                      required: true,
                      message: "country_message",
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
                    }}
                    placeholder={"Country"}
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
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-3">
                <Form.Item className="flex-1" label={"State"} name="state_id">
                  <Select
                    showSearch
                    filterOption={(input, state: any) =>
                      state.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(e) => {
                      selectStateId(e);
                      formInstance.setFieldsValue({
                        city_id: null,
                      });
                    }}
                    placeholder={"State"}
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
                <Form.Item className="flex-1" label={"City"} name="city_id">
                  <Select
                    placeholder={"City"}
                    showSearch
                    filterOption={(input, city: any) =>
                      city.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {React.Children.toArray(
                      getCityByState?.data?.getCitiesByState?.map((el, i) => {
                        return (
                          <Select.Option value={el.id}>
                            {el?.city_name}
                          </Select.Option>
                        );
                      })
                    )}
                  </Select>
                </Form.Item>
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-3">
                {/* <Form.Item
                  className="flex-1"
                  label={"Postal code"}
                  name="zip_code"
                  rules={[
                    {
                      required: true,
                      message: "Postal address is required",
                    },
                  ]}
                >
                  <Input
                    autoComplete="new-password"
                    onPressEnter={(e) => e.preventDefault()}
                  />
                </Form.Item> */}
                <div className="flex-1">
                  <Form.Item
                    label={"Time zone"}
                    name="timeZone"
                    rules={[
                      {
                        required: true,
                        message: "Timezone is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder={timeZone?.timeZoneName}
                      showSearch
                      filterOption={(input, city: any) =>
                        city.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {/* {React.Children.toArray(
                      getTimeZones?.data?.getTimeZones?.map((el, i) => {
                        return (
                          <Select.Option value={el.id}>
                            {el?.timeZone}
                          </Select.Option>
                        );
                      })
                    )} */}
                      {React.Children.toArray(
                        getTimeZones?.data?.getTimeZones?.map((el, i) => {
                          return (
                            <Select.Option value={el.id}>
                              {el?.timeZoneName}
                            </Select.Option>
                          );
                        })
                      )}
                    </Select>
                  </Form.Item>
                  <div className="text-center text-red items-baseline flex -mt-4">
                    <InfoCircleOutlined className="text-red " /> &nbsp;
                    <p className="">
                      Make sure your timezone is selected and saved before you
                      add schedules.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center ">
                <Form.Item
                  name="languageEnglish"
                  className={`${_classes["bottom-margin-0"]}`}
                >
                  <div className="flex items-center border border-gray rounded px-4 py-2 mr-3">
                    <Image
                      priority={true}
                      alt=""
                      height={21}
                      width={21}
                      src={end}
                      className="majid"
                    />
                    <span className=" pl-1 pr-10">English</span>
                    <Checkbox
                      defaultChecked={formatedLanguage?.English}
                      onChange={(e) => handleChangeLanguage(e, "English")}
                    ></Checkbox>
                  </div>
                </Form.Item>

                <Form.Item
                  name="languageSpanish"
                  className={`${_classes["bottom-margin-0"]}`}
                >
                  <div className="flex items-center border border-gray rounded px-4 py-2 mr-3">
                    <Image
                      priority={true}
                      alt=""
                      height={21}
                      width={21}
                      src={esp}
                      className="px-1 majid"
                    />
                    <span className=" pl-1 pr-10">Spanish</span>

                    <Checkbox
                      defaultChecked={formatedLanguage?.Spanish}
                      onChange={(e) => handleChangeLanguage(e, "Spanish")}
                    ></Checkbox>
                  </div>
                </Form.Item>
              </div>

              <div className="mt-5">
                <Form.Item label="About me" name="about_me">
                  <TextArea
                    rows={10}
                    placeholder="Vivamus efficitur, risus eu gravida gravida, ante metus accumsan nulla, eu iaculis ex ante id nibh. In vehicula ligula vitae pulvinar malesuada. Pellentesque dictum suscipit risus, sit amet euismod dui interdum et. Sed iaculis justo at feugiat porttitor. In auctor egestas urna, sit amet aliquam ex vulputate eu. Proin ultricies, enim sit amet porta tincidunt, nulla elit hendrerit nibh, vel molestie lectus massa a nisl. Aenean ac dolor consectetur, tincidunt risus finibus, tempor risus. Curabitur a eros sed ex molestie interdum. In dapibus elit metus, quis scelerisque elit dignissim sed. Morbi ultricies, risus in viverra rhoncus, massa libero hendrerit lacus, sit amet posuere mi nibh mollis neque."
                  />
                </Form.Item>
              </div>
              <InputWithLi
                // value={conditionTreatedList}
                disable={false}
                onChange={(list) => {
                  // handleConditionTreated(list);
                  setConditionTreatedList(list.toString());
                }}
                initialValue={conditionTreatedList?.split(",")}
              />

              <MultiRangeDatePicker
                loading={loading}
                disable={false}
                schedules={schedules}
                setDeleteScheduleId={setDeleteScheduleId}
                deleteScheduleFetching={deleteScheduleFetching}
                setAddScheduleTime={setAddScheduleTime}
                addScheduleTime={addScheduleTime}
                addScheduleDay={addScheduleDay}
                setAddScheduleDay={setAddScheduleDay}
                onAddClick={onAddClick}
                setAddScheduleClick={setAddScheduleClick}
                showCancelScheduleModal={showCancelScheduleModal}
                setShowCancelScheduleModal={setShowCancelScheduleModal}
              />

              <div className={`my-6 ${_classes["educational"]}`}>
                <h6>Certification and licensure</h6>
                {certificationList?.map((certificate, index) => {
                  return (
                    <div
                      className="border-b border-gray-3 my-3 py-3"
                      key={index}
                    >
                      <Form.Item
                        // label="Certificates"
                        // name={`certification_and_licensure`}
                        rules={[
                          {
                            required: false,
                            message: "Certificates",
                          },
                        ]}
                        className="flex-1"
                      >
                        {/* <Input
                          name={`certification_and_licensure`}
                          value={certificate?.certification_and_licensure}
                          onChange={(e) => handleCertificationChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        /> */}
                        <TextArea
                          name={`certification_and_licensure`}
                          value={certificate?.certification_and_licensure}
                          onChange={(e) => handleCertificationChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                          rows={3}
                          placeholder="Enter certificates and licensure details"
                        />
                      </Form.Item>
                      {certificationList?.length - 1 === index && (
                        <Button onClick={() => addNewField("certification")}>
                          Add new field
                        </Button>
                      )}
                      &nbsp;
                      {certificationList?.length > 1 && (
                        <Button
                          danger
                          onClick={() => removeField("certification", index)}
                        >
                          Remove field
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className={`my-6 ${_classes["professional"]}`}>
                <h5>Professional background</h5>
                {clinicList?.map((clinic: clinicType, index: number) => {
                  return (
                    <div
                      className="border-b border-gray-3 my-3 py-3"
                      key={index}
                    >
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
                          onChange={(e) => handleClinicChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Role"
                        rules={[{ required: false, message: "role" }]}
                        className="flex-1"
                      >
                        <Input
                          value={clinic?.role}
                          name={`role`}
                          onChange={(e) => handleClinicChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        />
                      </Form.Item>
                      {clinicList?.length - 1 === index && (
                        <Button onClick={() => addNewField("clinic")}>
                          Add new field
                        </Button>
                      )}
                      &nbsp;
                      {clinicList?.length > 1 && (
                        <Button
                          danger
                          onClick={() => removeField("clinic", index)}
                        >
                          Remove field
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={`my-6 ${_classes["educational"]}`}>
                <h6>Educational background</h6>
                {educationList?.map((education, index) => {
                  return (
                    <div
                      className="border-b border-gray-3 my-3 py-3"
                      key={index}
                    >
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
                        <Input
                          name={`institution`}
                          value={education?.institution}
                          onChange={(e) => handleEducationChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        />
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
                        <Input
                          name={`degree`}
                          value={education?.degree}
                          onChange={(e) => handleEducationChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        />
                      </Form.Item>
                      {educationList?.length - 1 === index && (
                        <Button onClick={() => addNewField("education")}>
                          Add new field
                        </Button>
                      )}
                      &nbsp;
                      {educationList?.length > 1 && (
                        <Button
                          danger
                          onClick={() => removeField("education", index)}
                        >
                          Remove field
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={`my-6 ${_classes["educational"]}`}>
                <h6>Awards, honors & recognition</h6>
                {honorsList?.map((honor, index) => {
                  return (
                    <div
                      className="border-b border-gray-3 my-3 py-3"
                      key={index}
                    >
                      <Form.Item className="flex-1">
                        <Input
                          name={`awards_honors_and_recognition`}
                          value={honor?.awards_honors_and_recognition}
                          onChange={(e) => handleHonorsChange(e, index)}
                          onPressEnter={(e) => e.preventDefault()}
                        />
                      </Form.Item>
                      {honorsList?.length - 1 === index && (
                        <Button onClick={() => addNewField("honors")}>
                          Add new field
                        </Button>
                      )}
                      &nbsp;
                      {honorsList?.length > 1 && (
                        <Button
                          danger
                          onClick={() => removeField("honors", index)}
                        >
                          Remove field
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              <Form.Item>
                <div className="flex items-center justify-end gap-2">
                  <Button type="default" onClick={() => setIsEdit(false)}>
                    Close
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={fetching}
                    disabled={fetching}
                  >
                    Save changes
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Form layout="vertical">
              <div className={`my-6 hidden ${_classes["educational"]}`}>
                <h6>Login information</h6>
                <div className="border-b border-gray-3 my-3 py-3">
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
                    <Input
                      value="University of oklahoma college of medicine"
                      onPressEnter={(e) => e.preventDefault()}
                    />
                  </Form.Item>
                  <div className="flex flex-col sm:flex-row  sm:gap-3">
                    <Form.Item
                      label="Password"
                      name="password"
                      // rules={[{ required: true, message: "Password" }]}
                      className="flex-1"
                    >
                      <Input.Password
                        onPressEnter={(e) => e.preventDefault()}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Confirm password"
                      name="confirmPassword"
                      // rules={[{ required: true, message: "Confirm password!" }]}
                      className="flex-1"
                    >
                      <Input.Password
                        onPressEnter={(e) => e.preventDefault()}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <ConfirmationModal
                visible={open}
                confirmLoading={deleteDoctorLoading}
                onCancel={() => setOpen(false)}
                onOk={deleteAdminUser}
                message="Are you sure you want to delete this physician?"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
