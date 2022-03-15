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
import { PATIENT_ROUTES, ADMIN_ROUTES, DOCTOR_ROUTES } from "../../constants/routes";

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
        PATIENT_ROUTES?.map((el) => {
          return (
            <Menu.Item key={el.route}>
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
