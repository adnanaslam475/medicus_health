import AgoraRTM, { RtmClient, RtmEvents } from "agora-rtm-sdk";
import EventEmitter from "events";

export default class Client extends EventEmitter {
  channels: any;
  _logined: boolean;
  client: RtmClient;
  accountName: string = "";

  constructor() {
    super();
    this.channels = {};
    this._logined = false;
    this.client = AgoraRTM.createInstance("df3bc65dd6df4f75b0b448b9cbba2bac");
    this.subscribeClientEvents();
  }

  // subscribe client events
  subscribeClientEvents() {
    const clientEvents: Array<keyof RtmEvents.RtmClientEvents> = [
      "ConnectionStateChanged",
      "MessageFromPeer",
    ];
    clientEvents.forEach((eventName: keyof RtmEvents.RtmClientEvents) => {
      this.client.on(eventName, (...args) => {
        console.log("emit ", eventName, ...args);
        // log event message
        this.emit(eventName, ...args);
      });
    });
  }

  // subscribe channel events
  subscribeChannelEvents(channelName: string) {
    const channelEvents = ["ChannelMessage", "MemberJoined", "MemberLeft"];
    channelEvents.forEach((eventName) => {
      this.channels[channelName].channel.on(eventName, (...args: any[]) => {
        console.log("emit ", eventName, args);
        this.emit(eventName, { channelName, args: args });
      });
    });
  }

  async login(accountName: string, token: string) {
    this.accountName = accountName;
    return this.client.login({ uid: this.accountName, token });
  }

  async logout() {
    return this.client.logout();
  }

  async joinChannel(name: string) {
    console.log("joinChannel", name);
    const channel = this.client.createChannel(name);
    this.channels[name] = {
      channel,
      joined: false, // channel state
    };
    this.subscribeChannelEvents(name);
    return channel.join();
  }

  async leaveChannel(name: string) {
    console.log("leaveChannel", name);
    if (
      !this.channels[name] ||
      (this.channels[name] && !this.channels[name].joined)
    )
      return;
    return this.channels[name].channel.leave();
  }

  async sendChannelMessage(text: string, channelName: string) {
    console.log(this.channels);
    if (!this.channels[channelName] || !this.channels[channelName].joined)
      return;
    return this.channels[channelName].channel.sendMessage({ text });
  }
}
