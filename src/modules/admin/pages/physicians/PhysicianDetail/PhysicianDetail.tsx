import { Card } from "antd";
import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";


function physiciansDetails() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="mb-4">Physician Profile</h2>
          <div className="w-full">
          <DoctorCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default physiciansDetails;
