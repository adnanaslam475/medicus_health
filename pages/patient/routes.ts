const patientRoutes = [
  { name: "Appointments", route: "/patient/appointments" },
  { name: "Upcoming", route: "/patient/appointments/upcoming" },
  { name: "Requested", route: "/patient/appointments/requested" },
  { name: "Cancelled", route: "/patient/appointments/cancelled" },
  { name: "History", route: "/patient/appointments/history" },
  { name: "Messages", route: "/patient/messages" },
  { name: "Account", route: "/patient/account" },
];

const adminRoutes = [
  { name: "Dashboard", route: "/admin/dashboard" },
  { name: "Admin Listing", route: "/admin/listing" },
];

const doctorRoutes = [
  { name: "Dashboard", route: "/doctor/dashboard" },
  { name: "Doctor Listing", route: "/doctor/listing" },
];

export { patientRoutes, adminRoutes, doctorRoutes };
