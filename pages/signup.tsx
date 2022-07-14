import { translationJson } from "common/locales/translationJson";
import Signup from "../src/modules/common/pages/auth/Signup/Signup";

function signup() {
  return <Signup />;
}

export default signup;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // messages: require(`./../src/common/locales/${locale}.json`),
      messages: translationJson(locale),
    },
  };
}
