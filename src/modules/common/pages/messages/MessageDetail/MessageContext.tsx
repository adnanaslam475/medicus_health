import { ChatChannels, useGetAllChatChannelsQuery } from "generated/graphql";
import React, { createContext, useContext, useEffect, useState } from "react";

type state = {
  getAllChatChannels?: ChatChannels[];
};

const initialState: state = {};

const MessageContext = createContext(initialState);

export function useMessageContext() {
  return useContext(MessageContext);
}

export const MessageConsumer = MessageContext.Consumer;

export function MessageContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [{ data }] = useGetAllChatChannelsQuery();
  const { getAllChatChannels } = data || {};

  return (
    <MessageContext.Provider
      value={{
        getAllChatChannels,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
