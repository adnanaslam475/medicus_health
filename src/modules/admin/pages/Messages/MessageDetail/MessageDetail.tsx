import { Alert, Button, Divider, Input, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AppLayout from "../../../../../common/components/AppLayout/AppLayout";
import Client from "./client";

function MessageDetail() {
  const [myId, setMyId] = useState("");
  const [fId, setFId] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const messageHistoryRef = useRef<any>([]);

  const rtmRef = useRef<Client>();

  const rtm = rtmRef.current;

  async function onSubmit() {
    try {
      await rtm?.sendChannelMessage(message, "yasir_test");
      setMessageHistory([
        ...messageHistoryRef.current,
        {
          name: myId as string,
          text: message as string,
          type: "text",
        },
      ]);
    } catch (error: any) {
      notification.error({ message: error?.message });
    }
  }

  async function login() {
    let yasirToken =
      "006e7a8c2cd212b4d4f93eb20a2b97c66f1IAAFcXjLiSrM4JtvHY736Cl28poXrfjt8lElC2PEru0VFzLz+e0AAAAAEAB1KdkmwiBhYgEAAQDBIGFi";
    let aliToken =
      "006e7a8c2cd212b4d4f93eb20a2b97c66f1IAAC4rfnQHaN/Sr2mJgz871SViGXfxNrNz5xbL44mylGulKFcksAAAAAEAB1Kdkm8SBhYgEAAQDxIGFi";

    let majidToken =
      "006e7a8c2cd212b4d4f93eb20a2b97c66f1IAD/N31Eb+m5tfOezt8KfIMHVR0uNZN/YJAcxX4nan4z5t7vup8AAAAAEACRu1OVtI9hYgEAAQCzj2Fi";
    let token = "";
    if (myId === "yasir") {
      token = yasirToken;
    }
    if (myId === "ali") {
      token = aliToken;
    }
    if (myId === "majid") {
      token = majidToken;
    }
    let rtm = rtmRef.current;
    if (!rtm) {
      rtm = new Client();
      rtmRef.current = rtm;
      try {
        await rtm.login(myId, token);
        notification.success({
          message: "user logged in successfully",
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: "login failed",
        });
      }
    }
    rtm.on("MemberLeft", ({ channelName, args }) => {
      const memberId = args[0];
      setMessageHistory([
        ...messageHistoryRef.current,
        {
          text: `${memberId} left the channel`,
          type: "member",
        },
      ]);
    });

    rtm.on("MemberJoined", ({ channelName, args }) => {
      const memberId = args[0];
      setMessageHistory([
        ...messageHistoryRef.current,
        {
          text: `${memberId} joined the channel`,
          type: "member",
        },
      ]);
    });
    rtm.on("ChannelMessage", async ({ channelName, args }) => {
      const [message, memberId] = args;
      setMessageHistory([
        ...messageHistoryRef.current,
        {
          name: memberId as string,
          text: message.text as string,
          type: "text",
        },
      ]);
    });
  }

  async function onJoin() {
    try {
      await rtm?.joinChannel("yasir_test");
      if (rtm) {
        rtm.channels.yasir_test.joined = true;
      }
      notification.success({
        message: "joined successfully",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "join failed",
      });
    }
  }
  messageHistoryRef.current = [...messageHistory];

  return (
    <AppLayout>
      <div className="w-full">
        <h2 className="mb-4">Messages</h2>
        <div className="w-full">
          <div className="flex">
            <div className="flex-1">
              {messageHistory?.map((value: any) => {
                if (value?.type === "text") {
                  return <div>{`${value?.name}: ${value?.text}`}</div>;
                } else {
                  return <Alert type="warning" message={value?.text} />;
                }
              })}
            </div>
            <div className="flex-1">
              <p>My Id</p>
              <div className="flex gap-4">
                <Input onChange={(e) => setMyId(e.target.value)} value={myId} />
                <Button onClick={login}>Login</Button>
                <Button onClick={onJoin}>Join Channel</Button>
              </div>
              <Divider />
              {/* <p>Friend ID</p>
              <Input onChange={(e) => setFId(e.target.value)} value={fId} />
              <Divider /> */}
              <Input.TextArea
                placeholder="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Divider />
              <Button onClick={onSubmit}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default MessageDetail;

{
  /* <p>My Id</p>
            <Input onChange={(e) => setMyId(e.target.value)} value={myId} />
            <Divider />
            <p>Friend ID</p>
            <Input onChange={(e) => setFId(e.target.value)} value={fId} />
            <Divider />
            <Input.TextArea
              placeholder="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Divider />
            <Button onClick={onSubmit}>Send</Button> */
}
