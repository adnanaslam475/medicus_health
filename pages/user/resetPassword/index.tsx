import { translationJson } from "common/locales/translationJson";
import ConfirmPassword from "../../../src/modules/common/pages/auth/ConfirmPassword/ConfirmPassword";

function resetPassword() {
  return <ConfirmPassword />;
}

export default resetPassword;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
