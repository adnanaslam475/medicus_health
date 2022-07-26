import React, { useEffect, useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

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
import Router, { useRouter } from "next/router";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
};
function AdminPhysicianAdd() {
  const [data, CreateDoctorMutation] = useCreateDoctorMutation();

  const form: any = useRef();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const createDoctor = async (values: any) => {
    const response = await CreateDoctorMutation({
      createDoctorInput: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        streetAddress: values?.streetAddress,
        contact_number:"",
        country_id: values?.country,
        state_id: values?.state,
        city_id: values?.city_id | 0,
        zip_code: values?.postalCode,
      },
    });

    if (response?.data?.createDoctor) {
      Router.push({
        pathname: "/admin/physicians",
      });
    }

    if (response?.data) {
      response?.data?.createDoctor &&
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
          <h2 className="mb-4">Add a Physician</h2>
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="flex flex-col w-full justify-start items-center py-3">
              {/* <div className="w-full mb-10">
                <Upload
                  maxCount={1}
                  itemRender={() => <div />}
                  customRequest={() => null}
                >
                  <div className="relative">
                    <Avatar
                      size={62}
                      style={{
                        borderColor: "transparent",
                        borderWidth: 2,
                        lineHeight: "40px",
                      }}
                    />
                    <Button
                      type="link"
                      className="text-primary underline ml-3 text-xs"
                    >
                      Update photo
                    </Button>
                  </div>
                </Upload>
              </div> */}
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
