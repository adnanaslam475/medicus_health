import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Space, Tabs } from "antd";
import Router from "next/router";
import Image from "next/image";
import { WarningFilled } from "@ant-design/icons";

// import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { TabPane } = Tabs;
const AccountTabs = () => {
  return (
    <>
      {/* <span className="hidden sm:block">
        <SidebarDrawer />
      </span> */}

      <div className="">
      <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Tab Title 1" key="1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </TabPane>
      <TabPane tab="Tab Title 2" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </TabPane>
      <TabPane tab="Tab Title 3" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </TabPane>
    </Tabs>
  </div>,
      </div>
    </>
  );
};

export default AccountTabs;
