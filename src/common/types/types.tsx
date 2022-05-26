import { Appointment, BookingDate, DueDate, InputMaybe, Scalars } from "generated/graphql";

export type Schedule = {
  day?: number;
  endTime: string;
  startTime: string;
  id?: string;
};

export type singleSchedule = {
  startTime: string;
  endTime: string;
  day?: number;
  id?: string;
};

export type staffFilterType = {
  serviceType?: string;
  accountCreationDate?: {
    startDate?: string;
    endDate?: string;
  };
};
export type physicianFilterType = {
  searchString?: string;
  appointmentType?: string;
  patientName?: string;
  bookingDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type cancelledAppointmentFilterType = {
  searchString?: string;
  appointmentType?: string;
  dueDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type DateType = {
  startDate: string;
  endDate: string;
};

export type physicianMyEarningsFilterType = {
  searchString?: string;
  serviceId?: number;
  earnings?: { initial: number; final: number };
  DateRange?: {
    startDate?: string;
    endDate?: string;
  };
};

export type cancelAppointmentFilterType = {
  patientName?: string;
  appointmentType?: string;
  bookingDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type ServiceTypes = {
  id?: number;
  name?: string;
  price: number;
};

export type adminUserFilterType = {
  searchUser?: string;
  status?: string;
  creationDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type patientAppointmentHistoryFilterType = {
  doctorId?: number;
  serviceId?: number;
  dueDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type PatientListFilterType = {
  searchField?: string;
  stateId?: number;
  countryId?: number;
};

export type CustomTimeSlot = {
  __typename?: 'AppointmentTimeSlots';
  appointment?: Appointment;
  endTime: Scalars['DateTime'];
  id: Scalars['Int'];
  selected: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
};
