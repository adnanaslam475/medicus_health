import React, { useEffect, useState } from "react";
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
import { AddPhysicianForm } from "../../../components/AddPhysicianForm/AddPhysicianForm";

type props = {
  validateForm?: (value: any) => void;
  onFinishPersonalInfo?: (value: any) => void;
  onFinish?: (value: any) => void;
};
function AdminPhysicianDetail() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState("");

  const props = {
    onChange({ file, fileList }: any) {
      if (file.status !== "uploading") {
      }
    },
  };

  const [form] = Form.useForm();

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
                <Upload
                  maxCount={1}
                  itemRender={() => <div />}
                  customRequest={() => null}
                >
                  <div className="relative">
                    <Avatar
                      size={50}
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
                      Update Photo
                    </Button>
                  </div>
                </Upload>
              </div>
              <div className="w-full">
                <AddPhysicianForm onFinish={() => null} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminPhysicianDetail;
