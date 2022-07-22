import { translationJson } from "common/locales/translationJson";
import ConfirmPassword from "../src/modules/common/pages/auth/ConfirmPassword/ConfirmPassword";

function confirmPassword() {
  return <ConfirmPassword />;
}

export default confirmPassword;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
