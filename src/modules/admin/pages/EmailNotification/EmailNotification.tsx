import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
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
import EmailNotification from "../../../admin/components/EmailNotification/EmailNotification";

function EmailNotificationPage() {
  return (
    <div>
      <div className="w-full mb-10 flex gap-8">
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
      <div className="flex md:flex-row gap-0 w-1/2">
      <div className=" w-full border px-5 py-3 rounded-lg border-gray-7">
      <EmailNotification />
      </div>
      </div>
    </div>
  );
}

export default EmailNotificationPage;
