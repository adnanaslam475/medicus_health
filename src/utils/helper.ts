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
      label: "Contact #",
      name: "contact",
      defaultValue: "0000000000",
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
      label: "Confirm password",
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
      label: "Years of experience",
      name: "year_of_experience",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "Street address",
      name: "streetAddress",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Country",
      name: "country",
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
      label: "City",
      name: "city",
      disabled: true,
      defaultValue: "",
    },
  ],
  [
    {
      label: "Postal code",
      name: "zip_code",
      disabled: true,
      defaultValue: "",
    },
    {
      label: "Time zone",
      name: "timeZone",
      disabled: true,
      defaultValue: "",
    },
  ],
];

export const patientEditForm = [
  {
    label: "Nombre",
    name: "first_name",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "Apellido",
    name: "last_name",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "Género",
    name: "gender",
    type: "select",
    required: false,
    option_name: "gender",
    options: [
      { id: 1, value: "Masculino" },
      { id: 2, value: "Femenina" },
      { id: 3, value: "Prefiero no responder" },
    ],
  },
  {
    label: "Fecha de nacimiento",
    name: "date_of_birth",
    required: true,
    type: "date",
  },
  {
    label: "Coreo electrónico",
    name: "email",
    required: true,
    type: "text",
  },
  {
    label: "Numero de celular",
    name: "contact_number",
    type: "text",
    required: true,
  },
  {
    label: "Clave",
    name: "password",
    type: "text",
    inputType: "password",
    required: false,
  },
  {
    label: "Confirmar contraseña",
    name: "confirm_password",
    type: "text",
    inputType: "password",
    required: false,
  },
  {
    label: "País",
    name: "countries",
    type: "select",
    option_name: "country_name",
    required: true,
    options: [],
  },
  {
    label: "Estado",
    name: "states",
    type: "select",
    option_name: "state_name",
    required: false,
    options: [],
  },
  {
    label: "Ciudad",
    name: "cities",
    type: "select",
    option_name: "city_name",
    required: false,
    options: [],
  },
  {
    label: "Dirección",
    name: "streetAddress",
    type: "text",
    inputType: "text",
    required: true,
  },
  {
    label: "código postal",
    name: "zip_code",
    type: "text",
    inputType: "number",
    required: true,
  },
  {
    label: "Estado civil",
    name: "maritalStatus",
    type: "select",
    option_name: "maritalStatus",
    required: true,
    options: [
      { id: 1, value: "Único" },
      { id: 2, value: "Casado" },
      { id: 3, value: "Viudo" },
      { id: 4, value: "Divorciado" },
    ],
  },
  {
    label: "¿Tienes hijos?",
    name: "haveChildren",
    required: true,
    type: "radio",
    options: ["Yes", "No"],
    relationType: "text",
  },
  {
    label: "No de niños",
    name: "children",
    type: "text",
    required: true,
    relationName: "haveChildren",
    option_name: "children",
  },
  {
    label: "¿Cuál es tu ocupación?",
    name: "occupation",
    type: "text",
    required: true,
  },
  {
    label: "¿Tiene alguna exposición ocupacional?",
    name: "occupationalExposure",
    type: "radio",
    required: true,
    options: ["Sí", "No"],
  },
  {
    label: "¿Duración de la exposición ocupacional?",
    name: "exposureDuration",
    relationName: "occupationalExposure",
    type: "select",
    options: [
      { id: 1, value: "Menos de un año" },
      { id: 2, value: "Más de un año (1+)" },
      { id: 3, value: "Más de tres a cinco años (3-5)" },
    ],
    option_name: "exposureDuration",
    relationType: "text",
  },
  {
    label: "¿Tiene mascotas?",
    name: "pets",
    type: "select",
    required: true,
    option_name: "pets",
    options: [
      { id: 0, value: "Sí" },
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

export const certificationBGPlaceholder = [
  [
    {
      label: "Certification",
      name: "certification",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Licensure",
      name: "licensure",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
  ],
];

export const honorsBGPlaceholder = [
  [
    {
      label: "Award",
      name: "awards",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Honors",
      name: "honors_and_recognition",
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
    value: "Appointment canceled and/or rescheduled by physician",
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
      defaultValue: "John Doe",
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
      label: "Contact #",
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
      label: "Confirm password",
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

export const capitalizeFirstLetter = (value: any) => {
  return String(value)?.charAt(0).toUpperCase() + String(value).slice(1);
};

export const timezoneLabel = (value: any = "") => {
  return value
    ?.split("/")
    [Number(value?.split("/").length) - 1]?.replace(/_/g, " ");
};
