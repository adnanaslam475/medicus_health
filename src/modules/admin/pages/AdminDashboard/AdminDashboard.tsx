import AppLayout from "common/components/AppLayout/AppLayout";
import StatisticsCard from "common/components/StatisticsCard/StatisticsCard";
import React from "react";
import users from "../../../../../public/assets/icon/users.svg";
import physician from "../../../../../public/assets/images/admin/menu/physicians-hover.svg";
import profile from "../../../../../public/assets/images/admin/menu/profile-hover.svg";
import revenue from "../../../../../public/assets/icon/dollar-hover.svg";
import _classes from "./AdminDashboard.module.scss";
import { useAdminDashboardStatisticsQuery } from "generated/graphql";
function AdminDashboard() {
  const [{ data }] = useAdminDashboardStatisticsQuery();
  const { adminDash } = data || {};
  const {
    total_number_of_appointments,
    total_number_of_physicians,
    total_number_of_users,
    total_revenue,
  } = adminDash || {};

  return (
    <AppLayout>
      <div className="xl:flex my-3 gap-4">
        <StatisticsCard
          src={users}
          title="Total Number of Users "
          value={total_number_of_users || 0}
        />
        <StatisticsCard
          src={physician}
          title="Number of Appointments "
          value={total_number_of_appointments || 0}
        />
        <StatisticsCard
          src={profile}
          title="Number of Physicians "
          value={total_number_of_physicians || 0}
        />
        <StatisticsCard
          src={revenue}
          title="The total revenue to date ($)"
          value={total_revenue || 0}
        />
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;
