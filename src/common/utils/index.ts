import {
  convertToUTC,
  convertStringDateToUTC,
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formathhmma,
  isAppoinentDateIsSame,
  formatDate_n_Time
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
  time24HrConvert,
  dayName,
  formatMMMMDDYYYY,
  formathhmma,
  isAppoinentDateIsSame,
  formatDate_n_Time
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
