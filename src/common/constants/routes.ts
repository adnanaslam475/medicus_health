type routes = {
  name: string;
  route: string;
  submenu?: {
    name: string;
    route: string;
  }[];
}[];

export const PATIENT_ROUTES: routes = [
  {
    name: "Appointments",
    route: "+",
    submenu: [
      { name: "Upcoming", route: "/patient/appointments/upcoming" },
      { name: "Requested", route: "/patient/appointments/requested" },
      { name: "Cancelled", route: "/patient/appointments/cancelled" },
      { name: "History", route: "/patient/appointments/history" },
    ],
  },

  { name: "Physicians", route: "/patient/physicians" },
  { name: "Messages", route: "/patient/messages" },
  { name: "Account", route: "/patient/account" },
];

export const ADMIN_ROUTES: routes = [
  { name: "Dashboard", route: "/admin/dashboard" },
  // { name: "Admin Listing", route: "/admin/listing" },
  { name: "Physicians", route: "/admin/physicians" },
  { name: "Messages", route: "/admin/messages" },
  { name: "Account", route: "/admin/account" },
];

export const DOCTOR_ROUTES: routes = [
  { name: "Dashboard", route: "/doctor/dashboard" },
  { name: "Doctor Listing", route: "/doctor/listing" },
  { name: "Physicians", route: "/doctor/physicians" },
];
