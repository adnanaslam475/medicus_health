/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Layout } from "antd";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/logo-medi.svg";
import SidebarMenuItem from "../../../../common/components/SidebarMenuItem/SidebarMenuItem";
import _classes from "./SideMenu.module.scss";

function AdminSideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      onBreakpoint={(broken) => setCollapsed(broken)}
      collapsed={collapsed}
      collapsedWidth="5rem"
      breakpoint="xl"
      theme="light"
      className={`${_classes["admin-side-menu"]} hidden md:block bg-gray overflow-x-hidden`}
      width="18rem"
    >
      <Layout.Header
        className={`${_classes["admin-side-menu-header"]} flex justify-center bg-gray-2 px-0 xl:px-4 items-center`}
      >
        <Image
          priority={true}
          unoptimized={true}
          alt=""
          src={Logo}
          width={200}
          height={35}
        />
      </Layout.Header>
      <div className="px-5 flex mx-0">
        <SidebarMenuItem />
      </div>
    </Layout.Sider>
  );
}

export default AdminSideMenu;
