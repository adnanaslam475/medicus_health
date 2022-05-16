import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const appId = "df3bc65dd6df4f75b0b448b9cbba2bac";
const token =
  "006df3bc65dd6df4f75b0b448b9cbba2bacIAC6T7WoMYOyKnd8qUvBQV7zN3CN+ROFlFv0kkVuLCeoNbmKh/zSY0iIEABmFdRiTWJ/YgEAAQDdHn5i";

export const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
  //@ts-ignore
  appId: appId,
  token: token,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "aims";
