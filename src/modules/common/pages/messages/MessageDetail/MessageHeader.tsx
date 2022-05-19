import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import React from "react";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import ThreeDot from "./../../../../../../public/assets/images/threedot.svg";
import Inputicon from "../../../../../../public/assets/images/inputicon.svg";

import _classes from "./Message-detail.module.scss";

type Props = {};

function MessageHeader({}: Props) {
  return (
    <div className="flex gap-2 items-center border-b border-gray-4">
      <div className="flex gap-2 py-4 px-4 max-w-[340px] w-full border-r border-gray-4">
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined className={`{${_classes["search-color"]}`} />}
        />

        <Image
          alt=""
          src={Inputicon}
          width={54}
          height={44}
          className="border rounded border-gray-1 "
        />
      </div>
      <div className="flex gap-2 w-full px-4">
        <div className="flex items-center gap-2 flex-1">
          <Image alt="" width={39} height={39} src={profile} />
          <h4 className="pb-0 mb-0">Mark Manson</h4>
        </div>
        <Image alt="" width={20} height={30} src={ThreeDot} />
      </div>
    </div>
  );
}

export default MessageHeader;
