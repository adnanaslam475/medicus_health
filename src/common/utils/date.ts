import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import { date } from "./index";
import { AppointmentTimeSlots } from "generated/graphql";
import { CustomTimeSlot } from "common/types/types";

dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(duration);
// dayjs.extend(timezone);
// dayjs.tz.setDefault("America/New_York");
// dayjs.tz.setDefault("asia/karachi");

export function convertToUTC(date: string) {
  return dayjs.utc(date).format();
}

export function convertStringDateToUTC(date: string) {
  return dayjs.utc(date).format("MM-DD-YYYY");
}
export function convertStringDateToUTCChatFormat(date: string) {
  return dayjs.utc(date).format("MM/DD/YY");
}

export function formatMMMMDDYYYY(date: string) {
  return dayjs.utc(date).format("MMMM, D, YYYY");
}

export const formatYYYYMMMMDD = (date: string) => {
  const getDateUseingDayjs = dayjs(date);
  return date && getDateUseingDayjs.isValid() ? getDateUseingDayjs.format("YYYY, MM, DD") : "-";
};

export function formatDAYMMDD(date: string) {
  return dayjs.utc(date).format("dddd, MMMM D ");
}

export function formatDAYMMDDYY(date: string) {
  return dayjs.utc(date).format("dddd, MMMM D, YYYY");
}

export function formathhmma(date: string) {
  return dayjs.utc(date).format("h:mma");
}

export function formatDate_n_Time(date: string) {
  return dayjs.utc(date).format("MMMM-YYYY-DD hh:mm:ss");
}

export const getDateInFormat = (
  getDate: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  const getDateUseingDayjs = dayjs(getDate);
  return getDate && getDateUseingDayjs.isValid()
    ? getDateUseingDayjs.format("MM-DD-YYYY")
    : "";
};

export function time24HrConvert(time: any) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  time =
    time.join("").charAt(0) === "0" ? time.join("").slice(1) : time.join("");
  return time; // return adjusted time or original string
}

// to get day name from date day
export function dayName(date: number) {
  return dayjs().day(date).format("dddd");
}

export function twelveHourTime(date: string) {
  return dayjs("1/1/1 " + date).format("h:mm a");
}

export function isAppoinentDateIsSame(date: string) {
  const today = dayjs(new Date());
  let isAppoinmetnStartTime = today.isAfter(date, "seconds");
  return isAppoinmetnStartTime;
}

export function formatMMMM_Dcoma_YYYY(date: string) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function getDayJsObject(date: string, format: string = "MMMM D, YYYY") {
  return dayjs(date, format);
}

export function isAppointmentTimeValid(
  selectedAppointment: AppointmentTimeSlots | CustomTimeSlot | undefined,
  state: boolean,
  callBack: (state: boolean) => void
) {
  if (
    date.formatMMMMDDYYYY(selectedAppointment?.startTime) ===
    dayjs().format("MMMM, D, YYYY")
    // dayjs(new Date().toLocaleDateString()).format("MMMM, D, YYYY")
  ) {
    var now = dayjs();
    const startDate = selectedAppointment?.startTime?.split("T")[0];

    const startTime = selectedAppointment?.startTime
      ?.split("T")[1]
      ?.replace("Z", "");

    const endTime = selectedAppointment?.endTime
      ?.split("T")[1]
      ?.replace("Z", "");

      const dateDifferenceStartDate = dayjs(`${startDate} ${startTime}`).diff(now)
      console.log('dateDifference', dateDifferenceStartDate)
      const dateDifferenceEndDate = dayjs(`${startDate} ${endTime}`).diff(now)
      const startEndDateTime = dayjs(`${startDate} ${endTime}`).unix();

    let difference =
      new Date(`${startDate} ${startTime}`).getTime() - Date.now();
  
    setTimeout(() => {
      if (startEndDateTime > now.unix()) {
        callBack(false);
        setTimeout(() => {
          if (!state) {
            callBack(true);
          }
        }, dateDifferenceEndDate);
      }
    }, dateDifferenceStartDate);
    console.log(difference, "diff");
  }
}

export function addHoursToDate(date: Date, hours: number): Date {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

// export function setTimeZone(timeZone: string) {
//   dayjs.tz.setDefault(timeZone);
// }
