import { translationJson } from "common/locales/translationJson";
import RequestedAppointment from "../../../src/modules/admin/pages/appointments/RequestedAppointment/RequestedAppointment";

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
