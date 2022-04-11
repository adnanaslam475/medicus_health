import React from "react";
import DoctorCard from "../../../../../common/components/DoctorCards/DoctorCards";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useDoctorProfilesQuery } from "../../../../../generated/graphql";

function Physicians() {
  const [{ data }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="mb-4">Physicians</h2>
          <div className="w-full">
            {doctorProfiles?.map((profile, i) => {
              const {
                id,
                user,
                language,
                specialization,
                about_me: aboutMe,
                professional_experience: professionalExperience,
                year_of_experience: yearOfExperience,
                condition_treated: conditionTreated,
              } = profile || {};
              return (
                <DoctorCard
                  key={id}
                  id={id}
                  name={user?.first_name + " " + user?.last_name}
                  language={language || ""}
                  specialization={specialization || ""}
                  aboutMe={aboutMe || ""}
                  professionalExperience={professionalExperience || ""}
                  yearOfExperience={yearOfExperience || 0}
                  conditionTreated={conditionTreated || ""}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default Physicians;
