import AppLayout from "common/components/AppLayout/AppLayout";
import StatisticsCard from "common/components/StatisticsCard/StatisticsCard";
import Image from "next/image";
import React from "react";
import users from "../../../../../public/assets/icon/users.svg";
import physician from '../../../../../public/assets/images/admin/menu/physicians-hover.svg';
import profile from '../../../../../public/assets/images/admin/menu/profile-hover.svg'
import revenue from '../../../../../public/assets/icon/dollar-hover.svg'
import _classes from "./AdminDashboard.module.scss";
function AdminDashboard() {
	return (
		<AppLayout>
			<div className="xl:flex my-3 gap-4">
				<StatisticsCard
					src={users}
					title="Total Number of Users "
					value={101}
				/>
				<StatisticsCard
					src={physician}
					title="Number of Appointments "
					value={201}
				/>
				<StatisticsCard src={profile} title="Number of Physicians " value={301} />
				<StatisticsCard
					src={revenue}
					title="The total revenue to date ($)"
					value={501}
				/>
			</div>
		</AppLayout>
	);
}

export default AdminDashboard;
