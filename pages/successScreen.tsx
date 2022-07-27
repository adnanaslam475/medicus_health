import { translationJson } from "common/locales/translationJson";
import SuccessScreen from "../src/modules/common/pages/auth/SuccessScreen/SuccessScreen";

function successScreen() {
  return <SuccessScreen />;
}

export default successScreen;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
