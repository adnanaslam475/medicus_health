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

export type physicianMyEarningsFilterType = {
  searchString?: string;
  serviceId?: number;
  earnings?: { initial: number; final: number };
  DateRange?: {
    startDate?: string;
    endDate?: string;
  };
};
