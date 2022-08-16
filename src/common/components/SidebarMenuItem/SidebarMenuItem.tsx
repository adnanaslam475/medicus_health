import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Badge, Menu } from "antd";
import {
  AppointmentIcon,
  ProfileIcon,
  PhysicianIcon,
  DollarIcon,
  PatientIcon,
  StaffIcon,
  MessageIcon,
  DashboardIcon,
  ReportIcon,
} from "../CustomIcon";
import _classes from "./SidebarMenuItem.module.scss";

import { getRole } from "../../utils/userData";
import {
  PATIENT_ROUTES,
  ADMIN_ROUTES,
  DOCTOR_ROUTES,
  STAFF_ROUTES,
} from "../../constants/routes";
import { SettingIcon } from "../CustomIcon/SettingIcon";
import {
  useAppointmentCountByStatusQuery,
  useGetUnreadMessageCountQuery,
} from "generated/graphql";

function SidebarMenuItem() {
  const IconsListPhysician = [
    <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
    <DollarIcon className={_classes["sidebar-icon-hover"]} />,
    <PatientIcon className={_classes["sidebar-icon-hover"]} />,
    <StaffIcon className={_classes["sidebar-icon-hover"]} />,
    <MessageIcon className={_classes["sidebar-icon-hover"]} />,
    <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
    <PhysicianIcon className={_classes["sidebar-icon-hover"]} />,
  ];

  const IconsListPatient = [
    <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
    <PhysicianIcon className={_classes["sidebar-icon-hover"]} />,
    <MessageIcon className={_classes["sidebar-icon-hover"]} />,
    <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
    <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
    <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
    <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
  ];

  const IconsListAdmin = [
    <DashboardIcon className={_classes["sidebar-icon-hover"]} />,
    <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
    <PhysicianIcon className={_classes["sidebar-icon-hover"]} />,
    <PatientIcon className={_classes["sidebar-icon-hover"]} />,
    <MessageIcon className={_classes["sidebar-icon-hover"]} />,
    <ReportIcon className={_classes["sidebar-icon-hover"]} />,
    <StaffIcon className={_classes["sidebar-icon-hover"]} />,
    <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
    <SettingIcon className={_classes["sidebar-icon-hover"]} />,
  ];
  const IconsListPhysicianMainMenu = [
    <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
    <DollarIcon className={_classes["sidebar-icon-hover"]} />,
  ];

  const router = useRouter();

  // API FOR Appointment COUNT Notificaiton
  const [{ data: countsData, fetching }] = useAppointmentCountByStatusQuery({
    // variables: {},
  });
  const { appointmentCountByStatus } = countsData || {};

  const { canceled, history, pending, upcoming } =
    appointmentCountByStatus || {};

  const [localAppointmentAlertData, setLocalAppointmentAlertData] =
    useState<any>();

  useEffect(() => {
    try {
      if (appointmentCountByStatus) {
        let appointmentsAlertData = localStorage.getItem(
          "appointmentsAlertData"
        );
        if (appointmentsAlertData) {
          appointmentsAlertData = JSON.parse(appointmentsAlertData);
          let updatedAlertData = {
            ...(appointmentsAlertData as unknown as object),
          };
          if (router.asPath.includes("/upcoming")) {
            updatedAlertData = {
              ...updatedAlertData,
              upcoming,
            };
          } else if (router.asPath.includes("/canceled")) {
            updatedAlertData = {
              ...updatedAlertData,
              canceled,
            };
          } else if (router.asPath.includes("/pending")) {
            updatedAlertData = {
              ...updatedAlertData,
              pending,
            };
          } else if (router.asPath.includes("/history")) {
            updatedAlertData = {
              ...updatedAlertData,
              history,
            };
          }
          localStorage.setItem(
            "appointmentsAlertData",
            JSON.stringify(updatedAlertData)
          );
          setLocalAppointmentAlertData({
            ...(appointmentsAlertData as unknown as object),
            ...updatedAlertData,
          });
        } else {
          localStorage.setItem(
            "appointmentsAlertData",
            JSON.stringify({ upcoming })
          );
        }
      }
    } catch (error) {
      localStorage.removeItem("appointmentsAlertData");
    }
  }, [
    canceled,
    history,
    pending,
    upcoming,
    appointmentCountByStatus,
    router.asPath,
  ]);

  // API FOR MESSAGES COUNT

  const [{ data: msgCountsData }] = useGetUnreadMessageCountQuery({
    variables: { filter: { searchString: "" } },
    requestPolicy: "network-only",
  });
  console.log("msgCountsData", msgCountsData);
  const { getAllChatChannels } = msgCountsData || {};
  const [msgCount, setMsgCount] = React.useState<number | undefined>(0);
  useEffect(() => {
    if (getAllChatChannels?.length !== 0) {
      const msgCountfinal = getAllChatChannels
        ?.map((channel) => channel.unReadMessagesCount?.channelMessagesCount)
        .reduce((total, currentValue, index, arr) => {
          return (total || 0) + (currentValue || 0);
        });
      setMsgCount(msgCountfinal);
    } else {
      setMsgCount(0);
    }

    // return () => {
    //   setMsgCount;
    // };
  }, [msgCount, setMsgCount, getAllChatChannels]);

  return (
    <div className={`${_classes["side-menu-cover"]} w-full`}>
      <Menu
        defaultSelectedKeys={["/"]}
        selectedKeys={[router.pathname]}
        mode="inline"
      >
        {getRole() === "User" &&
          PATIENT_ROUTES?.map((el, i) => {
            return el.submenu && el.submenu.length > 0 ? (
              <Menu.SubMenu
                className={_classes["side-bar-submenu-item"]}
                key="sub1"
                icon={
                  <AppointmentIcon className={_classes["sidebar-icon-hover"]} />
                }
                // title="Equipo"
                // title="Appointments"
                title={
                  <div className="relative">
                    Appointments
                    {(localAppointmentAlertData?.upcoming !== upcoming ||
                      localAppointmentAlertData?.pending !== pending ||
                      localAppointmentAlertData?.canceled !== canceled ||
                      localAppointmentAlertData?.history !== history) && (
                      <span className={_classes["red-dot"]}></span>
                    )}
                  </div>
                }
              >
                {el.submenu?.map((el2, i2) => {
                  let dot = false;
                  switch (el2.subId) {
                    case "1":
                      if (localAppointmentAlertData?.upcoming !== upcoming)
                        dot = true;
                      break;
                    case "2":
                      if (localAppointmentAlertData?.pending !== pending)
                        dot = true;
                      break;
                    case "3":
                      if (localAppointmentAlertData?.canceled !== canceled)
                        dot = true;
                      break;
                    case "4":
                      if (localAppointmentAlertData?.history !== history)
                        dot = true;
                      break;
                    default:
                      break;
                  }
                  return (
                    <Menu.Item key={el2.route}>
                      {el.id == "1" ? (
                        <Link passHref href={el2.route}>
                          <Badge
                            dot={dot}
                            // count={100}
                            className={_classes["side-bar-submenu-count"]}
                          >
                            <>{el2.name}</>
                          </Badge>
                        </Link>
                      ) : (
                        <Link href={el2.route}>
                          <>{el2.name}</>
                        </Link>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={el.route}
                icon={IconsListPatient[i]}
                className={_classes["side-bar-submenu-item"]}
              >
                {el.id == "3" ? (
                  // <Badge
                  //   count={100}
                  //   className={_classes["side-bar-submenu-count"]}
                  // >
                  //   <Link href={el.route}>{el.name}</Link>
                  // </Badge>
                  <Link passHref href={el.route}>
                    <Badge
                      count={msgCount}
                      className={_classes["side-bar-submenu-count"]}
                    >
                      <>{el.name}</>
                    </Badge>
                  </Link>
                ) : (
                  <Link href={el.route}>{el.name}</Link>
                )}
              </Menu.Item>
            );
          })}
        {getRole() === "Admin" &&
          ADMIN_ROUTES?.map((el, i) => {
            return el.submenu && el.submenu.length > 0 ? (
              <Menu.SubMenu
                className={_classes["side-bar-submenu-item"]}
                key="sub1"
                icon={<ReportIcon className={_classes["sidebar-icon-hover"]} />}
                title="Reports"
              >
                {el.submenu?.map((el2, i2) => {
                  let dot = false;
                  switch (el2.subId) {
                    case "1":
                      if (localAppointmentAlertData?.upcoming !== upcoming)
                        dot = true;
                      break;
                    case "2":
                      if (localAppointmentAlertData?.pending !== pending)
                        dot = true;
                      break;
                    case "3":
                      if (localAppointmentAlertData?.canceled !== canceled)
                        dot = true;
                      break;
                    case "4":
                      if (localAppointmentAlertData?.history !== history)
                        dot = true;
                      break;
                    default:
                      break;
                  }
                  return (
                    <Menu.Item
                      key={el2.route}
                      className={_classes["side-bar-submenu-item"]}
                    >
                      {el.id == "2" ? (
                        <Link passHref href={el2.route}>
                          {/* <Badge
                            dot={dot}
                            // count={100}
                            className={_classes["side-bar-submenu-count"]}
                          >
                            <>{el2.name}</>
                          </Badge> */}
                          <>{el2.name}</>
                        </Link>
                      ) : (
                        <Link href={el2.route}>
                          <>{el2.name}</>
                        </Link>
                      )}
                      {/* <Link href={el2.route}>{el2.name}</Link> */}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={el.route}
                icon={IconsListAdmin[i]}
                className={_classes["side-bar-submenu-item"]}
              >
                {el.id == "5" ? (
                  <Link passHref href={el.route}>
                    <Badge
                      count={msgCount}
                      className={_classes["side-bar-submenu-count"]}
                    >
                      <>{el.name}</>
                    </Badge>
                  </Link>
                ) : (
                  <Link href={el.route}>{el.name}</Link>
                )}
                {/* <Link href={el.route}>{el.name}</Link> */}
              </Menu.Item>
            );
          })}
        {getRole() === "Doctor" &&
          DOCTOR_ROUTES?.map((el, i) => {
            return el.submenu && el.submenu.length > 0 ? (
              <Menu.SubMenu
                className={_classes["side-bar-submenu-item"]}
                key={i}
                icon={IconsListPhysicianMainMenu[i]}
                // title={el.toggleName}
                title={
                  <div className="relative">
                    {el.toggleName}
                    {(localAppointmentAlertData?.upcoming !== upcoming ||
                      localAppointmentAlertData?.pending !== pending ||
                      localAppointmentAlertData?.canceled !== canceled ||
                      localAppointmentAlertData?.history !== history) && (
                      <span className={_classes["red-dot"]}></span>
                    )}
                  </div>
                }
              >
                {el.submenu?.map((el2, i2) => {
                  type: {
                    route: String;
                  }
                  let dot = false;
                  switch (el2.subId) {
                    case "1":
                      if (localAppointmentAlertData?.upcoming !== upcoming)
                        dot = true;
                      break;
                    case "2":
                      if (localAppointmentAlertData?.pending !== pending)
                        dot = true;
                      break;
                    case "3":
                      if (localAppointmentAlertData?.canceled !== canceled)
                        dot = true;
                      break;
                    case "4":
                      if (localAppointmentAlertData?.history !== history)
                        dot = true;
                      break;
                    default:
                      break;
                  }
                  return (
                    <Menu.Item
                      key={el2.route}
                      className={_classes["side-bar-submenu-item"]}
                    >
                      {el.id === "1" ? (
                        <Link passHref href={el2.route}>
                          <Badge
                            dot={dot}
                            // count={100}
                            className={_classes["side-bar-submenu-count"]}
                          >
                            <>{el2.name}</>
                          </Badge>
                        </Link>
                      ) : (
                        // <Link href={el2.route}>
                        //   <>{el2.name}</>
                        // </Link>
                        <Link href={el2.route}>{el2.name}</Link>
                      )}
                      {/* <Link href={el2.route}>{el2.name}</Link> */}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={el.route}
                icon={IconsListPhysician[i]}
                className={_classes["side-bar-submenu-item"]}
              >
                {el.id == "5" ? (
                  <Link passHref href={el.route}>
                    <Badge
                      count={msgCount}
                      className={_classes["side-bar-submenu-count"]}
                    >
                      <>{el.name}</>
                    </Badge>
                  </Link>
                ) : (
                  <Link href={el.route}>{el.name}</Link>
                )}
                {/* <Link href={el.route}>{el.name}</Link> */}
              </Menu.Item>
            );
          })}

        {getRole() === "Staff" &&
          STAFF_ROUTES?.map((el, i) => {
            return el.submenu && el.submenu.length > 0 ? (
              <Menu.SubMenu
                className={_classes["side-bar-submenu-item"]}
                key={i}
                icon={IconsListPhysicianMainMenu[i]}
                title={el.toggleName}
              >
                {el.submenu?.map((el2, i2) => {
                  type: {
                    route: String;
                  }
                  let dot = false;
                  switch (el2.subId) {
                    case "1":
                      if (localAppointmentAlertData?.upcoming !== upcoming)
                        dot = true;
                      break;
                    case "2":
                      if (localAppointmentAlertData?.pending !== pending)
                        dot = true;
                      break;
                    case "3":
                      if (localAppointmentAlertData?.canceled !== canceled)
                        dot = true;
                      break;
                    case "4":
                      if (localAppointmentAlertData?.history !== history)
                        dot = true;
                      break;
                    default:
                      break;
                  }
                  return (
                    <Menu.Item
                      key={el2.route}
                      className={_classes["side-bar-submenu-item"]}
                    >
                      {el.id == "1" ? (
                        // <Badge
                        //   dot
                        //   count={100}
                        //   className={_classes["side-bar-submenu-count"]}
                        // >
                        //   <Link href={el2.route}>
                        //     <>{el2.name}</>
                        //   </Link>
                        // </Badge>
                        <Link passHref href={el2.route}>
                          <Badge
                            dot={dot}
                            // count={100}
                            className={_classes["side-bar-submenu-count"]}
                          >
                            <>{el2.name}</>
                          </Badge>
                        </Link>
                      ) : (
                        <Link href={el2.route}>
                          <>{el2.name}</>
                        </Link>
                      )}
                      {/* <Link href={el2.route}>{el2.name}</Link> */}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={el.route}
                icon={IconsListPhysician[i]}
                className={_classes["side-bar-submenu-item"]}
              >
                {el.id == "3" ? (
                  <Link passHref href={el.route}>
                    <Badge
                      count={msgCount}
                      className={_classes["side-bar-submenu-count"]}
                    >
                      <>{el.name}</>
                    </Badge>
                  </Link>
                ) : (
                  <Link href={el.route}>{el.name}</Link>
                )}
                {/* <Link href={el.route}>{el.name}</Link> */}
              </Menu.Item>
            );
          })}
      </Menu>
    </div>
  );
}

export default SidebarMenuItem;
