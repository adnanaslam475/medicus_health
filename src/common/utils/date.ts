import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function convertToUTC(date: string) {
  return dayjs.utc(date).format();
}


export const dateFormat = 'MM/DD/YY';
