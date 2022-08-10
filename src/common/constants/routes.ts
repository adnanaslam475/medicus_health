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
      // { name: "Current", route: "/physician/appointments/current" },
      { name: "Upcoming", route: "/physician/appointments/upcoming" },
      { name: "Pending", route: "/physician/appointments/pending" },
      { name: "Canceled", route: "/physician/appointments/canceled" },
      { name: "History", route: "/physician/appointments/history" },
    ],
  },
  {
    name: "My earnings",
    toggleName: "My earnings",
    route: "/physician",
    submenu: [
      { name: "Earnings", route: "/physician/earnings" },
      { name: "Payouts", route: "/physician/payouts" },
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
      { name: "Pending", route: "/physician/appointments/pending" },
      { name: "Canceled", route: "/physician/appointments/canceled" },
      { name: "History", route: "/physician/appointments/history" },
    ],
  },
  { name: "Patients", route: "/physician/patients" },
  { name: "Messages", route: "/physician/messages" },
  { name: "Account", route: "/physician/staffaccount" },
];
