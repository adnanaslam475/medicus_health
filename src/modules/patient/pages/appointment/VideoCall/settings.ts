//@ts-nocheck
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "e7a8c2cd212b4d4f93eb20a2b97c66f1";
const token =
  "006e7a8c2cd212b4d4f93eb20a2b97c66f1IADExkzcfr4+1SNUIz4eq9u3GUV67bs8KCTD6gpH3NKrXrmKh/wAAAAAEACkuwVSZVNsYgEAAQBkU2xi";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "aims";
