import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Badge,
  Divider,
  Skeleton,
  Button,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import InfoMessage from "../InfoMessage/InfoMessage";
import Image from "next/image";
import _classes from "./AppHeader.module.scss";
import SidebarDrawer from "../../../modules/common/components/SidebarDrawer";
import { getRole, getUserData } from "../../utils/userData";
import InfoMessageBannerReminder from "../InfoMessageBannerReminder/InfoMessageBannerReminder";
import {
  useGetUserQuery,
  usePatientHealthHistoryQuery,
} from "generated/graphql";
import userDefaultPicture from "../../../../public/assets/images/profile.jpg";
import { useUserData } from "../Context/UserContext";
import MDNextImage from "../MDNextImage/MDNextImage";

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

  const [
    { data: userData, fetching: userDataLoading },
    executeUseGetUserQuery,
  ] = useGetUserQuery({
    variables: { input: Number(loggedInUserId) },
    pause: !loggedInUserId,
  });
  useEffect(() => {
    if (!userData?.user?.id && !userDataLoading) {
      logout();
    }
  }, [userData?.user?.id, userDataLoading]);

  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales?.filter((locale) => locale !== activeLocale);
  const { pathname, query, asPath } = router;
  const { data: userContextData, clearUserData } = useUserData();
  const { values } = userContextData;
  const { firstName, lastName, profilePicture } = values || {};

  const logout = () => {
    Router.push("/login");
    localStorage.removeItem("loggedInUserData");
    localStorage.removeItem("timeZone");
    localStorage.removeItem("appointmentsAlertData");
    // localStorage.clear();
    clearUserData?.({});
    setVisible(false);
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  const { user } = getUserData();
  const { patientProfile, adminProfilePicture, doctorProfile } = user || {};

  // const profilePicture =
  //   patientProfile?.profileImage ||
  //   doctorProfile?.profile_image ||
  //   adminProfilePicture?.profile_picture;
  const userName = `${firstName} ${lastName}`;
  const userRole = user?.role;
  const accountPath =
    userRole === "Doctor"
      ? "/physician/account"
      : userRole === "Admin"
      ? "/admin/account"
      : userRole === "Staff"
      ? "/physician/staffaccount?activeTab=1"
      : "/patient/account?activeTab=1";

  const menu = (
    <Menu className="px-2 py-2 bg-white border border-gray-3 rounded">
      <Menu.Item
        className="border-b border-gray-4"
        onClick={() => Router.push(accountPath)}
      >
        Account
      </Menu.Item>

      {userRole === "User" && (
        <Menu.Item
          className="border-b border-gray-4"
          onClick={() => Router.push(`/patient/account?activeTab=3`)}
        >
          Payment settings
        </Menu.Item>
      )}

      <div className="hidden">
        <Menu.Item>
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale={otherLocales?.[0]}
          >
            {`switch to ${otherLocales?.[0]}`}
          </Link>
        </Menu.Item>
      </div>

      <Menu.Item onClick={logout}>
        <span className="text-red">Logout</span>
      </Menu.Item>
    </Menu>
  );
  const basePath =
    user?.role === "User"
      ? "/patient/appointments/upcoming"
      : user?.role === "Doctor"
      ? "/physician/appointments/upcoming"
      : "/admin/dashboards";
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
            onClick={() => Router.push(basePath)}
          />
        </span>
        <div className="w-full flex px-0 justify-between items-center xs:justify-end">
          <Skeleton loading={fetching} paragraph={{ rows: 0 }} active>
            <div className="hidden md:block w-full ">
              <div className="p-0">
                {getRole() === "Doctor" || getRole() === "Staff" ? (
                  <InfoMessageBannerReminder />
                ) : null}
              </div>

              {/* if patient health questionnaire completed than showing appointment banner 
              otherwise health questionnaire complete banner */}

              {patientHealthHistory?.patientHealthHistory ? (
                <div className="p-0">
                  {getRole() === "User" ? <InfoMessageBannerReminder /> : null}
                </div>
              ) : !patientHealthHistory?.patientHealthHistory?.id ? (
                <div className="p-0">
                  {getRole() === "User" && <InfoMessage />}
                </div>
              ) : (
                <></>
              )}
            </div>
          </Skeleton>

          <div
            className={`${_classes["topBar-avatar"]} flex items-center text-right justify-end w-full md:w-1/2`}
          >
            {getRole() === "User" && (
              <a
                target="blank"
                href="https://joinmedicus.com/es/como-funciona/"
                className="visited:"
              >
                <div className="p-2 ">
                  <Button type="default" className="text-sm ">
                    <span className="text-xs sm:text-base">Get started</span>
                  </Button>
                </div>
              </a>
            )}

            <Dropdown
              className="flex items-center min-w-[60px]"
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div onClick={showPopover}>
                {user?.first_name && (
                  <>
                    {/* <Image
                      priority={true}
                      alt="Profile Image"
                      height="40"
                      width="40"
                      objectFit="cover"
                      onError={(e) => console.log(e)}
                      src={profilePicture || userDefaultPicture}
                      className="bg-gray border rounded-full border-gray min-w-[40]"
                    /> */}
                    <MDNextImage
                      alt=""
                      width={40}
                      height={40}
                      objectFit="cover"
                      className="rounded-full"
                      src={profilePicture}
                      fallbackImage="/assets/images/profile.svg"
                    />
                    <span className="justify-center px-2 hidden xl:block">
                      {userName}
                    </span>
                  </>
                )}
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
      {/* {!patientHealthHistory?.patientHealthHistory?.id &&
      !fetching &&
      isShowBanner ? (
        <div className="bg-white md:hidden p-2 w-full">
          {getRole() === "User" && <InfoMessage />}
        </div>
      ) : (
        <></>
      )} */}
      <Skeleton loading={fetching} paragraph={{ rows: 0 }} active>
        <div className="md:hidden sm:block w-full ">
          <div className="p-0">
            {getRole() === "Doctor" || getRole() === "Staff" ? (
              <InfoMessageBannerReminder />
            ) : null}
          </div>

          {/* if patient health questionnaire completed than showing appointment banner 
              otherwise health questionnaire complete banner */}

          {patientHealthHistory?.patientHealthHistory ? (
            <div className={`${_classes["mobile-banner"]} bg-white p-2 w-full`}>
              {getRole() === "User" ? <InfoMessageBannerReminder /> : null}
            </div>
          ) : !patientHealthHistory?.patientHealthHistory?.id ? (
            <div className="bg-white xs:flex hidden p-2 w-full">
              {getRole() === "User" && <InfoMessage />}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Skeleton>
    </>
  );
};

export default AppHeader;
