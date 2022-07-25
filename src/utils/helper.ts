import { DoctorSchedule } from "generated/graphql";
import config from "../../config";
import engFlag from "../../public/assets/images/engFlag.png";
import espanolFlag from "../../public/assets/images/espanolFlag.png";

export const configS3 = {
  region: config?.region || "",
  bucketName: config?.bucketName || "",
  accessKeyId: config?.accessKeyId || "",
  secretAccessKey: config?.secertAccessKey || "",
};

export const bioForm = [
  [
    {
      label: "First name",
      name: "firstName",
      defaultValue: "usama",
      disabled: true,
    },
    {
      label: "Last name",
      name: "lastName",
      defaultValue: "khan",
      disabled: true,
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      defaultValue: "usama@gmail.com",
      disabled: true,
    },
    {
      label: "Contact Number",
      name: "contact",
      defaultValue: "090078601",
      disabled: true,
    },
  ],
  [
    {
      label: "Password",
      name: "password",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "Specialization",
      name: "specialization",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Years of Experience",
      name: "year_of_experience",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "Street Address",
      name: "street_adress",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "Country",
      name: "country",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "City",
      name: "city",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "State",
      name: "state",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Zip code",
      name: "zip_code",
      disabled: true,
      defaultValue: "",
    },
  ],
];

export const patientEditForm = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "Last name",
    name: "last_name",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    required: false,
    option_name: "gender",
    options: [
      { id: 1, value: "Male" },
      { id: 2, value: "Female" },
      { id: 3, value: "prefer not to answer" },
    ],
  },
  {
    label: "Date of Birth",
    name: "date_of_birth",
    required: true,
    type: "date",
  },
  {
    label: "Email Address",
    name: "email",
    required: true,
    type: "text",
  },
  {
    label: "Cell Number",
    name: "contact_number",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    inputType: "password",
    required: false,
  },
  {
    label: "Confirm Password",
    name: "confirm_password",
    type: "text",
    inputType: "password",
    required: false,
  },
  {
    label: "Country",
    name: "countries",
    type: "select",
    option_name: "country_name",
    required: true,
    options: [],
  },
  {
    label: "State",
    name: "states",
    type: "select",
    option_name: "state_name",
    required: false,
    options: [],
  },
  {
    label: "City",
    name: "cities",
    type: "select",
    option_name: "city_name",
    required: false,
    options: [],
  },
  {
    label: "Street Address",
    name: "streetAddress",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "Zip Code",
    name: "zip_code",
    type: "text",
    inputType: "number",
    required: true,
  },
  {
    label: "Marital Status",
    name: "maritalStatus",
    type: "select",
    option_name: "maritalStatus",
    required: true,
    options: [
      { id: 1, value: "Single" },
      { id: 2, value: "Married" },
      { id: 3, value: "Widower" },
      { id: 4, value: "Divorced" },
    ],
  },
  {
    label: "Do you have any children?",
    name: "haveChildren",
    required: true,
    type: "radio",
    options: ["Yes", "No"],
    relationType: "text",
  },
  {
    label: "No of childrens",
    name: "children",
    type: "text",
    required: true,
    relationName: "haveChildren",
    option_name: "children",
  },
  {
    label: "What is your occupation?",
    name: "occupation",
    type: "text",
    required: true,
  },
  {
    label: "Do you have any occupational Exposure?",
    name: "occupationalExposure",
    type: "radio",
    required: true,
    options: ["Yes", "No"],
  },
  {
    label: "Occupational Exposure duration?",
    name: "exposureDuration",
    relationName: "occupationalExposure",
    type: "select",
    options: [
      { id: 1, value: "Less than a year" },
      { id: 2, value: "More than a year (1+)" },
      { id: 3, value: "More than three to five years (3-5)" },
    ],
    option_name: "exposureDuration",
    relationType: "text",
  },
  {
    label: "Do you have any pets?",
    name: "pets",
    type: "select",
    required: true,
    option_name: "pets",
    options: [
      { id: 0, value: "Yes" },
      { id: 1, value: "No" },
    ],
  },
];

