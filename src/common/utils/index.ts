import {
  convertToUTC,
  convertStringDateToUTC,
  convertStringDateToUTCChatFormat,
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formatYYYYMMMMDD,
  formathhmma,
  isAppoinentDateIsSame,
  formatDate_n_Time,
  addHoursToDate,
  formatDAYMMDD,
  formatDAYMMDDYY
} from "./date";

import { isObjectEmpty } from "./object";

import { getUserData, getToken, getRole } from "./userData";

import {
  getOppositeParticipant,
  getOppositeParticipantProfileImage,
} from "./message";

const date = {
  convertToUTC,
  convertStringDateToUTC,
  convertStringDateToUTCChatFormat,
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formatYYYYMMMMDD,
  formathhmma,
  isAppoinentDateIsSame,
  formatDate_n_Time,
  addHoursToDate,
  formatDAYMMDD,
  formatDAYMMDDYY
};

const object = {
  isObjectEmpty,
};

const userData = {
  getUserData,
  getToken,
  getRole,
};

const messageUtils = {
  getOppositeParticipant,
  getOppositeParticipantProfileImage,
};
export { date, object, userData, messageUtils };
