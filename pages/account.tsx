import React from "react";
import AppLayout from "../src/common/components/Layout";
import AccountTabs from "../src/common/components/Account_Tabs"


const Account = () => {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppLayout>
      <div className="w-full p-5">
        <h2 className="mb-3">Account</h2>
      <div className="w-full">
      <AccountTabs></AccountTabs>
      </div>
      

      </div>
    </AppLayout>
  );
};
export default Account;
