import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router from "next/router";
import InfoMessage from "../InfoMessage";
import Image from "next/image";
// import { useSelector } from "react-redux";
// import { deleteCookie } from "../../../utils/cookie";
import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  // const { auth } = useSelector((state) => state?.admin);

  const logout = () => {
    localStorage.removeItem("token");
    // deleteCookie("token");
    setVisible(false);
    Router.push("/login");
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  const notificationMenu = (
    <>
      <div className="notificationMenuCover">
        <Menu class="px-2 py-2 bg-white border border-gray-3 rounded">
          <Menu.Item key="0">
            <a href="https://www.antgroup.com">1st menu item</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="https://www.aliyun.com">2nd menu item</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
      </div>
    </>
  );

  return (
    <Header className="flex w-full justify-end items-center h-25 px-0 md:px-0">
      <div className="w-full flex px-0 justify-between items-center">
        <div class="w-full md:w-1/2">
          <InfoMessage />
        </div>

        <div className="avatar-and-notification-area inline-flex h-10 items-center text-right justify-end w-full md:w-1/2">
          <span className="hidden sm:block">
            <SidebarDrawer />
          </span>

          {/* Bell icon Notifications  */}

          <span className="mt-7 mr-8">
            <Dropdown overlay={notificationMenu} trigger={["click"]} placement="bottomLeft">
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Badge count={12}>
                  <Image
                    alt=""
                    className="warning-small mx-auto shadow-none border-0"
                    height={34}
                    width={34}
                    src="/assets/icon/bell_Icon.svg"
                  />
                </Badge>
              </a>
            </Dropdown>
          </span>

          {/* Avatar Icon */}
          <Avatar
            className="ml-3"
            size="large"
            src="https://joeschmoe.io/api/v1/jess"
          />
          <span className="justify-center px-4">
            Mark Mansion
            {/* <p>{auth?.user?.name ? auth?.user?.name : "Admin"}</p> */}
          </span>
          <Dropdown
            overlay={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Menu class="px-2 py-2 bg-white border border-gray-3 rounded">
                <Menu.Item
                  className="border-b border-gray-4"
                  onClick={() => Router.push("/account-settings")}
                >
                  Accounts Settings
                </Menu.Item>

                <Menu.Item
                  className="border-b border-gray-4"
                  onClick={() => Router.push("/payment-settings")}
                >
                  Payment Settings
                </Menu.Item>

                <Menu.Item onClick={logout}>
                  <span className="text-red">Logout</span>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            trigger="click"
            // overlayStyle={{ width: 130 }}
          >
            <CaretDownOutlined onClick={showPopover} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
