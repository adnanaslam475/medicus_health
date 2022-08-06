import React from "react";
import Router from "next/router";
import Link from "next/link";
import DoctorCard from "common/components/DoctorCards/DoctorCards";
import AppLayout from "common/components/AppLayout/AppLayout";
import { DoctorProfile, useDoctorProfilesQuery } from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { useTranslations } from "next-intl";

function Physicians() {
  const t = useTranslations("PhysicianList");
  const [{ data, fetching }] = useDoctorProfilesQuery({ variables: {} });
  const { doctorProfiles } = data || {};
  const { user } = getUserData();
  const { id: loggedInUser } = user || {};

  const routeToMessage = () => {
    const query = {
      chat: "admin",
      ...(user?.role === "Doctor"
        ? { doctorId: loggedInUser }
        : { patientId: loggedInUser }),
    };
    localStorage.setItem("id", JSON.stringify(query));
    Router.push({
      pathname: "/physician/messages",
      query,
    });
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="xl:w-4/5 mx-auto">
          <h2 className="mb-0">
            {t("our_physicians")}
            {/* Our physicians */}
          </h2>
          <div className="mb-6">
            <span className=" min-h-max sm:block md:block text-secondary text-sm">
              {t("message_admin_support")}
              {/* If you need help selecting a physician, our support team is a */}
              <span>
                <Link href="/patient/messages">
                  <a
                    onClick={routeToMessage}
                    className="underline text-primary px-1 whitespace-nowrap"
                  >
                    {t("message_away")}
                    {/* message away */}
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
