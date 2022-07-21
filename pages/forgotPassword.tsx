// import ForgotPassword from "../src/modules/common/pages/auth/ForgotPassword/ForgotPasswordForm";
import { translationJson } from "common/locales/translationJson";
import ForgotPassword from "../src/modules/common/pages/auth/ForgotPassword/ForgotPassword";

function forgotPassword() {
  return <ForgotPassword />;
}

export default forgotPassword;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // messages: require(`./../src/common/locales/${locale}.json`),
      messages: translationJson(locale),
    },
  };
}
