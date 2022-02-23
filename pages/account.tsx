import React from "react";
import Link from "next/link";
import { Form, Button, } from "antd";
import Container from "../src/common/components/Container/Container";
import Image from "next/image";
// import  AuthLayout from "../src/common/components/AuthLayout/AuthLayout";
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
      <div className="w-3/4">
      <AccountTabs></AccountTabs>
      </div>
      

      </div>
    </AppLayout>
  );
};
export default Account;
