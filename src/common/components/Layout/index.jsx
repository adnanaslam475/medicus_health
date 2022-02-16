import { Layout } from "antd";
import React from "react";
import AdminSideMenu from "../../../modules/admin/components/AdminSideMenu";
import AppHeader from "../AppHeader";
import Container from "../Container";

function AppLayout({ children }) {
  return (
    <Layout className="h-full">
      <AdminSideMenu />
      <Layout className="ml-0 md:ml-20 xl:ml-72">
        <AppHeader />
        <Layout.Content className="flex h-full" style={{ overflow: "auto" }}>
          <Container className="md:p-5 lg:p-6">
            {typeof children === "function" ? children?.() : <div className="bg-white min-h-full">{children}</div>}
          </Container>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
