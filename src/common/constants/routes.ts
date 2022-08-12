type routes = {
  name: string;
  toggleName?: string;
  route: string;
  id?: string;
  submenu?: {
    name: string;
    route: string;
    subId?: string;
  }[];
}[];
export const PATIENT_ROUTES: routes = [
  {
    name: "Appointments",

    route: "+",
    id: "1",
    submenu: [
      // { name: "Current", route: "/patient/appointments/current" },
      {
        name: "Upcoming",
        route: "/patient/appointments/upcoming",
        subId: "1",
      },
      { name: "Pending", route: "/patient/appointments/pending", subId: "2" },
      { name: "Canceled", route: "/patient/appointments/canceled", subId: "3" },
      { name: "History", route: "/patient/appointments/history", subId: "4" },
    ],
  },

  { name: "Physicians", route: "/patient/physicians", id: "2" },
  { name: "Messages", route: "/patient/messages", id: "3" },
  { name: "Account", route: "/patient/account", id: "4" },
  // {
  //   name: "Equipo",

  //   route: "+",
  //   submenu: [
  //     { name: "Próximos", route: "/patient/appointments/upcoming" },
  //     { name: "Pendiente", route: "/patient/appointments/pending" },
  //     { name: "Cancelado", route: "/patient/appointments/canceled" },
  //     { name: "Historia", route: "/patient/appointments/history" },
  //   ],
  // },

  // { name: "Médicos/Médicas", route: "/patient/physicians" },
  // { name: "Mensajes", route: "/patient/messages" },
  // { name: "Cuenta", route: "/patient/account" },
];

export const ADMIN_ROUTES: routes = [
  { name: "Dashboard", route: "/admin/dashboards", id: "1" },
  { name: "Appointments", route: "/admin/appointments", id: "2" },
  // { name: "Admin Listing", route: "/admin/listing" },
  { name: "Physicians", route: "/admin/physicians", id: "3" },
  { name: "Patients", route: "/admin/patients", id: "4" },
  { name: "Messages", route: "/admin/messages", id: "5" },
  {
    name: "Reports",
    route: "/admin/reports",
    id: "6",
    submenu: [
      {
        name: "Transaction Reports",
        route: "/admin/reports/transactionReport",
        subId: "1",
      },
      {
        name: "Payout Reports",
        route: "/admin/reports/payoutReport",
        subId: "2",
      },
    ],
  },
  { name: "User", route: "/admin/user", id: "7" },
  { name: "Account", route: "/admin/account", id: "8" },
  { name: "Settings", route: "/admin/settings", id: "9" },
];

export const DOCTOR_ROUTES: routes = [
  {
    name: "Dashboard",
    route: "/physician/dashboard",
    id: "1",
    toggleName: "Appointments",
    submenu: [
      // { name: "Current", route: "/physician/appointments/current" },
      {
        name: "Upcoming",
        route: "/physician/appointments/upcoming",
        subId: "1",
      },
      {
        name: "Pending",
        route: "/physician/appointments/pending",
        subId: "2",
      },
      {
        name: "Canceled",
        route: "/physician/appointments/canceled",
        subId: "3",
      },
      {
        name: "History",
        route: "/physician/appointments/history",
        subId: "4",
      },
    ],
  },
  {
    name: "My earnings",
    toggleName: "My earnings",
    route: "/physician",
    id: "2",
    submenu: [
      { name: "Earnings", route: "/physician/earnings", subId: "1" },
      { name: "Payouts", route: "/physician/payouts", subId: "2" },
    ],
  },
  // { name: "My Earnings", route: "/physician/myEarnings" },
  { name: "Patients", route: "/physician/patients", id: "3" },
  { name: "Staff", route: "/physician/staff", id: "4" },
  { name: "Messages", route: "/physician/messages", id: "5" },
  { name: "Account", route: "/physician/account", id: "6" },
];

export const STAFF_ROUTES: routes = [
  {
    name: "Dashboard",
    route: "/physician/dashboard",
    toggleName: "Appointments",
    id: "1",
    submenu: [
      {
        name: "Upcoming",
        route: "/physician/appointments/upcoming",
        subId: "1",
      },
      {
        name: "Pending",
        route: "/physician/appointments/pending",
        subId: "2",
      },
      {
        name: "Canceled",
        route: "/physician/appointments/canceled",
        subId: "3",
      },
      {
        name: "History",
        route: "/physician/appointments/history",
        subId: "4",
      },
    ],
  },
  { name: "Patients", route: "/physician/patients", id: "2" },
  { name: "Messages", route: "/physician/messages", id: "3" },
  { name: "Account", route: "/physician/staffaccount", id: "4" },
];
