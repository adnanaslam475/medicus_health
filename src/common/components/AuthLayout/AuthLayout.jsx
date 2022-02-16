import React from "react";
import { Layout } from "antd";
import Container from "../Container";

function AuthLayout({ children }) {
  return (
    <Layout className="h-full loginImage bg-gray-200 min-h-px-610" style={{ justifyContent: "center", alignItems: "left" }}>
      <div className=" justify-end items-center flex">
        <Container>{children}</Container>
      </div>
    </Layout>
  );
}

export default AuthLayout;
