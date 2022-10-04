import React, { useEffect, useRef, useState } from "react";
// import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

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
import dayjs from "dayjs";
import Router, { useRouter } from "next/router";
import { useCreatePatientByAdminMutation } from "generated/graphql";
import AppLayout from "common/components/AppLayout/AppLayout";
import { AddPatientForm } from "modules/admin/components/AddPatientForm/AddPatientForm";

type props = {
  // validateForm?: (value: any) => void;
  // onFinishPersonalInfo?: (value: any) => void;
};
function AdminPatientAdd() {
  const [data, CreatePatientByAdminMutation] =
    useCreatePatientByAdminMutation();

  const form: any = useRef();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const createPatient = async (values: any) => {
    const response = await CreatePatientByAdminMutation({
      createPatientInput: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        contact_number: values?.contact_number,
        streetAddress: values?.streetAddress,
        country_id: values?.country,
        state_id: values?.state,
        city_id: values?.city_id,
        zip_code: values?.postalCode,
      },
    });

    if (response?.data?.createPatientByAdmin) {
      Router.push({
        pathname: "/admin/patients",
      });
    }

    if (response?.data) {
      response?.data?.createPatientByAdmin &&
        notification.success({
          message: "Successfully Created",
        });
    }

    if (response?.error) {
      response?.error?.graphQLErrors[0]?.message &&
        notification.error({
          message:
            response?.error?.graphQLErrors[0]?.message ||
            "Something went wrong",
        });
    }

    try {
    } catch (error) {}
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="mb-4">Add a patient</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              <div className="w-full">
                <AddPatientForm onFinish={createPatient} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPatientAdd;
