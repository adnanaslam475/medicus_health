import { translationJson } from "common/locales/translationJson";
import PhysicianCancelledAppointments from "../../../../src/modules/doctor/pages/physicians/Appointments/CancelledAppointment/CancelledAppointment";

function physicianCancelledAppointments() {
  return <PhysicianCancelledAppointments />;
}

export default physicianCancelledAppointments;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
