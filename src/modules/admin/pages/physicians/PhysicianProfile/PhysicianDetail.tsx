import React from "react";
import DoctorProfileCard from "../../../../../common/components/DoctorCardsDetail/DoctorProfileCard";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import {
  DoctorProfile,
  useDoctorProfileDetailsQuery,
  useDoctorProfileQuery,
} from "../../../../../generated/graphql";
import { useRouter } from "next/router";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";
initTranslation(["PhysicianList"]);
function PhysiciansDetail() {
  i18next.changeLanguage(useLocale());
  const t = i18next.t;
  console.log(t("PhysicianList"));

  //   GET ID FROM URL
  const { query } = useRouter();

  const [result] = useDoctorProfileQuery({
    variables: { doctor_id: Number(query?.id) },
  });

  const { data, fetching } = result || {};
  const { doctorProfile } = data || {};

  return (
    <AppLayout>
      <div className="w-full">
        <div className="xl:w-4/5 mx-auto">
          <div className="w-full py-5">
            <DoctorProfileCard
              doctorData={doctorProfile as DoctorProfile}
              loading={fetching}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default PhysiciansDetail;
