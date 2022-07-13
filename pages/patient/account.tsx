import AccountDetail from "../../src/modules/admin/pages/accounts/AccountDetail/AccountDetail";

function account() {
  return <AccountDetail />;
}

export default account;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: require(`./../src/common/locales/${locale}.json`),
    },
  };
}
