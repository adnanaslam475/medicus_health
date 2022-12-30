import { Input } from "antd";
import React from "react";
import Inputicon from "../../../../../../public/assets/images/inputicon.svg";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import _classes from "./ProfileBar.module.scss";

function ProfileBar() {
  return (
    <>
      <div className="flex p-4 gap-2">
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined className={`{${_classes["search-color"]}`} />}
        />

        <Image
          priority={true}
          alt=""
          src={Inputicon}
          width={54}
          height={44}
          className="border rounded border-gray-1 "
        />
      </div>
      {/* <UserProfile bgcolor="bg-gray-4" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" />
      <UserProfile bgcolor="bg-white" /> */}
    </>
  );
}

export default ProfileBar;
