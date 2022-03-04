/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Menu, Badge } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import _classes from "./SidebarMenuItem.module.scss";

// import {
//   mdAdminDashboardIcon,
//   AppointmentIcon,
//   PhysicianIcon,
//   ChatBubbleIcon,
//   ProfileIcon,
// } from "../../../utils/adminSideMenuIcons";

import {
  AppointmentIcon,
  ChatBubbleIcon,
  ProfileIcon,
  PhysicianIcon,
} from "./../CustomIcon";

function SidebarMenuItem() {
  const router = useRouter();
  return (
    <Menu
      defaultSelectedKeys={["/"]}
      selectedKeys={[router.pathname]}
      mode="inline"
      className="bg-gray-4 border-r-0"
    >
      {/* <Menu.Item
        key="1"
        icon={
          <div>
            <Image width={14} height={14} src={mdAdminDashboardIcon} alt="" />
          </div>
        }
        onClick={() => Router.push("/dashboard")}
      >
        Dashboard
      </Menu.Item> */}
      <Menu.SubMenu
        className={_classes["side-bar-submenu-item"]}
        key="sub1"
        icon={<AppointmentIcon className={_classes["sidebar-icon-hover"]} />}
        title="Appointments"
      >
        <Menu.Item
          key="2"
          onClick={() => Router.push("/appointments/upcoming")}
        >
          <Link href="/appointments/upcoming">Upcoming</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          onClick={() => Router.push("/appointments/requested")}
        >
          <Link href="/appointments/requested">Requested</Link>
        </Menu.Item>

        <Menu.Item
          key="4"
          onClick={() => Router.push("/appointments/cancelled")}
        >
          <Link href="/appointments/cancelled">Cancelled</Link>
        </Menu.Item>

        <Menu.Item key="5" onClick={() => Router.push("/appointments/history")}>
          <Link href="/appointments/history">History</Link>
        </Menu.Item>
      </Menu.SubMenu>



      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="6"
        icon={<PhysicianIcon className={_classes["sidebar-icon-hover"]} />}
        onClick={() => Router.push("/physicians")}
      >
        <Link href="/physicians">Physicians</Link>
      </Menu.Item>

      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="7"
        icon={<ChatBubbleIcon className={_classes["sidebar-icon-hover"]} />}
        onClick={() => Router.push("/messages")}
      >
        <div className="flex justify-between items-center">
          <Link href="/messages">Messages</Link>
          <Badge count={12} />
        </div>
      </Menu.Item>

      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="8"
        icon={
          <div>
            <ProfileIcon
              className={_classes["sidebar-icon-hover"]}
              fill="red"
            />
          </div>
        }
        onClick={() => Router.push("/account")}
      >
        <Link href="/account">Account</Link>
      </Menu.Item>
    </Menu>
  );
}

export default SidebarMenuItem;
