import React from "react";
import AdminAppointmentsListing from "modules/admin/components/AdminAppointmentsListing/AdminAppointmentsListing";
import { translationJson } from "common/locales/translationJson";

function AdminAppointments() {
	return <AdminAppointmentsListing />;
}

export default AdminAppointments;


export function getStaticProps({ locale }: { locale: string }) {
	return {
	  props: {
		messages: translationJson(locale),
	  },
	};
  }