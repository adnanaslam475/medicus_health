type routes = {
  name: string;
  toggleName?: string;
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
  { name: "Dashboard", route: "/admin/dashboards" },
  { name: "Appointments", route: "/admin/appointments" },
  // { name: "Admin Listing", route: "/admin/listing" },
  { name: "Physicians", route: "/admin/physicians" },
  { name: "Patients", route: "/admin/patients" },
  { name: "Messages", route: "/admin/messages" },
  {
    name: "Reports",
    route: "/admin/reports",
    submenu: [
      {
        name: "Transaction Reports",
        route: "/admin/reports/transactionReport",
      },
      { name: "Payout Reports", route: "/admin/reports/payoutReport" },
    ],
  },
  { name: "User", route: "/admin/user" },
  { name: "Account", route: "/admin/account" },
  { name: "Settings", route: "/admin/settings" },
];

export const DOCTOR_ROUTES: routes = [
  {
    name: "Dashboard",
    route: "/physician/dashboard",
    toggleName: "Appointments",
    submenu: [
      { name: "Upcoming", route: "/physician/appointments/upcoming" },
      { name: "Requested", route: "/physician/appointments/requested" },
      { name: "Cancelled", route: "/physician/appointments/cancelled" },
      { name: "History", route: "/physician/appointments/history" },
    ],
  },
  {
    name: "My Earnings",
    toggleName: "My Earnings",
    route: "/physician",
    submenu: [
      { name: "Earnings", route: "/physician/earnings" },
      { name: "Payout", route: "/physician//payout" },
    ],
  },
  // { name: "My Earnings", route: "/physician/myEarnings" },
  { name: "Patients", route: "/physician/patients" },
  { name: "Staff", route: "/physician/staff" },
  { name: "Messages", route: "/physician/messages" },
  { name: "Account", route: "/physician/account" },
];

export const STAFF_ROUTES: routes = [
  {
    name: "Dashboard",
    route: "/physician/dashboard",
    toggleName: "Appointments",
    submenu: [
      { name: "Upcoming", route: "/physician/appointments/upcoming" },
      { name: "Requested", route: "/physician/appointments/requested" },
      { name: "Cancelled", route: "/physician/appointments/cancelled" },
      { name: "History", route: "/physician/appointments/history" },
    ],
  },
  { name: "Patients", route: "/physician/patients" },
  { name: "Staff", route: "/physician/staff" },
  { name: "Messages", route: "/physician/messages" },
];
