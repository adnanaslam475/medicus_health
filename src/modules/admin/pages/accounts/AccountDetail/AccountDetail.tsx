import { useTranslations } from "next-intl";
import React from "react";
import AccountTabs from "../../../../../common/components/AccountTabs/AccountTabs";
import PaymentMethods from "../../../../../common/components/AccountTabs/PaymentMethods/PaymentMethods";
import TransactionHistory from "../../../../../common/components/AccountTabs/TransactionHistory/TransactionHistory";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import { QuestionnaireForm } from "../../../../../common/components/Questionnary/Questionnary";
import PersonalInfo from "../../../../common/pages/auth/Signup/components/PersonalInfo/PersonalInfo";

function AccountDetail() {
    const t = useTranslations("AccountDetail");
    return (
        <AppLayout>
            <div className="w-full">
                <h2 className="mb-4">{t("title")}</h2>
                <div className="w-full">
                    <AccountTabs  />
                </div>
            </div>
        </AppLayout>
    );
}
export default AccountDetail;
