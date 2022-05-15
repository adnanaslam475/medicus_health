//@ts-nocheck
import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import Video from "./Video";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings";

// scss
import _classes from "./VideoCall.module.scss";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
  useGenerateRtcTokenMutation,
  useGetAppointmentByIdQuery,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { useRouter } from "next/router";

function VideoCall() {
  const { query } = useRouter();
  const [inCall, setInCall] = useState(true);
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [, executeGenerateRtcTokenMutation] = useGenerateRtcTokenMutation();
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: {
      id: Number(query?.id),
    },
    pause: !Number(query?.id),
  });
  const { appointment } = data || {};
  const { user } = getUserData();

  useEffect(() => {
    let init = async (channelName) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      const { data } = await executeGenerateRtcTokenMutation({
        generateRTCTokenInput: {
          channelName,
          uId: String(user?.id),
          role: "audience",
          tokenType: "uid",
        },
      });
      const { rtmAccessToken, channelName } = data?.generateRTCToken || {};
      try {
        await client.join(
          config.appId,
          channelName,
          rtmAccessToken,
          String(user?.id)
        );
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (ready && tracks) {
      if (appointment?.id) {
        const channelName = `${appointment?.id}_${appointment?.patientId}_${appointment?.doctorId}`;
        try {
          init(channelName);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [channelName, client, ready, tracks, appointment]);

  return (
    <div className={`flex flex-col relative ${_classes["video-call"]}`}>
      {inCall ? (
        <>
          <div className="absolute bottom-0 w-full flex items-center justify-center z-10 p-4">
            {ready && tracks && (
              <Controls
                tracks={tracks}
                setStart={setStart}
                setInCall={setInCall}
              />
            )}
          </div>
          <>{start && tracks && <Video tracks={tracks} users={users} />}</>
        </>
      ) : (
        <Result icon={<SmileOutlined />} title="Your Call has ended" />
      )}
    </div>
  );
}

export default VideoCall;
