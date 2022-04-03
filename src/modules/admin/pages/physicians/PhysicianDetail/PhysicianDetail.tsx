import React from "react";
import DoctorProfileCard from "../../../../../common/components/DoctorCardsDetail/DoctorProfileCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { DoctorProfile, useDoctorProfileQuery } from "../../../../../generated/graphql";
import { useRouter } from "next/router";
function PhysiciansDetail() {
  
//   GET ID FROM URL
  const { query } = useRouter();
  console.log(query, "query");

  const [{ data }] = useDoctorProfileQuery({    
    // variables: { doctor_id: Number(query?.id) },
    variables: { doctor_id: Number(query?.id) },
  });
  
  const { doctorProfile } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">          
          <div className="w-full py-5">
            <DoctorProfileCard doctorData={doctorProfile as DoctorProfile} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PhysiciansDetail;
