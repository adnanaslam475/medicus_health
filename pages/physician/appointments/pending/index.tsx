import { translationJson } from "common/locales/translationJson";
import RequestedAppointment from "../../../../src/modules/doctor/pages/physicians/Appointments/RequestedAppointment/RequestedAppointment";

function requestedAppointments() {
  return <RequestedAppointment />;
}

export default requestedAppointments;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
