//@ts-nocheck
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "b66cac8ec4034745966e7568e0e06833";
const token =
  "006b66cac8ec4034745966e7568e0e06833IADGpRBu66YE3T1mpO02qqe6PTCrcoaKjwfR4mQw/OHNnrmKh/wAAAAAEACr2kwLpJp7YgEAAQCjmnti";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "aims";
