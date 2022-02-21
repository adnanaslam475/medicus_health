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
    <AppLayout className="w-full">
      <div className="w-full py-0">
        <h1 className="mb-0">Account</h1>
      <AccountTabs></AccountTabs>

      </div>
    </AppLayout>
  );
};
export default Account;
