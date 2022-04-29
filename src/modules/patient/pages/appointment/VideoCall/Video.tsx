//@ts-nocheck
import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useState } from "react";

type Props = {};

function Video(props: Props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <div className="h-full">
      <div className="h-full">
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div xs={gridSpacing}>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            );
          } else return null;
        })}
    </div>
  );
}

export default Video;
