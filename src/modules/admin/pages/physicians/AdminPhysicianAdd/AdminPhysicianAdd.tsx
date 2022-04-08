import React, { useEffect, useRef, useState } from "react";
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
  notification,
} from "antd";
import { PlusOutlined, EyeFilled } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import yourImage from "../../../../../../public/assets/images/your_photo.png";
import {
  useCountriesQuery,
  useCreateDoctorMutation,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  User,
} from "../../../../../generated/graphql";
import dayjs from "dayjs";
import { AddPhysicianForm } from "../../../components/AddPhysicianForm/AddPhysicianForm";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
};
function AdminPhysicianAdd() {
  const [data, CreateDoctorMutation] = useCreateDoctorMutation();

  // const [{ data }] = useDoctorProfilesQuery();
  // const { doctorProfiles } = data || {};

  const form: any = useRef();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const createDoctor = async (values: any) => {
    return null;
    await CreateDoctorMutation({
      createDoctorInput: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        streetAddress: values?.streetAddress,
        country_id: values?.country,
        state_id: values?.state,
        city_id: values?.city_id,
        zip_code: values?.postalCode,
      },
    });
    if (data?.data) {
      {
        data?.data?.createDoctor &&
          notification.success({
            message: "Successfully Created",
          });
      }
    }

    if (data?.error) {
      {
        data?.error?.graphQLErrors[0]?.message &&
          notification.error({
            message:
              data?.error?.graphQLErrors[0]?.message || "Something went wrong",
          });
      }
    }

    try {
    } catch (error) {}
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add a Physician</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              <div className="w-full">
                <AddPhysicianForm onFinish={createDoctor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianAdd;
