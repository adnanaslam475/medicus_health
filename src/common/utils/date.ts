import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(utc);

export function convertToUTC(date: string) {
  return dayjs.utc(date).format();
}

export function convertStringDateToUTC(date: string) {
  return dayjs.utc(date).format("MM-DD-YYYY");
}

export function formatMMMMDDYYYY(date: string) {
  return dayjs.utc(date).format("MMMM, D, YYYY");
}

export function formathhmma(date: string) {
  return dayjs.utc(date).format("hh:mm a");
}

export const getDateInFormat = (getDate: string | number | Date | dayjs.Dayjs | null | undefined) => {
  const getDateUseingDayjs = dayjs(getDate);
  return getDate && getDateUseingDayjs.isValid() ? getDateUseingDayjs.format("MM-DD-YYYY") : "";
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
  return time.join(""); // return adjusted time or original string
}

export function dayName(date: number) {
  return dayjs().day(date).format("dddd");
}
