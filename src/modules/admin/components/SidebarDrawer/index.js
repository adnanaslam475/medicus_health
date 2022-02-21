import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
// import { Logo } from "../../../../utils/images";
import SidebarMenuItem from "../../../../common/components/SidebarMenuItem";

function AdminSideMenu() {
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerHandler = () => {
    setShowDrawer(!showDrawer);
  };
  const onClose = () => {
    setShowDrawer(false);
  };

  return (
    <div className="inline-flex md:hidden lg:hidden xl:hidden">
      {showDrawer ? (
        <Button className="bg-none  shadow-none border-0" onClick={drawerHandler} icon={<CloseOutlined />} />
      ) : (
        <Button className="border-0 shadow-none" onClick={drawerHandler} icon={<MenuOutlined />} />
      )}

      <Drawer
        // title={<Image width={200} height={35} src={Logo} alt="" />}
        closable={false}
        width={300}
        visible={showDrawer}
        placement="left"
        onClose={onClose}
      >
        <SidebarMenuItem />
      </Drawer>
    </div>
  );
}

export default AdminSideMenu;
