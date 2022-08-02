import React, { useState } from "react";
import Link from "next/link";
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
import userDefaultPicture from "../../../../public/assets/images/profile.jpg";

const { Header } = Layout;

type Props = {
  isShowBanner: boolean | undefined;
};

const AppHeader = ({ isShowBanner }: Props) => {
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
    Router.push("/login");
    localStorage.removeItem("loggedInUserData");
    // localStorage.clear();
    setVisible(false);
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

              {patientHealthHistory?.patientHealthHistory ||
              !isShowBanner ||
              isShowBanner === undefined ? (
                <div className="p-0">
                  {getRole() === "User" ? <InfoMessageBannerReminder /> : null}
                </div>
              ) : (!patientHealthHistory?.patientHealthHistory?.id && isShowBanner)? (
                <div className="p-0">
                  {getRole() === "User" && <InfoMessage />}
                </div>
              ) : (
                <></>
              )}
            </div>
          </Skeleton>

          <div className="flex items-center text-right justify-end w-full md:w-1/2">
            <Dropdown
              className="flex items-center"
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div onClick={showPopover}>
                {user?.first_name && (
                  <>
                    <Image
                      priority={true}
                      alt="Profile Image"
                      height="40"
                      width="40"
                      onError={(e) => console.log(e)}
                      src={profilePicture || userDefaultPicture}
                      className="bg-gray border rounded-full border-gray"
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
      {!patientHealthHistory?.patientHealthHistory?.id &&
      !fetching &&
      isShowBanner ? (
        <div className="bg-white md:hidden p-2 w-full">
          {getRole() === "User" && <InfoMessage />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppHeader;
