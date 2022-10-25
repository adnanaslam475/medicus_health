import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
// import { Logo } from "../../../../utils/images";
import SidebarMenuItem from "../../../../common/components/SidebarMenuItem/SidebarMenuItem";
import _classes from "./SidebarDrawer.module.scss";
import { isChrome } from "utils/helper";

function AdminSideMenu() {
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerHandler = () => {
    setShowDrawer(!showDrawer);
  };
  const onClose = () => {
    setShowDrawer(false);
  };

  return (
    <div className="inline-flex">
      {showDrawer ? (
        <Button
          className={`${_classes["Header-SideDrawer"]} shadow-none ${isChrome && 'antCustomBtn'}`}
          onClick={drawerHandler} icon={<CloseOutlined />} />
      ) : (
        <Button
          className={`${_classes["Header-SideDrawer"]} shadow-none ${isChrome && 'antCustomBtn'}`}
          onClick={drawerHandler} icon={<MenuOutlined />} />
      )}

      <Drawer
        // title={<Image priority={true} unoptimized={true} width={200} height={35} src={Logo} alt="" />}
        closable={true}
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
