import React, { createContext, useContext, useState } from "react";

type state = {
  data?: any;
  saveUserData?: (values: any) => void;
  clearUserData?: (values: any) => void;
};

const initialState: state = {};

const UserDataContext = createContext(initialState);

export function useUserData() {
  return useContext(UserDataContext);
}

export const UserDataConsumer = UserDataContext.Consumer;

export function UserDataProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [data, setData] = useState({});

  function saveUserData(values: any) {
    setData({ ...data, values });
  }

  function clearUserData() {
    setData({});
  }

  return (
    <UserDataContext.Provider
      value={{
        data,
        saveUserData,
        clearUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
