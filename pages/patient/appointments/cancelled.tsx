import { translationJson } from "common/locales/translationJson";
import PatientCancelledAppointments from "../../../src/modules/admin/pages/appointments/CancelledAppointment/CancelledAppointment";

function patientCancelledAppointment() {
  return <PatientCancelledAppointments />;
}

export default patientCancelledAppointment;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
