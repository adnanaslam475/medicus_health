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
      label: "First Name",
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
    type: "text",
    name: "children",
    inputType: "number",
    required: true,
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
    value: "Admin Creates/Update Appointment",
  },
  {
    key: "appointment_accepted_by_doctor",
    value: "Appointment Accepted by Doctor",
  },
  {
    key: "appointment_reminder",
    value: "Appointment Reminder (24 hours before the appointment)",
  },
  {
    key: "appointment_rescheduled_by_doctor",
    value: "Appointment rescheduled by Doctor",
  },
  {
    key: "new_message_received",
    value: "The Patient/Physician/Administrator receives a chat message",
  },
  {
    key: "appointment_slot_suggested_by_doctor",
    value: "Appointment slot suggested by doctor",
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
      label: "First Name",
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
