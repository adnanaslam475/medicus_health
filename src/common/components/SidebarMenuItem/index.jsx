/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Menu } from "antd";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import {
  aimsAdminDashboardIcon,
  aimsUserIcon,
  aimsTeachersIcon,
  aimsStudentsIcon,
  aimsOrganizationIcon,
  aimsLevelsIcon,
  amisPatientIcon,
  aimsClassesIcons,
  aimsAssignmentIcon,
  aimsCoursesIcon,
  aimsChallengesIcon,
  aimsResultIcon,
  aimsSponsorshipIcon,
  aimsTipsIcons,
  aimsSubscriptionsIcons,
  aimsreportsIcon,
} from "../../../utils/adminSideMenuIcons";

function SidebarMenuItem() {
  const router = useRouter();
  return (
    <Menu defaultSelectedKeys={["/"]} selectedKeys={[router.pathname]} mode="inline" className="border-0">
      <Menu.Item
        key="1"
        icon={
          <div>
            <Image width={14} height={14} src={aimsAdminDashboardIcon} alt="" />
          </div>
        }
        onClick={() => Router.push("/dashboard")}
      >
        Dashboard
      </Menu.Item>
      <Menu.SubMenu
        key="sub1"
        icon={
          <div>
            <Image width={14} height={14} src={aimsUserIcon} alt="" />
          </div>
        }
        title="Users"
      >
        <Menu.Item key="2" onClick={() => Router.push("/users")}>
          Manage Users
        </Menu.Item>
        <Menu.Item key="3" onClick={() => Router.push("/users/create")}>
          Create User
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key="4"
        icon={
          <div>
            <Image width={14} height={14} src={aimsTeachersIcon} alt="" />
          </div>
        }
        // onClick={() => Router.push("/teacher")}
      >
        <Link href="/teacher">Teachers</Link>
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={
          <div>
            <Image width={14} height={14} src={aimsStudentsIcon} alt="" />
          </div>
        }
      >
        Students
      </Menu.Item>
      <Menu.Item
        key="6"
        icon={
          <div>
            <Image width={14} height={14} src={aimsOrganizationIcon} alt="" />
          </div>
        }
      >
        Organizations
      </Menu.Item>
      <Menu.Item
        key="7"
        icon={
          <div>
            <Image width={14} height={14} src={aimsLevelsIcon} alt="" />
          </div>
        }
        onClick={() => Router.push("/levels")}
      >
        Levels
      </Menu.Item>
      <Menu.SubMenu
        key="sub2"
        icon={
          <div>
            <Image width={14} height={14} src={aimsCoursesIcon} alt="" />
          </div>
        }
        title="Courses"
      >
        <Menu.Item key="8">
          <Link href="/course">Manage Courses</Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link href="/course/create">Create Course</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="sub3"
        icon={
          <div>
            <Image width={14} height={14} src={amisPatientIcon} alt="" />
          </div>
        }
        title="Patients"
      >
        <Menu.Item key="10">
          <Link href="/patients">Manage Patients</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link href="/patients/create">Create Patients</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="sub4a"
        icon={
          <div>
            <Image width={14} height={14} src={aimsClassesIcons} alt="" />
          </div>
        }
        title="Classes"
      >
        <Menu.Item key="10a">
          <Link href="/class">Manage Classes</Link>
        </Menu.Item>
        <Menu.Item key="11b">
          <Link href="/class/create">Create Class</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="sub4"
        icon={
          <div>
            <Image width={14} height={14} src={aimsAssignmentIcon} alt="" />
          </div>
        }
        title="Assignments"
      >
        <Menu.Item key="13">
          <Link href="/assignments/new">Create Assignments</Link>
        </Menu.Item>
        <Menu.Item key="14">
          <Link href="/assignments">Scheduled Assignments</Link>
        </Menu.Item>
        <Menu.Item key="15">
          <Link href="/assignments/unscheduled">Unscheduled Assignments</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="sub5"
        icon={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div>
            <Image width={14} height={14} src={aimsChallengesIcon} alt="" />
          </div>
        }
        title="Challenges"
      >
        <Menu.Item key="16">
          <Link href="/challenges/new">Create Challenges</Link>
        </Menu.Item>
        <Menu.Item key="17">
          <Link href="/challenges">Scheduled Challenges</Link>
        </Menu.Item>
        <Menu.Item key="26">
          <Link href="/challenges/unscheduled">Unscheduled Challenges</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="18"
        icon={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div>
            <Image width={14} height={14} src={aimsResultIcon} alt="" />
          </div>
        }
        title="Results"
      >
        <Menu.Item key="18a">
          <Link href="/results">View Statistics and Charts</Link>
        </Menu.Item>
        <Menu.Item key="18b">
          <Link href="/results/view">View Results</Link>
        </Menu.Item>
        <Menu.Item key="18c">
          <Link href="/results/details">Results Details</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="sub6"
        icon={
          <div>
            <Image width={14} height={14} src={aimsSponsorshipIcon} alt="" />
          </div>
        }
        title="Sponsorship Codes"
      >
        <Menu.Item key="19">
          <Link href="/sponsorship-codes"> Manage Codes </Link>
        </Menu.Item>
        <Menu.Item key="20">
          <Link href="/sponsorship-codes/new"> Generate Codes</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="sub7"
        icon={
          <div>
            <Image width={14} height={14} src={aimsTipsIcons} alt="" />
          </div>
        }
        title="Aims Tips"
      >
        <Menu.Item key="21">
          <Link href="/aims-tips"> Manage Tips</Link>
        </Menu.Item>

        <Menu.Item key="22">
          <Link href="/aims-tips/create">Create a Tip</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key="23"
        icon={
          <div>
            <Image width={10} height={14} src={aimsSubscriptionsIcons} alt="" />
          </div>
        }
      >
        Subscriptions
      </Menu.Item>
      <Menu.SubMenu
        key="sub8"
        icon={
          <div>
            <Image width={14} height={14} src={aimsreportsIcon} alt="" />
          </div>
        }
        title="Reports"
      >
        <Menu.Item key="24">Subscription Transaction Report</Menu.Item>
        <Menu.Item key="25">E-commerce Revenue Report</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default SidebarMenuItem;
