//@ts-nocheck
import {
  CloseCircleOutlined,
  VideoCameraFilled,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useClient } from "./settings";

type Props = {};

function Controls(props: Props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
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
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="flex gap-2">
      <div>
        <Button onClick={() => mute("audio")}>
          {trackState.audio ? <VideoCameraOutlined /> : <VideoCameraFilled />}
        </Button>
      </div>
      <div>
        <Button
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideoCameraOutlined /> : <VideoCameraFilled />}
        </Button>
      </div>
      <div>
        <Button color="default" onClick={() => leaveChannel()}>
          Leave
          <CloseCircleOutlined />
        </Button>
      </div>
    </div>
  );
}

export default Controls;
