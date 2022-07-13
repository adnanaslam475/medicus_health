import { useTranslations } from "next-intl";
import React from "react";
import AccountTabs from "../../../../../common/components/AccountTabs/AccountTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

function AccountDetail() {
    const t = useTranslations("AccountDetail");
    return (
        <AppLayout>
            <div className="w-full">
                <h2 className="mb-4">{t("title")}</h2>
                <div className="w-full">
                    <AccountTabs />
                </div>
            </div>
        </AppLayout>
    );
}
export default AccountDetail;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: require(`./../src/common/locales/${locale}.json`),
    },
  };
}
