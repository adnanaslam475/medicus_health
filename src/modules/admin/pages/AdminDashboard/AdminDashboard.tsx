import AppLayout from "common/components/AppLayout/AppLayout";
import StatisticsCard from "common/components/StatisticsCard/StatisticsCard";
import React from "react";
import users from "../../../../../public/assets/icon/users.svg";
import appointments from "../../../../../public/assets/icon/appointments.svg";
import consultationIconDashBoard from "../../../../../public/assets/icon/consultationIconDashBoard.svg";
import physician from "../../../../../public/assets/images/admin/menu/physicians-hover.svg";
import revenue from "../../../../../public/assets/icon/dollars.svg";
import _classes from "./AdminDashboard.module.scss";
import { useAdminDashboardQuery } from "generated/graphql";
import { valueSeparator } from "common/utils/helper";
import { currencyFormatter, numberFormatter } from "common/utils/date";
function AdminDashboard() {
  const [{ data }] = useAdminDashboardQuery({
    variables: {
      filter: {},
    },
  });
  const { adminDashboard } = data || {};
  const {
    total_number_of_users = 0,
    total_number_of_physicians = 0,
    total_number_of_consultation = 0,
    total_number_of_second_opinions = 0,
    net_gross_sale = 0,
    net_physician_fee = 0,
    total_medicus_revenue = 0,
  } = adminDashboard || {};

  const adminDashboardStatistics = [
    {
      key: "Total number of patients",
      value: numberFormatter(Number(total_number_of_users)),
      icon: users,
    },
    {
      key: "Total number of physicians",
      value: numberFormatter(Number(total_number_of_physicians)),
      icon: physician,
    },
    {
      key: "Total number of consultations",
      value: numberFormatter(Number(total_number_of_consultation)),
      icon: consultationIconDashBoard,
    },
    {
      key: "Total number of second opinions",
      value: numberFormatter(Number(total_number_of_second_opinions)),
      icon: appointments,
    },
    {
      key: "($) Net gross sales",
      value: currencyFormatter(Number(net_gross_sale)),
      icon: revenue,
    },
    {
      key: "($) Net physician fee",
      value: currencyFormatter(Number(net_physician_fee)),
      icon: revenue,
    },
    {
      key: "($) Total medicus revenue",
      value: currencyFormatter(Number(total_medicus_revenue)),
      icon: revenue,
    },
  ];

  return (
    <AppLayout>
      <div className="xl:flex flex-wrap">
        {adminDashboardStatistics.map((dashboardValue, index) => {
          return (
            <div className="basis-1/2" key={index}>
              <StatisticsCard
                src={dashboardValue?.icon}
                title={dashboardValue?.key}
                value={dashboardValue?.value}
              />
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;
