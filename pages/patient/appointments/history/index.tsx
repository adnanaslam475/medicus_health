import { translationJson } from "common/locales/translationJson";
import HistoryAppointments from "../../../../src/modules/admin/pages/appointments/HistoryAppointments/HistoryAppointments";

function index() {
  return <HistoryAppointments />;
}
export default index;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
