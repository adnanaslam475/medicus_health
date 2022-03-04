import React from "react";
import { Layout } from "antd";
// import Statistic from "../../../../common/components/Statistic";
// import BarComp from "../../components/AdminBarChart";
// import StatesActive from "../../../../common/components/ActiveStates";
// import SimpleMap from "../../components/AdminMap";
// import TopFive from "../../components/AdminTopFive";
// import Tricomp from "../../components/AdminTriComp";
import AppLayout from "../../../../common/components/Layout";
// import { aimsDashboardUsers, aimsDashboardTeacher, aimsDashboardGroup } from "../../../../utils/dasboardImages";

const { Content } = Layout;

function Dashboard() {
  return (
    <AppLayout>
      {() => (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-none lg:grid-cols-3 gap-6">
            {/* <Statistic
              imageSource={aimsDashboardUsers}
              activeStatist="21,786"
              activeStatistName="Active Students"
              totalStatist="23,845"
              totalStatistName="Total Registered Students"
            />
            <Statistic
              imageSource={aimsDashboardTeacher}
              activeStatist="389"
              activeStatistName="Active Teachers"
              totalStatist="584"
              totalStatistName="Total Registered Teachers"
            />
            <Statistic
              imageSource={aimsDashboardGroup}
              activeStatist="146"
              activeStatistName="Active Organizations"
              totalStatist="160"
              totalStatistName="Total Registered Organizations"
            /> */}
          </div>
          <div className="grid grid-cols-none  lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3  gap-6 ">
            <div className="bg-white col-span-2">
              {/* <BarComp title="Average Time Spent On a Patient Encounter" /> */}
            </div>
            <div className=" bg-white flex p-5 h-96 2xl:h-auto  col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1 ">
              {/* <SimpleMap /> */}
            </div>
          </div>
          {/* <Content className="grid grid-cols-none lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <Tricomp />
            <StatesActive />
            <TopFive title="Top Five Classes" />
            <TopFive title="Top Five Students" avatar />
          </Content> */}
        </div>
      )}
    </AppLayout>
  );
}

export default Dashboard;
