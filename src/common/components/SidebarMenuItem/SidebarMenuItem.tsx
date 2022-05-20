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
  <PhysicianIcon className={_classes["sidebar-icon-hover"]} />,
  <ChatBubbleIcon className={_classes["sidebar-icon-hover"]} />,
  <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
  <ProfileIcon className={_classes["sidebar-icon-hover"]} />,
];

function SidebarMenuItem() {
  const router = useRouter();

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
              className={_classes[""]}
              key="sub1"
              icon={
                <AppointmentIcon className={_classes["sidebar-icon-hover"]} />
              }
              title="Appointments"
            >
              {el.submenu?.map((el2, i2) => {
                return (
                  <Menu.Item
                    key={el2.route}
                    // icon={IconsList[i2]}
                  >
                    <Link href={el2.route}>{el2.name}</Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={el.route}
              
              icon={IconsList[i]}
            >
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
      {getRole() === "Admin" &&
        ADMIN_ROUTES?.map((el, i) => {
          return el.submenu && el.submenu.length > 0 ? (
            <Menu.SubMenu
              
              key="sub1"
              icon={
                <AppointmentIcon className={_classes["sidebar-icon-hover"]} />
              }
              title="Appointments"
            >
              {el.submenu?.map((el2, i2) => {
                return (
                  <Menu.Item
                    key={el2.route}
                    
                    // icon={IconsList[i2]}
                  >
                    <Link href={el2.route}>{el2.name}</Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={el.route}
              icon={IconsList[i]}
              
            >
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
      {getRole() === "Doctor" &&
        DOCTOR_ROUTES?.map((el, i) => {
          return el.submenu && el.submenu.length > 0 ? (
            <Menu.SubMenu
              
              key="sub1"
              icon={
                <AppointmentIcon className={_classes["sidebar-icon-hover"]} />
              }
              title="Appointments"
            >
              {el.submenu?.map((el2, i2) => {
                type: {
                  route: String;
                }
                return (
                  <Menu.Item
                    key={el2.route}
                    // icon={IconsList[i2]}
                    
                  >
                    <Link href={el2.route}>{el2.name}</Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={el.route}
              icon={IconsList[i]}
              
            >
              <Link href={el.route}>{el.name}</Link>
            </Menu.Item>
          );
        })}
    </Menu>
    </div>

  );
}

export default SidebarMenuItem;
