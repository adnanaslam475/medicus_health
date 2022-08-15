import {
  AudioMutedOutlined,
  AudioOutlined,
  VideoCameraFilled,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import { Button } from "antd";
import { route } from "next/dist/server/router";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useClient } from "./settings";
import { useRouter } from "next/router";

type Props = {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  onLeave: () => void;
};

function Controls(props: Props) {
  const Router = useRouter();
  const client = useClient();
  const { tracks } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: string) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    // Router.back();
    Router.push("/patient/appointments/upcoming");
  };

  useEffect(() => {
    return () => {
      leaveChannel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2">
      <div>
        <Button onClick={() => mute("audio")} size="small">
          {trackState.audio ? <AudioMutedOutlined /> : <AudioOutlined />}
        </Button>
      </div>
      <div>
        <Button
          size="small"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideoCameraOutlined /> : <VideoCameraFilled />}
        </Button>
      </div>
      <div>
        <Button size="small" color="default" onClick={() => leaveChannel()}>
          Leave
        </Button>
      </div>
    </div>
  );
}

export default Controls;
