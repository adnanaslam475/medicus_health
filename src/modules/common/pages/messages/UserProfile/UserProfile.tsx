import { Avatar, notification } from "antd";
import { getUserData } from "common/utils/userData";
import { ChatChannels, useGenerateRtcTokenMutation } from "generated/graphql";
import Image from "next/image";
import React, { useRef } from "react";
import Client from "../MessageDetail/client";
import profile from "./../../../../../../public/assets/images/doc-pic.png";
import loaderLogo from "./../../../../../../public/assets/images/loaderLogo.png";

type Props = {
  thread: ChatChannels;
};
function UserProfile({ thread }: Props) {
  const rtmRef = useRef<Client>();
  const rtm = rtmRef.current;

  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
  const { user } = getUserData();

  async function onLogin() {
    const { data } = await executeGenerateRtcTokenMutation({
      generateRTCTokenInput: {
        channelName: thread.channelName,
        uId: String(user?.id),
        role: "audience",
        tokenType: "uid",
      },
    });
    const { rtmAccessToken } = data?.generateRTCToken || {};

    let rtm = rtmRef.current;

    if (!rtm) {
      rtm = new Client();
      rtmRef.current = rtm;
      try {
        await rtm.login(String(user?.id), rtmAccessToken || "");
        notification.success({
          message: "user logged in successfully",
        });

        await rtm?.joinChannel(thread.channelName);
        if (rtm) {
          rtm.channels[thread.channelName].joined = true;
        }
        console.log({ rtm });
        notification.success({
          message: "joined successfully",
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: "login failed",
        });
      }
      // try {
      //   await rtm?.joinChannel(thread.channelName);
      //   if (rtm) {
      //     rtm.channels[thread.channelName].joined = true;
      //   }
      //   notification.success({
      //     message: "joined successfully",
      //   });
      // } catch (error) {
      //   console.log(error);
      //   notification.error({
      //     message: "join failed",
      //   });
      // }
    }
  }

  async function onJoinChat() {
    onLogin();
  }

  return (
    <div
      onClick={onJoinChat}
      className={`flex px-5 py-4 items-center border border-gray-4 cursor-pointer hover:bg-gray-4`}
    >
      <div className="relative">
        <Image alt="" width={70} height={70} src={profile} />
        <span className="rounded-full absolute p-1 -right-2 bottom-0">
          <Image
            alt=""
            src={loaderLogo}
            width={20}
            height={20}
            className="border rounded border-gray-2"
            objectFit="contain"
          />
        </span>
      </div>
      <div className="w-full pl-3">
        <div className="flex justify-between">
          <span className="text-black text-base">Mark Manson</span>
          <span className="text-base text-gray">03:30 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray text-base block">
            You :what is the pro..
          </span>
          <span className="rounded-lg bg-red px-2 py-0 text-white">3</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
