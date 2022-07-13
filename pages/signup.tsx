import Signup from "../src/modules/common/pages/auth/Signup/Signup";

function signup() {
  return <Signup />;
}

export default signup;
export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: require(`./../src/common/locales/${locale}.json`),
    },
  };
}
