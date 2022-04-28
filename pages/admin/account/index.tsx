import AdminAccount from "../../../src/modules/admin/components/AdminAccount/AdminAccount";

function account() {
  return <AdminAccount />;
}

export default account;

// export function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       messages: require(`./../../src/common/locales/${locale}.json`),
//     },
//   };
// }
