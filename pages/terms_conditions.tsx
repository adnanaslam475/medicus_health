import TermsAndConditions from "common/components/TermsAndConditionns/TermsAndConditionns";
import { translationJson } from "common/locales/translationJson";
// import SuccessScreen from "../src/modules/common/pages/auth/SuccessScreen/SuccessScreen";

function termsConditions() {
  return <TermsAndConditions />;
}

export default termsConditions;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
