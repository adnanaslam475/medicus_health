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
  patientName?: string;
  appointmentType?: string;
  bookingDate?: {
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
