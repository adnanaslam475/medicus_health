import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import commonConfig from "./../../../../../../config";

// const appId = "df3bc65dd6df4f75b0b448b9cbba2bac";
const appId = commonConfig.agoraAppId;
const token =
  "006df3bc65dd6df4f75b0b448b9cbba2bacIAC6T7WoMYOyKnd8qUvBQV7zN3CN+ROFlFv0kkVuLCeoNbmKh/zSY0iIEABmFdRiTWJ/YgEAAQDdHn5i";

export const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
  //@ts-ignore
  appId: appId,
  // token:
  //   "006df3bc65dd6df4f75b0b448b9cbba2bacIADKHFgdWuGAX/2IYB8aX/yraerihVdiHFsvJ7p0rHToU+6DyJEM+nziEACpiq08ePWIYgEAAQAIsodi",
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
// export const channelName = "aims";
