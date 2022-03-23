import { Card } from "antd";
import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useDoctorProfilesQuery } from "../../../../../generated/graphql";

function Physicians(props) {

  const [{ data }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  console.log(doctorProfiles, 'doctorProfiles');

  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="mb-4">Physicians</h2>
          <div className="w-full">
          { doctorProfiles?.map((el, i) => (<DoctorCard />)) }
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default Physicians;
