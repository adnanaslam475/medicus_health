import { BookingDate, DueDate, InputMaybe, Scalars } from "generated/graphql";

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

export type physicianFilterType = {
  searchString?: string;
  appointmentType?: string;
  bookingDate?: {
    startDate?: string;
    endDate?: string;
  };
};

export type PhysicianAppointmentInputFilter = {
  appointmentId?: InputMaybe<Scalars["Int"]>;
  bookingDate?: InputMaybe<BookingDate>;
  doctorId?: InputMaybe<Scalars["Int"]>;
  dueDate?: InputMaybe<DueDate>;
  patientId?: InputMaybe<Scalars["Int"]>;
  physicianName?: InputMaybe<Scalars["String"]>;
  searchPatient?: InputMaybe<Scalars["String"]>;
  serviceId?: InputMaybe<Scalars["Int"]>;
  status?: InputMaybe<Scalars["String"]>;
  paymentStatus?: string;
};

export type DateType = {
  startDate: string;
  endDate: string;
};
