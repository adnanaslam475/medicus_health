import React from "react";
import AppointmentTabs from "../../../../../common/components/Appointments/AppointmentTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import { useLocale } from "next-intl";
import initTranslation from "common/utils/initTranslation";
import i18next from "i18next";

initTranslation(["AppointmentDetail"]);
function AccountDetail() {
  const { query } = useRouter();
  i18next.changeLanguage(useLocale());
  const t = i18next.t;
  console.log(t("title"));

  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">Appointment detail</h2>
        <div className="w-full">
          <AppointmentTabs appointmentId={Number(query?.id)} />
        </div>
      </div>
    </AppLayout>
  );
}
export default AccountDetail;
