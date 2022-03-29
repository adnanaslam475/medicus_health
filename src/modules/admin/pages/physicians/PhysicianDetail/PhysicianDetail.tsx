import { Card } from "antd";
import React from "react";
import DoctorProfileCard from "../../../../../common/components/DoctorCardsDetail/DoctorProfileCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";


function PhysiciansDetail() {
    return (
        <AppLayout>
        <div className="w-full">
            <div className="lg:w-4/5 mx-auto">
                {/* <h2 className="mb-4">Physician Profile</h2> */}
                <div className="w-full py-5">
                    <DoctorProfileCard />
                </div>
            </div>
        </div>
        </AppLayout>
      );
}
export default PhysiciansDetail;
