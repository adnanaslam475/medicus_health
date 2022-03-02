import React from "react";
import AccountTabs from "../../../../../common/components/Account_Tabs";
import AppLayout from "../../../../../common/components/Layout";

function AccountDetail() {
  function onFinish(values: object) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <AppLayout>
      <div className="w-full py-5">
        <h2 className="mb-3">Account</h2>
        <div className="w-full">
          <AccountTabs />
        </div>
      </div>
    </AppLayout>
  );
}
export default AccountDetail;
