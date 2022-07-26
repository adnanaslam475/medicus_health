import { translationJson } from "common/locales/translationJson";
import SetPassword from "../../../../src/modules/common/pages/auth/SetPassword/SetPassword";

function setPassword() {
  return <SetPassword />;
}

export default setPassword;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
