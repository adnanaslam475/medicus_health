import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeftOutlined, SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Image from "next/image";
import profile from "./../../../../../../public/assets/images/nullicon.png";
import ThreeDot from "./../../../../../../public/assets/images/threedot.svg";
import Inputicon from "../../../../../../public/assets/images/inputicon.svg";

import _classes from "./Message-detail.module.scss";
import { useMessageContext } from "./MessageContext";
import { getUserData } from "common/utils/userData";
import { messageUtils } from "common/utils";
import { ChatChannels, useDeleteChatChannelMutation } from "generated/graphql";
import MDNextImage from "common/components/MDNextImage/MDNextImage";
import ConfirmationModal from "common/components/ConfirmationModal/ConfirmationModal";
import _debounce from "lodash/debounce";
import { useDebounce } from "common/utils/helper";

type Props = {
  removeCurrentChat?: boolean | undefined;
  setRemoveCurrentChat?: any;
  onBackThread?: (
    showConversationList: boolean,
    showChatContent: boolean
  ) => void;
};

function MessageHeader({
  removeCurrentChat,
  setRemoveCurrentChat,
  onBackThread,
}: Props) {
  const { messageInfo, setChatSearch } = useMessageContext();
  const { user } = getUserData();
  const [{ fetching }, deleteChatChannelMutation] =
    useDeleteChatChannelMutation();

  const opposite = messageUtils.getOppositeParticipant(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );
  const profileImage = messageUtils.getOppositeParticipantProfileImage(
    messageInfo.currentChannel as ChatChannels,
    user?.role as string
  );
  const [open, setOpen] = React.useState<string>("");

  const [searchValue, setSearchValue] = useState("");
  const debounceInput = useDebounce(searchValue, 500);
  useEffect(() => {
    setChatSearch(debounceInput);
  }, [debounceInput]);

  const deleteChatChannelHandler = async () => {
    try {
      await deleteChatChannelMutation({
        id: Number(messageInfo.currentChannel?.id),
      });
      setOpen("");
      setRemoveCurrentChat(true);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong",
      });
    }
  };

  const modalHandler = (id: string) => setOpen(id);
  const isShowHeaderInfo = !!messageInfo.currentChannel?.channelName;
  const firstName = opposite?.role !== "Doctor" ? opposite?.first_name : "";

  const lastName =
    opposite?.role !== "Doctor"
      ? opposite?.last_name
      : opposite?.role === "Doctor" && opposite?.last_name?.includes("Dr.")
      ? opposite?.last_name
      : `Dr. ${opposite?.last_name}`;
  return (
    <>
      <ConfirmationModal
        visible={!!open}
        confirmLoading={fetching}
        onCancel={() => modalHandler("")}
        onOk={deleteChatChannelHandler}
        message="Are you sure you want to delete this channel?"
      />
      <div className="flex justify-between">
        <h2 className="mb-0 pl-4 pt-3">Messages</h2>
        <div className="md:hidden">
          <Button
            icon={<ArrowLeftOutlined />}
            className="default"
            type="link"
            onClick={() => {
              onBackThread?.(true, false);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col py-2 md:flex-row md:py-0 gap-2 items-center border-b border-gray-4">
        <div className="flex gap-2 py-2 px-4 md:max-w-[340px] w-full border-r border-gray-4">
          <Input
            size="large"
            placeholder="Search"
            prefix={
              <SearchOutlined className={`{${_classes["search-color"]}`} />
            }
            onChange={(e) => setSearchValue(e.target.value)}
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
        {isShowHeaderInfo && !removeCurrentChat && (
          <div className="flex gap-2 w-full px-4 chatremove">
            <div className="flex items-center gap-2 flex-1">
              <MDNextImage
                alt=""
                width={39}
                height={39}
                className="rounded-full"
                src={profileImage || ""}
                fallbackImage={profile}
              />
              {/* <h4 className="pb-0 mb-0">{opposite?.last_name.includes("Dr.") ? opposite?.last_name :`Dr. ${opposite?.last_name}`}</h4> */}
              <p className="pb-0 mb-0 text-xs sm:text-base font-medium">{`${firstName} ${lastName}`}</p>
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
