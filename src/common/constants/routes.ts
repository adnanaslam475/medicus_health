export const PATIENT_ROUTES = [
  {
    name: "Appointments",
    route: "/patient/appointments",
    submenu: [
      { name: "Upcoming", route: "/patient/appointments/upcoming" },
      { name: "Requested", route: "/patient/appointments/requested" },
      { name: "Cancelled", route: "/patient/appointments/cancelled" },
      { name: "History", route: "/patient/appointments/history" },
    ],
  },

  { name: "Physicians", route: "/patient/physicians", submenu: []},
  { name: "Messages", route: "/patient/messages" , submenu: [] },
  { name: "Account", route: "/patient/account" , submenu: []},
];

export const ADMIN_ROUTES = [
  { name: "Dashboard", route: "/admin/dashboard" , submenu: []},
  { name: "Admin Listing", route: "/admin/listing" , submenu: []},
];

export const DOCTOR_ROUTES = [
  { name: "Dashboard", route: "/doctor/dashboard" , submenu: []},
  { name: "Doctor Listing", route: "/doctor/listing" , submenu: []},
];
