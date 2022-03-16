import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Badge } from "antd";
import {
  AppointmentIcon,
  ChatBubbleIcon,
  ProfileIcon,
  PhysicianIcon,
} from "../CustomIcon";
// styles
import _classes from "./SidebarMenuItem.module.scss";

import { getRole } from "../../utils/userData";
import {
  PATIENT_ROUTES,
  ADMIN_ROUTES,
  DOCTOR_ROUTES,
} from "../../constants/routes";

const IconsList = [
  <AppointmentIcon className={_classes["sidebar-icon-hover"]} />,
  <ChatBubbleIcon className={_classes["sidebar-icon-hover"]} />,
  <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
  <PhysicianIcon className={_classes["sidebar-icon-hover"]} />,
];

function SidebarMenuItem() {
  const router = useRouter();

  return (
    <Menu
      defaultSelectedKeys={["/"]}
      selectedKeys={[router.pathname]}
      mode="inline"
      className={`${_classes["side-menu-cover"]} bg-gray-4 border-r-0`}
    >
      {getRole() === "User" &&
        PATIENT_ROUTES?.map((el, i) => {
          return (
            //       <Menu.SubMenu
            //   className={_classes["side-bar-submenu-item"]}
            //   key="sub1"
            //   icon={<AppointmentIcon className={_classes["sidebar-icon-hover"]} />}
            //   title="Appointments"
            // >
            //   <Menu.Item key="/appointments/upcoming">
            //     <Link href="/appointments/upcoming">Upcoming</Link>
            //   </Menu.Item>

            //   <Menu.Item key="/appointments/requested">
            //     <Link href="/appointments/requested">Requested</Link>
            //   </Menu.Item>

            //   <Menu.Item key="/appointments/cancelled">
            //     <Link href="/appointments/cancelled">Cancelled</Link>
            //   </Menu.Item>

            //   <Menu.Item key="/appointments/history">
            //     <Link href="/appointments/history">History</Link>
            //   </Menu.Item>
            // </Menu.SubMenu>

            // <Menu.Item
            //   className={_classes["side-bar-submenu-item"]}
            //   key="/physicians"
            //   icon={<PhysicianIcon className={_classes["sidebar-icon-hover"]} />}
            // >
            //   <Link href="/physicians">Physicians</Link>
            // </Menu.Item>

            <Menu.Item key={el.route} icon={IconsList[i]}>
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
      {getRole() === "Doctor" &&
        ADMIN_ROUTES?.map((el) => {
          return (
            <Menu.Item key={el.route}>
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
      {getRole() === "Admin" &&
        DOCTOR_ROUTES?.map((el) => {
          return (
            <Menu.Item key={el.route}>
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
    </Menu>
  );
}

export default SidebarMenuItem;
