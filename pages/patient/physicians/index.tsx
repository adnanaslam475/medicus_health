import { translationJson } from "common/locales/translationJson";
import PhysicianList from "../../../src/modules/patient/pages/physicians/PhysicianList/PhysicianList";
function physicians() {
  return <PhysicianList />;
}

export default physicians;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
