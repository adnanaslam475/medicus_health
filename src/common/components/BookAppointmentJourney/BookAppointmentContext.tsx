import React, { createContext, useContext, useEffect, useState } from "react";

type state = {
  data?: any;
  saveStepOne?: (values: any) => void;
  saveStepTwo?: (values: any) => void;
  saveStepThree?: (values: any) => void;
};

const initialState: state = {};

const BookAppointmentContext = createContext(initialState);

export function useBookAppointment() {
  return useContext(BookAppointmentContext);
}

export const BookAppointmentConsumer = BookAppointmentContext.Consumer;

export function BookAppointmentProvider({
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
    <BookAppointmentContext.Provider
      value={{
        data,
        saveStepOne,
        saveStepTwo,
        saveStepThree,
      }}
    >
      {children}
    </BookAppointmentContext.Provider>
  );
}
