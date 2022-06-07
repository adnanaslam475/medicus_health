import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "antd";
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
} from "../../constants/routes";
import { SettingIcon } from "../CustomIcon/SettingIcon";

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
								title="Appointments"
							>
								{el.submenu?.map((el2, i2) => {
									return (
										<Menu.Item
											key={el2.route}
										>
											<Link href={el2.route}>{el2.name}</Link>
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
								<Link href={el.route}>{el.name}</Link>
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
									return (
										<Menu.Item
											key={el2.route}
											className={_classes["side-bar-submenu-item"]}
										>
											<Link href={el2.route}>{el2.name}</Link>
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
								<Link href={el.route}>{el.name}</Link>
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
								title={el.toggleName}
							>
								{el.submenu?.map((el2, i2) => {
									type: {
										route: String;
									}
									return (
										<Menu.Item
											key={el2.route}
											className={_classes["side-bar-submenu-item"]}
										>
											<Link href={el2.route}>{el2.name}</Link>
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
								<Link href={el.route}>{el.name}</Link>
							</Menu.Item>
						);
					})}
			</Menu>
		</div>
	);
}

export default SidebarMenuItem;
