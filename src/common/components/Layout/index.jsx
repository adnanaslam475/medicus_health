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
        <AppHeader />
        <Layout.Content className="flex w-full" style={{ overflow: "auto" }}>
          <Container fluid className="md:px-5 lg:px-6 w-full ">
            {typeof children === "function" ? children?.() : <div className="bg-white min-h-full">{children}</div>}
          </Container>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
