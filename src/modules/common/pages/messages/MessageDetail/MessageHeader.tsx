import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import Image from "next/image";
import profile from "./../../../../../../public/assets/images/nullicon.png";
import ThreeDot from "./../../../../../../public/assets/images/threedot.svg";
import Inputicon from "../../../../../../public/assets/images/inputicon.svg";

import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import { messageUtils } from "common/utils";
import {
  ChatChannels,
  // useDeleteChatChannelMutation
} from "generated/graphql";
import MDNextImage from "common/components/MDNextImage/MDNextImage";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";

type Props = {
  setRemoveCurrentChatHeader?: any;
  removeCurrentChatHeader?: boolean | undefined;
};

function MessageHeader({
  removeCurrentChatHeader,
  setRemoveCurrentChatHeader,
}: Props) {
  const { messageInfo } = useMessageContext();
  const { user } = getUserData();
  // const [{ fetching }, deleteChatChannelMutation] =
  //   useDeleteChatChannelMutation();

  const opposite = messageUtils.getOppositeParticipant(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );
  const profileImage = messageUtils.getOppositeParticipantProfileImage(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );
  const [open, setOpen] = React.useState<string>("");

  // const deleteChatChannelHandler = async () => {
  //   try {
  //     await deleteChatChannelMutation({
  //       id: Number(messageInfo.currentChannel?.id),
  //     });
  //     setOpen("");
  //     setRemoveCurrentChatHeader(true);
  //   } catch (error: any) {
  //     notification.error({
  //       message: error?.message || "Something went wrong",
  //     });
  //   }
  // };

  useEffect(() => {
    if (removeCurrentChatHeader) {
      document.getElementsByClassName("chatremove")[0].remove();
    }
  }, [removeCurrentChatHeader]);

  const modalHandler = (id: string) => setOpen(id);
  const isShowHeaderInfo = !!messageInfo.currentChannel?.channelName; // not working
  return (
    <>
      {/* <ConfirmationModal
        visible={!!open}
        confirmLoading={fetching}
        onCancel={() => modalHandler("")}
        onOk={deleteChatChannelHandler}
        message="Are you sure you want ot delete this Channel?"
      /> */}
      <div className="flex gap-2 items-center border-b border-gray-4">
        <div className="flex gap-2 py-4 px-4 max-w-[340px] w-full border-r border-gray-4">
          <Input
            size="large"
            placeholder="Search"
            prefix={
              <SearchOutlined className={`{${_classes["search-color"]}`} />
            }
          />

          {/* <Image
          priority={true}
          alt=""
          src={Inputicon}
          width={54}
          height={44}
          className="border rounded border-gray-1 "
        /> */}
        </div>
        {isShowHeaderInfo && (
          <div className="flex gap-2 w-full sm:px-4 chatremove">
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
            <Image
              priority={true}
              alt=""
              className="cursor-pointer"
              onClick={() =>
                modalHandler(String(messageInfo.currentChannel?.id))
              }
              width={20}
              height={30}
              src={ThreeDot}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default MessageHeader;
