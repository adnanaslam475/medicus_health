//@ts-nocheck
import { AgoraVideoPlayer } from "agora-rtc-react";
import React from "react";

// scss
import _classes from "./VideoCall.module.scss";

type Props = {};

function Video(props: Props) {
  const { users, tracks } = props;
  const isShowParticipant = users.length > 0;
  const participant = users?.[0];
  console.log(participant);
  return (
    <>
      <div className=" absolute right-4 top-4 z-10">
        <AgoraVideoPlayer videoTrack={tracks[1]} className="flex-1 h-[300px] w-[400px]" />
      </div>
      {isShowParticipant && (
        <>
          {participant.videoTrack && (
            <div className={`${_classes["participant-video"]} flex-1 flex`}>
              <AgoraVideoPlayer
                videoTrack={participant.videoTrack}
                key={participant.uid}
                className="flex-1"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Video;
