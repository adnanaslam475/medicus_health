import React from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useDoctorProfileQuery } from "../../../../../generated/graphql";
import { useRouter } from "next/router";
function PatientDetail() {
  //   GET ID FROM URL
  const { query } = useRouter();

  const [{ data }] = useDoctorProfileQuery({
    variables: { doctor_id: Number(query?.id) },
  });

  const { doctorProfile } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <div className="w-full py-5">
            {/* <DoctorProfileCard doctorData={doctorProfile as DoctorProfile} /> */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientDetail;
