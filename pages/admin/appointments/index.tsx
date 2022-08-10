import React from "react";
import AdminAppointments from "modules/admin/pages/AdminAppointments/AdminAppointments";
import { translationJson } from "common/locales/translationJson";

function index() {
  return <AdminAppointments />;
}

export default index;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
