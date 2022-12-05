/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Tabs, Badge, Modal } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import yourImage from "../../../../../../../public/assets/images/your_photo.png";
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
import PhysicianProfileForm from "./PhysicianProfileForm";
import { isChrome } from "utils/helper";

function PhysicianProfile() {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        <div className="flex flex-col w-full justify-start items-center py-3">
          <div className="w-full mb-10 flex gap-8">
            <Avatar
              size={128}
              src={
                <Image
                  priority={true}
                  alt=""
                  src={yourImage}
                  width={228}
                  height={228}
                  className="border rounded border-gray-2"
                />
              }
            />

            <div>
              <span>PY-123</span>
              <h2 className="mb-0">Maxime Bauwents</h2>
              <span className="block">usama@gmail.com</span>
              <Button size="large" className={`px-0 mx-0 ${isChrome && 'antCustomBtn'}`}>
                <EditOutlined />
                Edit info
              </Button>
            </div>
          </div>
          <div className="w-full">
            <PhysicianProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysicianProfile;
