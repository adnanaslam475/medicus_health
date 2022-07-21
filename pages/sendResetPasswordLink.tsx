import { translationJson } from "common/locales/translationJson";
import ResendLink from "modules/common/pages/auth/ResendPasswordLink/ResendLink";

function sendResetLink() {
  return <ResendLink />;
}

export default sendResetLink;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // messages: require(`./../src/common/locales/${locale}.json`),
      messages: translationJson(locale),
    },
  };
}
