import React from "react";
import dynamic from "next/dynamic";

const VideoCall = dynamic(
  () => import("modules/admin/pages/appointment/VideoCall/VideoCall"),
  { ssr: false }
);

type Props = {};

function call({}: Props) {
  return <VideoCall />;
}

export default call;
