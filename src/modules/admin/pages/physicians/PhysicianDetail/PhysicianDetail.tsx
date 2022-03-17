import { Card } from "antd";
import React from "react";
import DoctorProfileCard from "../../../../../common/components/DoctorCardsDetail/DoctorProfileCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";


function physiciansDetail() {
    return (
        <AppLayout>
        <div className="w-full">
            <div className="lg:w-4/5 mx-auto">
                <h2 className="mb-4">Physician Profile</h2>
                <div className="w-full">
                    <DoctorProfileCard />
                </div>
            </div>
        </div>
        </AppLayout>
      );
}
export default physiciansDetail;
