import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import React from "react";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import ThreeDot from "./../../../../../../public/assets/images/threedot.svg";
import Inputicon from "../../../../../../public/assets/images/inputicon.svg";

import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import { messageUtils } from "common/utils";
import { ChatChannels } from "generated/graphql";
import MDNextImage from "common/components/MDNextImage/MDNextImage";

type Props = {};

function MessageHeader({}: Props) {
  const { messageInfo } = useMessageContext();
  const { user } = getUserData();
  const opposite = messageUtils.getOppositeParticipant(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );
  const profileImage = messageUtils.getOppositeParticipantProfileImage(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );

  const isShowHeaderInfo = !!messageInfo.currentChannel?.channelName;

  return (
    <div className="flex gap-2 items-center border-b border-gray-4">
      <div className="flex gap-2 py-4 px-4 max-w-[340px] w-full border-r border-gray-4">
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
      {isShowHeaderInfo && (
        <div className="flex gap-2 w-full px-4">
          <div className="flex items-center gap-2 flex-1">
            <MDNextImage
              alt=""
              width={39}
              height={39}
              className="rounded-full"
              src={profileImage || ""}
              fallbackImage={profile}
            />
            <h4 className="pb-0 mb-0">{`${opposite?.first_name} ${opposite?.last_name}`}</h4>
          </div>
          {/* <Image priority={true} alt="" width={20} height={30} src={ThreeDot} /> */}
        </div>
      )}
    </div>
  );
}

export default MessageHeader;
