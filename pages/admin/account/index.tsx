import AdminAccountDetail from "../../../src/modules/admin/pages/accounts/AdminAccountDetail/AdminAccountDetail";

function account() {
  return <AdminAccountDetail />;
}

export default account;

// export function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       messages: require(`./../../src/common/locales/${locale}.json`),
//     },
//   };
// }
