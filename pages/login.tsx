import Login from "../src/modules/common/pages/auth/Login/Login";

function login() {
  return <Login />;
}

export default login;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: require(`./../src/common/locales/${locale}.json`),
    },
  };
}
