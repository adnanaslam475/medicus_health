import {
  Appointment,
  BookingDate,
  DueDate,
  InputMaybe,
  Scalars,
  Maybe,
} from "generated/graphql";

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
  serviceId?: number;
  patientName?: string;
  bookingDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type cancelledAppointmentFilterType = {
  searchString?: string;
  serviceId?: number;
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
  serviceId?: number;
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

export type AdminAppointmentHistoryDetailType = {
  id: number | undefined;
  bookingDate: any;
  patient: Maybe<string> | undefined;
  physician: string;
  service: string;
  dueDate: string;
  time: string;
  totalAmount: number | undefined;
  appointmentStatus: Maybe<string> | undefined;
  paymentStatus: string;
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
  __typename?: "AppointmentTimeSlots";
  appointment?: Appointment;
  endTime: Scalars["DateTime"];
  id: Scalars["Int"];
  selected: Scalars["Boolean"];
  startTime: Scalars["DateTime"];
};

export type StatusName =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "SUCCEEDED"
  | "CONFIRMED"
  | "REQUESTED"
  | "SUGGESTED"
  | "CANCELLED";