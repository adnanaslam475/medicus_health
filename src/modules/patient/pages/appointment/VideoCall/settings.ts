//@ts-nocheck
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "b66cac8ec4034745966e7568e0e06833";
const token =
  "006b66cac8ec4034745966e7568e0e06833IAA9YCVOstPiZ+Vhn7QiG0z3jgukUW2OH5d7/wTvRZpeRLmKh/wAAAAAEACr2kwL70V6YgEAAQDuRXpi";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "aims";
