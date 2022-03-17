import { Card } from "antd";
import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";


function physicians() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="mb-4">Physicians</h2>
          <div className="w-full">
          <DoctorCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default physicians;
