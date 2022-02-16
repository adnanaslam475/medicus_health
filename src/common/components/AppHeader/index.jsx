import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router from "next/router";
import { useSelector } from "react-redux";
import { deleteCookie } from "../../../utils/cookie";
import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const { auth } = useSelector((state) => state?.admin);

  const logout = () => {
    localStorage.removeItem("token");
    deleteCookie("token");
    setVisible(false);
    Router.push("/login");
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  return (
    <Header className="flex justify-end items-center border-b-2 h-25 px-4 md:px-6" style={{ backgroundColor: "white" }}>
      <div className="mr-auto">
        <SidebarDrawer />
      </div>
      <Avatar size="large" src="https://joeschmoe.io/api/v1/jess" />
      <span className="justify-center px-4">
        <p>{auth?.user?.name ? auth?.user?.name : "Admin"}</p>
      </span>
      <Dropdown
        overlay={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Menu>
            {/* <Menu.Item onClick={logout}>Profile</Menu.Item> */}
            <Menu.Item onClick={() => Router.push("/profile")}>
              Profile
            </Menu.Item>
            <Menu.Item onClick={logout}>Logout</Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        trigger="click"
        overlayStyle={{ width: 130 }}
      >
        <CaretDownOutlined onClick={showPopover} />
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
