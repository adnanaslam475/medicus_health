import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import { date } from "./index";
import { AppointmentTimeSlots, CustomTimeSlot } from "common/types/types";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault("America/New_York");

export function convertToUTC(date: string) {
  return dayjs.utc(date).format();
}

export function convertStringDateToUTC(date: string) {
  return dayjs.utc(date).format("MM-DD-YYYY");
}
export function convertStringDateToUTCChatFormat(date: string) {
  return dayjs.utc(date).format("MM/DD/YY");
}

export function formatMMMMDDYYYY(date: string, timezone?: string) {
  return timezone
    ? dayjs(date).utc().tz(timezone).format("MMMM, D, YYYY")
    : dayjs(date).utc().format("MMMM, D, YYYY");
}

export const formatYYYYMMMMDD = (date: string) => {
  const getDateUseingDayjs = dayjs(date);
  return date && getDateUseingDayjs.isValid()
    ? getDateUseingDayjs.format("YYYY, MM, DD")
    : "-";
};

export const formatMMDDYYYY = (date: string) => {
  const getDateUseingDayjs = dayjs(date);
  return date && getDateUseingDayjs.isValid()
    ? getDateUseingDayjs.format("MM-DD-YYYY")
    : "-";
};

export function formatDAYMMDD(date: string, timezone?: string) {
  return timezone
    ? dayjs(date).utc().tz(timezone).format("dddd, MMMM D ")
    : dayjs(date).format("dddd, MMMM D ");
}

export function formatDAYMMDDYY(date: string, timezone?: string) {
  return timezone
    ? dayjs(date).utc().tz(timezone).format("dddd, MMMM D, YYYY")
    : dayjs(date).format("dddd, MMMM D, YYYY");
}

export function formatDAYMMDDYYUTC(date: string) {
  return dayjs.utc(date).format("dddd, MMMM D, YYYY");
}

export function formathhmma(date: string, timezone?: string) {
  return timezone
    ? dayjs(date).utc().tz(timezone).format("h:mm A")
    : dayjs(date).utc().format("h:mm A");
}

export function formatDate_n_Time(date: string) {
  return dayjs.utc(date).format("MMMM-YYYY-DD h:mm:ss");
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

export function time12HrConvert(time: any) {
  return dayjs(`${dayjs().format("MM/DD/YYYY")} ${time}`).format("H:mm");
}

export function UTCPrettierTime(time: any, date?: any) {
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/New_York";

  const convertedTime = time12HrConvert(time);
  const [hours, minute] = convertedTime.split(":");
  const formatedTime = dayjs
    .tz(date ? dayjs(date) : dayjs(), timeZone)
    .set("hours", +hours)
    .set("minute", +minute)
    .toISOString();

  return date ? formatedTime : formatedTime?.split("T")[1]?.slice(0, 5);
}

export function UTCPrettierDateTime(date: any) {
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/New_York";

  const formatedTime = dayjs(date).tz(timeZone, true).toISOString();

  return date ? formatedTime : formatedTime?.split("T")[1]?.slice(0, 5);
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
  callBack: (state: boolean) => void,
  timezone?: string
) {
  if (
    date.formatMMMMDDYYYY(selectedAppointment?.startTime, timezone) ===
    dayjs().tz(timezone).format("MMMM, D, YYYY")
    // dayjs(new Date().toLocaleDateString()).format("MMMM, D, YYYY")
  ) {
    var now = dayjs().tz(timezone);
    // const startDate = date.formatMMMMDDYYYY(
    //   selectedAppointment?.startTime,
    //   timezone
    // );

    // const startTime = date.formathhmma(
    //   selectedAppointment?.startTime,
    //   timezone
    // );

    // const endTime = date.formathhmma(selectedAppointment?.endTime, timezone);

    const dateDifferenceStartDate = dayjs(selectedAppointment?.startTime)
      .tz(timezone)
      .diff(now, "milliseconds");
    const dateDifferenceEndDate = dayjs(selectedAppointment?.endTime)
      .tz(timezone)
      .diff(now);
    const startEndDateTime = dayjs(selectedAppointment?.endTime).tz(timezone);

    // let difference =
    //   new Date(`${startDate} ${startTime}`).getTime() - Date.now();
    setTimeout(() => {
      if (startEndDateTime.unix() > now.unix()) {
        callBack(false);
        setTimeout(() => {
          if (!state) {
            callBack(true);
          }
        }, dateDifferenceEndDate);
      }
    }, Number(dateDifferenceStartDate - 300000));
  }
}

export function addHoursToDate(date: Date, hours: number): Date {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

export function getDateAndTimeWRTTZ(
  date: string,
  format: string = "MMMM D, YYYY hh:mm:ss"
) {
  return date ? dayjs.utc(date).tz().format(format) : "";
}

export function setTimeZone(timeZone: string) {
  dayjs.tz.setDefault(timeZone);
}

export function getCurrentUserTimeZone() {
  const timeZone =
    typeof window !== "undefined" &&
    localStorage?.getItem("timeZone") !== "undefined" &&
    localStorage?.getItem("timeZone")
      ? JSON.parse(String(localStorage?.getItem("timeZone")))
      : "America/New_York";
  return timeZone;
}

export const currencyFormatter = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const numberFormatter = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 2,
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export function getUnixTimeStamp(date: string) {
  return dayjs(date).unix();
}
