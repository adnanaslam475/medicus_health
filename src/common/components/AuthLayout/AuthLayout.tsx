import React from "react";
import { Layout } from "antd";
import Container from "../Container/Container";

type props = {
  children: React.ReactChild;
};
function AuthLayout({ children }: props) {
  return (
    <Container className="login-bg w-full">
      <div className="flex items-center justify-center min-h-screen w-h-100 py-16">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2 px-0">
          {children}
        </div>
      </div>
    </Container>
  );
}

export default AuthLayout;
