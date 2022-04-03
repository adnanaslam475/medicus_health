import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function convertToUTC(date: string) {
  return dayjs.utc(date).format();
}

export function convertBirthDateToUTC(date: string) {
  return dayjs.utc(date).format("MM-DD-YYYY");
}

