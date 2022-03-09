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

function SidebarMenuItem() {
  const router = useRouter();
  return (
    <Menu
      defaultSelectedKeys={["/"]}
      selectedKeys={[router.pathname]}
      mode="inline"
      className="bg-gray-4 border-r-0"
    >
      <Menu.SubMenu
        className={_classes["side-bar-submenu-item"]}
        key="sub1"
        icon={<AppointmentIcon className={_classes["sidebar-icon-hover"]} />}
        title="Appointments"
      >
        <Menu.Item key="/appointments/upcoming">
          <Link href="/appointments/upcoming">Upcoming</Link>
        </Menu.Item>

        <Menu.Item key="/appointments/requested">
          <Link href="/appointments/requested">Requested</Link>
        </Menu.Item>

        <Menu.Item key="/appointments/cancelled">
          <Link href="/appointments/cancelled">Cancelled</Link>
        </Menu.Item>

        <Menu.Item key="/appointments/history">
          <Link href="/appointments/history">History</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="/physicians"
        icon={<PhysicianIcon className={_classes["sidebar-icon-hover"]} />}
      >
        <Link href="/physicians">Physicians</Link>
      </Menu.Item>

      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="/messages"
        icon={<ChatBubbleIcon className={_classes["sidebar-icon-hover"]} />}
      >
        <div className="flex justify-between items-center">
          <Link href="/messages">Messages</Link>
          <Badge count={12} />
        </div>
      </Menu.Item>

      <Menu.Item
        className={_classes["side-bar-submenu-item"]}
        key="/account"
        icon={
          <div>
            <ProfileIcon className={_classes["sidebar-icon-hover"]} />
          </div>
        }
      >
        <Link href="/account">Account</Link>
      </Menu.Item>
    </Menu>
  );
}

export default SidebarMenuItem;
