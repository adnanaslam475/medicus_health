/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Layout } from "antd";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/logo-medi.svg";
import SidebarMenuItem from "../../../../common/components/SidebarMenuItem/SidebarMenuItem";
import _classes from "./SideMenu.module.scss";
import Router from "next/router";
import { getUserData } from "common/utils/userData";

function AdminSideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = getUserData();
  const basePath =
    user?.role === "User"
      ? "/patient/appointments/upcoming"
      : user?.role === "Doctor"
      ? "/physician/appointments/upcoming"
      : "/admin/dashboards";
  return (
    <Layout.Sider
      onBreakpoint={(broken) => setCollapsed(broken)}
      collapsed={collapsed}
      collapsedWidth="5rem"
      breakpoint="lg"
      theme="light"
      className={`${_classes["admin-side-menu"]} hidden lg:block bg-gray overflow-x-hidden`}
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
          className="cursor-pointer"
          onClick={() => Router.push(basePath)}
        />
      </Layout.Header>
      <div className="px-5 flex mx-0">
        <SidebarMenuItem />
      </div>
    </Layout.Sider>
  );
}

export default AdminSideMenu;