export const professionalBGData = [
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "pe-institution-0",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "pe-role-0",
      defaultValue: "University",
      disabled: true,
    },
  ],
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "pe-institution-1",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "pe-role-1",
      defaultValue: "University",
      disabled: true,
    },
  ],
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "pe-institution-2",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "pe-role-2",
      defaultValue: "University",
      disabled: true,
    },
  ],
];

export const educationalBGData = [
  [
    {
      label: "University/Institution",
      name: "eb-institution-0",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Degree/Diploma/Certification",
      name: "eb-degree-0",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
  ],
  [
    {
      label: "University/Institution",
      name: "eb-institution-1",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Degree/Diploma/Certification",
      name: "eb-degree-1",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
  ],
];

export const days = [
  { key: 1, value: "Monday" },
  { key: 2, value: "Tuesday" },
  { key: 3, value: "Wednesday" },
  { key: 4, value: "Thursday" },
  { key: 5, value: "Friday" },
  { key: 6, value: "Saturday" },
  { key: 7, value: "Sunday" },
];

export const patientEmailPreferencesData = [
  {
    key: "admin_appointment_create_update",
    value: "Support team creates and/or updates appointment",
  },
  {
    key: "appointment_accepted_by_doctor",
    value: "Appointment accepted by physician",
  },
  {
    key: "appointment_reminder",
    value: "Appointment reminder (4 hours before the appointment)",
  },
  {
    key: "appointment_rescheduled_by_doctor",
    value: "Appointment cancelled and/or rescheduled by physician",
  },
  {
    key: "new_message_received",
    value: "Chat message received",
  },
  {
    key: "appointment_slot_suggested_by_doctor",
    value: "Appointment slot suggested by physician",
  },
  // mine
  // {
  //   key:"patient_registration_update",
  //   value:"Patient registration update"
  // },
  // {
  //   key:"physician_registration_update",
  //   value:"Physician registration update"
  // },
  // {
  //   key:" appointment_requested",
  //   value:"Appointment requested"
  // },
  // {
  //   key:"appointment_accepted_by_patient",
  //   value:"Appointment accepted by patient"
  // },
  // {
  //   key:"transaction_successful_alert",
  //   value:"Transaction successful alert"
  // }
];

export const physicianEmailPreferencesData = [
  // mine
  // {
  //   key:"patient_registration_update",
  //   value:"Patient registration update"
  // },
  // {
  //   key:"physician_registration_update",
  //   value:"Physician registration update"
  // },
  {
    key: "appointment_requested",
    value: "Appointment requested",
  },
  {
    key: "appointment_accepted_by_patient",
    value: "Appointment accepted by patient",
  },
  {
    key: "appointment_reminder",
    value: "Appointment reminder (4 hours before the appointment)",
  },
  {
    key: "admin_appointment_create_update",
    value: "Support team creates and/or updates appointment",
  },
  {
    key: "new_message_received",
    value: "Chat message received",
  },
  // {
  //   key:"transaction_successful_alert",
  //   value:"Transaction successful alert"
  // }
];
export const adminEmailPreferencesData = [
  {
    key: "new_message_received",
    value: "Chat message received",
  },
  {
    key: "transaction_successful_alert",
    value: "Transaction successful alert",
  },
];

export function sorter(a: DoctorSchedule, b: DoctorSchedule) {
  return a.day - b.day || a.startTime.localeCompare(b.startTime);
}

export const FLAG_BY_LANGUAGE = {
  ["english" as string]: engFlag,
  ["espanol" as string]: espanolFlag,
  ["spanish" as string]: espanolFlag,
};

export const adminBioForm = [
  [
    {
      label: "First name",
      name: "firstName",
      defaultValue: "usama",
      disabled: true,
    },
    {
      label: "Last name",
      name: "lastName",
      defaultValue: "khan",
      disabled: true,
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      defaultValue: "usama@gmail.com",
      disabled: true,
    },
    {
      label: "Contact Number",
      name: "contact",
      defaultValue: "090078601",
      disabled: true,
    },
  ],
  [
    {
      label: "Password",
      name: "password",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      disabled: true,
      defaultValue: "",
    },
  ],
];
export const compareAllArraysAreEqual = (...arrays: string[]) => {
  let i = 0;
  while (i < arrays.length) {
    if (JSON.stringify(arrays[i]) !== JSON.stringify(arrays[i + 1])) {
      return false;
    }
    i++;
  }
  return true;
};
