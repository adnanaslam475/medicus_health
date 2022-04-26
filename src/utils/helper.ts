import config from "../../config";

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
];

export const professionalBGData = [
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "role",
      defaultValue: "University",
      disabled: true,
    },
  ],
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "role",
      defaultValue: "University",
      disabled: true,
    },
  ],
  [
    {
      label: "Hospital/Clinic/Institution",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Role",
      name: "role",
      defaultValue: "University",
      disabled: true,
    },
  ],
];

export const educationalBGData = [
  [
    {
      label: "University/Institution",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Degree/Diploma/Certification",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
  ],
  [
    {
      label: "University/Institution",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
    {
      label: "Degree/Diploma/Certification",
      name: "institute",
      value: "University of Oklahoma College of Medicine",
      defaultValue: "University of Oklahoma College of Medicine",
      disabled: true,
    },
  ],
];
