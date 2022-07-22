import { translationJson } from "common/locales/translationJson";
import UpcomingAppointments from "../../../src/modules/admin/pages/appointments/UpcomingAppointment/UpcomingAppointments";

function upcomingAppointments() {
  return <UpcomingAppointments />;
}

export default upcomingAppointments;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
