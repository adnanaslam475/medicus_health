import React from "react";
import CancelledAppointmentsDetailDoctor from "modules/doctor/pages/appointments/CancelledAppointmentsDetailDoctor/CancelledAppointmentsDetailDoctor";
import { translationJson } from "common/locales/translationJson";

function appointmentId() {
  return <CancelledAppointmentsDetailDoctor />;
}

export default appointmentId;

// export function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       messages: translationJson(locale),
//     },
//   };
// }
