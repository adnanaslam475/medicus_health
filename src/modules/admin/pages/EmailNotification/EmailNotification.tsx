import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal, Divider } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
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
} from "antd";
import EmailNotification from "../../../common/components/EmailNotification/EmailNotification";
import ThinLine from "../../../../common/components/ThinLine/ThinLine";

function EmailNotificationPage() {
  // const onPreferenceChange = async (checked, setChecked, id) => {
  //   try {
  //      const res = await updateEmailPreferences(id, { status: `${Number(checked)}` });
  //     setChecked(Number(0));
  //   } catch (error) {
  //      notification.error({
  //       message: error?.message || "Something went wrong",
  //      });
  //   }
  // };
  return (
    <div>
      <div className="w-full mb-10 flex gap-8 items-center">
        <Avatar
          size={128}
          src={
            <Image
              alt=""
              src={yourImage}
              width={228}
              height={228}
              className="border rounded border-gray-2"
            />
          }
        />
        {/* <a
  href="javascript:void(0)"
  className="text-primary underline ml-3 text-xs"
>
  <Upload {...props}>Update Photo</Upload>
</a>  */}
        <div>
          <span>PY-123</span>
          <h2 className="mb-0">Maxime Bauwents</h2>
          <span className="block">usama@gmail.com</span>
        </div>
      </div>
      <div className="flex md:flex-row gap-0 max-w-[60%]">
        <div className=" w-full border py-0 rounded-lg border-gray-7">
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={1}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
          <ThinLine />
          <EmailNotification
            title="Patient registration update"
            defaultChecked={0}
            // onChange={(checked, setChecked) => {
            //   onPreferenceChange(checked, setChecked, 1);
            // }}((
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailNotificationPage;
