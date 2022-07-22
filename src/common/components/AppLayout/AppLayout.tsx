import { Layout, Affix, Divider } from "antd";
import { getUserData } from "common/utils/userData";
import React from "react";
import AdminSideMenu from "../../../modules/admin/components/AdminSideMenu/AdminSideMenu";
import AppHeader from "../AppHeader/AppHeader";
import Container from "../Container/Container";

type props = {
  children: React.ReactChild | React.ReactChild[] | (() => React.ReactChild);
  isShowBanner?: boolean | undefined;
};

function AppLayout({ children, isShowBanner }: props) {
  return (
    <Layout className="h-full">
      <AdminSideMenu />
      <Layout className="ml-0 md:ml-0 lg:ml-72 xl:ml-62 2xl:ml-58">
        <Affix>
          <AppHeader isShowBanner={isShowBanner} />
        </Affix>
        <Layout.Content className="flex w-full" style={{ overflow: "auto" }}>
          <Container fluid className="md:px-2 lg:px-3 w-full bg-white">
            {typeof children === "function" ? (
              children?.()
            ) : (
              <div className="bg-white min-h-full">{children}</div>
            )}
          </Container>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
