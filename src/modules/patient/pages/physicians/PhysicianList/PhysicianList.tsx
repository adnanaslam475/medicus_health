import React from "react";
import DoctorCard from "common/components/DoctorCards/DoctorCards";
import AppLayout from "common/components/AppLayout/AppLayout";
import { DoctorProfile, useDoctorProfilesQuery } from "generated/graphql";
import Link from "next/link";

function Physicians() {
  const [{ data, fetching }] = useDoctorProfilesQuery();
  const { doctorProfiles } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="mb-0">Physicians</h2>
          <div className="mb-6">
            <span className=" min-h-max hidden md:block">
              If you need help in selecting a suitable physician, our admin team
              is a
              <span>
                <Link href="/patient/messages">
                  <a className="underline text-primary px-3 whitespace-nowrap">
                    message away
                  </a>
                </Link>
              </span>
            </span>
          </div>
          <div className="w-full">
            {doctorProfiles?.map((profile, i) => {
              const {
                id,
                doctor_id,
                user,
                language,
                specialization,
                about_me: aboutMe,
                professional_experience: professionalExperience,
                year_of_experience: yearOfExperience,
                condition_treated: conditionTreated,
                profile_image,
              } = profile || {};

              return (
                <DoctorCard
                  key={id}
                  id={doctor_id}
                  name={user?.first_name + " " + user?.last_name}
                  language={language || ""}
                  specialization={specialization || ""}
                  aboutMe={aboutMe || ""}
                  professionalExperience={professionalExperience || ""}
                  yearOfExperience={yearOfExperience || 0}
                  conditionTreated={
                    conditionTreated?.replaceAll(",", " // ") || ""
                  }
                  profile_image={profile_image}
                  doctorProfile={profile as DoctorProfile}
                  loading={fetching}
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
