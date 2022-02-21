import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Space } from "antd";
import Router from "next/router";
import Image from "next/image";
import { WarningFilled } from "@ant-design/icons";

// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const InfoMessage = () => {
  return (
    <>
      {/* <span className="hidden sm:block">
        <SidebarDrawer />
      </span> */}

      <div className="">
        <div className="flex items-center bg-gray-4 h-10 px-2 rounded text-xs text-nowr">
          {/* <span className="mr-3 mb-0"><WarningFilled style={{ color: 'white' backgroundColor: 'red' }} /></span> */}
          <Image
            alt=""
            className="warning-small mx-3 shadow-none border-0"
            height={34}
            width={34}
            src="/assets/icon/warning-small.svg"
          />
          <span className="ml-3">Please complete the health questionnaire in order to book appointments
          with our Doctors.</span>
          <a href="void(0)" className="underline text-primary px-3 whitespace-nowrap">
            Complete Now
          </a>
        </div>
      </div>
    </>
  );
};

export default InfoMessage;
