import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import InfoMessage from "../InfoMessage/InfoMessage";
import Image from "next/image";
import _classes from "./AppHeader.module.scss";
import SidebarDrawer from "../../../modules/common/components/SidebarDrawer";
const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales?.filter((locale) => locale !== activeLocale);
  const { pathname, query, asPath } = router;

  const logout = () => {
    localStorage.removeItem("loggedInUserData");
    setVisible(false);
    Router.push("/login");
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  // const onClick = ({ key }) => {
  //   message.info(`Click on item ${key}`);
  // };

  const menu = (
    <Menu className="px-2 py-2 bg-white border border-gray-3 rounded">
      <Menu.Item className="border-b border-gray-4">
        Accounts Settings
      </Menu.Item>

      <Menu.Item className="border-b border-gray-4">Payment Settings</Menu.Item>

      <Menu.Item>
        <Link href={{ pathname, query }} as={asPath} locale={otherLocales?.[0]}>
          {`switch to ${otherLocales?.[0]}`}
        </Link>
      </Menu.Item>

      <Menu.Item onClick={logout}>
        <span className="text-red">Logout</span>
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <div className="notification-menu-cover border border-gray-3 rounded">
      <div className="px-3 py-2 bg-white">
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
          <span className="notificationBody ml-3 w-full break-word">
            Your appointment with <b>John Petrucci</b> has been confirmed.
          </span>
        </div>
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
          <span className="notificationBody ml-3 w-full break-word">
            Your appointment with <b>John Petrucci</b> has been confirmed.
          </span>
        </div>
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
          <span className="notificationBody ml-3 w-full break-word">
            Your appointment with <b>John Petrucci</b> has been confirmed.
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header
        className={`${_classes["bg-white"]} border-b border-gray-5 bg-white flex w-full justify-end items-center h-25 px-0 md:px-0`}
      >
        <span className="flex items-center block lg:hidden mr-5">
          <Image
            alt=""
            width={80}
            height={43}
            src="/assets/images/loaderLogo.png"
          />
        </span>
        <div className="w-full flex px-0 justify-between items-center">
          <div className="hidden md:block w-full ">
            <InfoMessage />
          </div>
          <div className="flex items-center text-right justify-end w-full md:w-1/2">
            <span className="flex mt-3 pr-5">
              <Dropdown
                overlay={notificationMenu}
                placement="bottomLeft"
                className="flex items-center"
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

            <Dropdown
              className="flex items-center"
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div onClick={showPopover}>
                <Avatar
                  className="ml-3"
                  size="large"
                  src="https://joeschmoe.io/api/v1/jess"
                />
                <span className="justify-center px-2 hidden xl:block">
                  Mark Mansion
                </span>
                <div className="hidden md:block">
                  <CaretDownOutlined />
                </div>
              </div>
            </Dropdown>
            <span className="mt-2 pl-5 lg:hidden">
              <SidebarDrawer />
            </span>
          </div>
        </div>
      </Header>
      <div className="bg-white md:hidden p-2 w-full">
        <InfoMessage />
      </div>
    </>
  );
};

export default AppHeader;
