/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Layout } from "antd";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/logo-medi.svg";
import SidebarMenuItem from "../../../../common/components/SidebarMenuItem";

function AdminSideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout.Sider
      onBreakpoint={(broken) => setCollapsed(broken)}
      collapsed={collapsed}
      collapsedWidth="5rem"
      breakpoint="xl"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100vh",
        position: "fixed",
        left: 0,
        background:"#F6F8FA",
      }}
      theme="light"
      className="hidden md:block bg-gray overflow-x-hidden"
      width="18rem"
    >
      <Layout.Header className="flex justify-center bg-gray-f px-0 xl:px-4 items-center mt-5">
      <Image alt="" src={Logo} width={200} height={35} />
      {/* <div className="justify-center items-center xl:flex ">
         
        </div> */}
      </Layout.Header>
      <div className="sideMenuCover px-5 flex mx-0">
      <SidebarMenuItem 
      // style={{background:"#F6F8FA"}} 
      />
      </div>
    </Layout.Sider>
  );
}

export default AdminSideMenu;
