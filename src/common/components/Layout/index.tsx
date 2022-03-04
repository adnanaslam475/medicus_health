import { Layout } from "antd";
import React from "react";
import AdminSideMenu from "../../../modules/admin/components/AdminSideMenu";

import AppHeader from "../AppHeader";
import Container from "../Container/Container";

function AppLayout({ children }) {

  console.log(children)
  return (
    <Layout className="h-full">
      <AdminSideMenu />
      <Layout className="ml-0 md:ml-20 xl:ml-72">
        <div className="border-b border-gray-5">
        <AppHeader />
        </div>
        <Layout.Content className="flex w-full" style={{ overflow: "auto" }}>
          <Container fluid className="md:px-2 lg:px-3 w-full bg-white">
            {typeof children === "function" ? children?.() : <div className="bg-white min-h-full">{children}</div>}
          </Container>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
