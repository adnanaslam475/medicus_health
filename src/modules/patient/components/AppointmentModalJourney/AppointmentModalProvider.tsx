import React, { createContext, useContext, useState } from "react";

type state = {
  data?: any;
  saveStepOne?: (values: any) => void;
  saveStepTwo?: (values: any) => void;
  saveStepThree?: (values: any) => void;
};

const initialState: state = {};

const AppointmentModalContext = createContext(initialState);

export function useAppointmentModal() {
  return useContext(AppointmentModalContext);
}

// export const AppointmentModalConsumer = AppointmentModalContext.Consumer;

export function AppointmentModalProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [data, setData] = useState({});

  function saveStepOne(values: any) {
    setData({ ...data, stepOne: values });
  }
  function saveStepTwo(values: any) {
    setData({ ...data, stepTwo: values });
  }
  function saveStepThree(values: any) {
    setData({ ...data, stepThree: values });
  }

  return (
    <AppointmentModalContext.Provider
      value={{
        data,
        saveStepOne,
        saveStepTwo,
        saveStepThree,
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  );
}
