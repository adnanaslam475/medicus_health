import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Space } from "antd";
import Router from "next/router";
import Image from "next/image";
import link from "next/link";
import { WarningFilled } from "@ant-design/icons";
import Link from "next/link";

// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const InfoMessage = () => {
  return (
    <>
      {/* <span className="hidden sm:block">
        <SidebarDrawer />
      </span> */}

      <div className="">
        <div className="flex items-center bg-gray-4 lg:h-10 md:h-auto px-2 rounded text-xs text-nowr">
          {/* <span className="mr-3 mb-0"><WarningFilled style={{ color: 'white' backgroundColor: 'red' }} /></span> */}
          <Image
            alt=""
            className="warning-small mx-3 shadow-none border-0"
            height={34}
            width={34}
            src="/assets/icon/warning-small.svg"
          />
          <span className="ml-3 min-h-max">
            Please complete the health questionnaire in order to book
            appointments with our Physicians.
          </span>
          <Link href="/">
            <a className="underline text-primary px-3 whitespace-nowrap">
              Complete Now
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InfoMessage;
