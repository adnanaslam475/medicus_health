import React from "react";
import AccountTabs from "../../../../../common/components/AccountTabs/AccountTabs";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";

function AccountDetail() {
  function onFinish(values: object) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">Account</h2>
        <div className="w-full">
          <AccountTabs />
        </div>
      </div>
    </AppLayout>
  );
}
export default AccountDetail;
