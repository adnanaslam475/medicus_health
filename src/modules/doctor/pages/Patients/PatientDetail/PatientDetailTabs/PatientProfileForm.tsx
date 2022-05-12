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
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";

const props = {};
function PatientProfileForm() {
  return (
    <div className="max-w-[800px]">
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="first Name" value="usama" />
      <LabelWithTextDiv label="Last Name" value="khan" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Gender" value="male" />
      <LabelWithTextDiv
        label="Date of birth"
        value="10 march"
      />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Email Address" value="uhk@gmail.com" />
      <LabelWithTextDiv label="Cell Number" value="2987213613821" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Country" value="pak" />
      <LabelWithTextDiv label="City" value="karachi" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Material Status" value="single" />
      <LabelWithTextDiv
        label="Do you have any Children?"
        value="no"
      />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv
        label="What is your Occupation?"
        value="doctor"
      />
      <LabelWithTextDiv
        label="Do you have any Occupational Exposure?"
        value="sdas"
      />
    </div>
    <div className="flex gap-2">
      <LabelWithTextDiv label="Do you have any pets?" value="dasds" />
      <div className="w-full" />
    </div>
  </div>
  );
}

export default PatientProfileForm;
