import AppLayout from "common/components/AppLayout/AppLayout";
import StatisticsCard from "common/components/StatisticsCard/StatisticsCard";
import React from "react";
import users from "../../../../../public/assets/icon/users.svg";
import appointments from "../../../../../public/assets/icon/appointments.svg";
import physician from "../../../../../public/assets/images/admin/menu/physicians-hover.svg";
import revenue from "../../../../../public/assets/icon/dollars.svg";
import _classes from "./AdminDashboard.module.scss";
import { useAdminDashboardQuery } from "generated/graphql";
import { valueSeparator } from "common/utils/helper";
function AdminDashboard() {
  const [{ data }] = useAdminDashboardQuery({
    variables: {
      filter: {},
    },
  });
  const { adminDashboard } = data || {};
  const {
    total_number_of_appointments,
    total_number_of_physicians,
    total_number_of_users,
    total_revenue,
  } = adminDashboard || {};

  return (
    <AppLayout>
      <div className="xl:flex flex-wrap">
        <div className="basis-1/2">
          <StatisticsCard
            src={users}
            title="Total number of users "
            value={
              total_number_of_users ? valueSeparator(total_number_of_users) : 0
            }
          />
        </div>
        <div className="basis-1/2">
          <StatisticsCard
            src={appointments}
            title="Number of appointments "
            value={
              total_number_of_appointments
                ? valueSeparator(total_number_of_appointments)
                : 0
            }
          />
        </div>
        <div className="basis-1/2">
          <StatisticsCard
            src={physician}
            title="Number of physicians "
            value={
              total_number_of_physicians
                ? valueSeparator(total_number_of_physicians)
                : 0
            }
          />
        </div>
        <div className="basis-1/2">
          <StatisticsCard
            src={revenue}
            title="The total revenue to date ($)"
            value={total_revenue ? valueSeparator(total_revenue) : 0}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;
