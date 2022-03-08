import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router from "next/router";
import InfoMessage from "../InfoMessage";
import Image from "next/image";
import SidebarDrawer from "../../../modules/admin/components/SidebarDrawer";
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("loggedInUserData");
    setVisible(false);
    Router.push("/login");
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  const notificationMenu = (
    <>
      <div className="notificationMenuCover border border-gray-3 rounded">
        <div className="px-3 py-2 bg-white">
          {/* <Menu.Item key="0"> */}
          <div className="flex border-b border-gray-4 items-start mb-3">
            <span className=" ">
              <Image
                alt=""
                className="warning-small mx-auto shadow-none border-0"
                height={34}
                width={34}
                src="/assets/icon/blue_bell_Icon.svg"
              />
            </span>
            {/* <div> */}
            <span className="notificationBody ml-3 w-full break-word">
              Your appointment with <b>John Petrucci</b> has been confirmed.
            </span>
            {/* </div> */}
          </div>
          {/* </Menu.Item> */}
          <div className="flex border-b border-gray-4 items-start mb-3">
            <span className=" ">
              <Image
                alt=""
                className="warning-small mx-auto shadow-none border-0"
                height={34}
                width={34}
                src="/assets/icon/blue_bell_Icon.svg"
              />
            </span>
            {/* <div> */}
            <span className="notificationBody ml-3 w-full break-word">
              Your appointment with <b>John Petrucci</b> has been confirmed.
            </span>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Header className="flex w-full justify-end items-center h-25 px-0 md:px-0">
      <div className="w-full flex px-0 justify-between items-center">
        <div className="w-full md:w-1/2">
          <InfoMessage />
        </div>

        <div className="avatar-and-notification-area inline-flex h-10 items-center text-right justify-end w-full md:w-1/2">
          <span className="hidden sm:block">
            <SidebarDrawer />
          </span>

          {/* Bell icon Notifications  */}

          <span className="mt-7 mr-8">
            <Dropdown
              overlay={notificationMenu}
              trigger={["click"]}
              placement="bottomLeft"
            >
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
              <Menu className="px-2 py-2 bg-white border border-gray-3 rounded">
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
