import {
  convertToUTC,
  convertStringDateToUTC,
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formathhmma,
  isAppoinentDateIsSame,
} from "./date";

import { isObjectEmpty } from "./object";

import { getUserData, getToken, getRole } from "./userData";

const date = {
  convertToUTC,
  convertStringDateToUTC,
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formathhmma,
  isAppoinentDateIsSame,
};

const object = {
  isObjectEmpty,
};

const userData = {
  getUserData,
  getToken,
  getRole,
};
export { date, object, userData };
