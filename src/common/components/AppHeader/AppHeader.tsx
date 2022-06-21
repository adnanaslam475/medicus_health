import React, { useState } from "react";
import { Layout, Avatar, Dropdown, Menu, Badge, Divider, Skeleton } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import InfoMessage from "../InfoMessage/InfoMessage";
import Image from "next/image";
import _classes from "./AppHeader.module.scss";
import SidebarDrawer from "../../../modules/common/components/SidebarDrawer";
import { getRole, getUserData } from "../../utils/userData";
import InfoMessageBannerReminder from "../InfoMessageBannerReminder/InfoMessageBannerReminder";
import { usePatientHealthHistoryQuery } from "generated/graphql";

const { Header } = Layout;

const AppHeader = () => {
  //Get logged in User
  const { user: loggedInUser } = getUserData();
  const { id: loggedInUserId } = loggedInUser || {};

  // Get patient Health History
  const [{ data: patientHealthHistory, fetching }] =
    usePatientHealthHistoryQuery({
      variables: { input: Number(loggedInUserId) },
      requestPolicy: "network-only",
    });
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

  const { user } = getUserData();
  const { patientProfile, adminProfilePicture, doctorProfile } = user || {};

  const profilePicture =
    patientProfile?.profileImage ||
    doctorProfile?.profile_image ||
    adminProfilePicture?.profile_picture;
  const userName = `${user?.first_name} ${user?.last_name}`;
  const userRole = user?.role;
  const accountPath =
    userRole === "Doctor"
      ? "/physician/account"
      : userRole === "Admin"
      ? "/admin/account"
      : "/patient/account?activeTab=1";

  const menu = (
    <Menu className="px-2 py-2 bg-white border border-gray-3 rounded">
      <Menu.Item
        className="border-b border-gray-4"
        onClick={() => Router.push(accountPath)}
      >
        Accounts Settings
      </Menu.Item>

      {userRole === "User" && (
        <Menu.Item
          className="border-b border-gray-4"
          onClick={() => Router.push(`/patient/account?activeTab=3`)}
        >
          Payment Settings
        </Menu.Item>
      )}

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
              priority={true}
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
              priority={true}
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
              priority={true}
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
            priority={true}
            alt=""
            width={80}
            height={43}
            src="/assets/images/loaderLogo.png"
          />
        </span>
        <div className="w-full flex px-0 justify-between items-center">
          <Skeleton loading={fetching} paragraph={{ rows: 0 }} active>
            <div className="hidden md:block w-full ">
              <div className="p-0">
                {getRole() === "Doctor" ? <InfoMessageBannerReminder /> : null}
              </div>

              {/* if patient health questionnaire completed than showing appointment banner 
              otherwise health questionnaire complete banner */}

              {patientHealthHistory?.patientHealthHistory ? (
                <div className="p-0">
                  {getRole() === "User" ? <InfoMessageBannerReminder /> : null}
                </div>
              ) : (
                <div className="p-0">
                  {getRole() === "User" && <InfoMessage />}
                </div>
              )}
            </div>
          </Skeleton>

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
                      priority={true}
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
                <Avatar className="ml-3" size="large" src={profilePicture} />
                <span className="justify-center px-2 hidden xl:block">
                  {userName}
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
        {getRole() === "User" && <InfoMessage />}
      </div>
    </>
  );
};

export default AppHeader;
