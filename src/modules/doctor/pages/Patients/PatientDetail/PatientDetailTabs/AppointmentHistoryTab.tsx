import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React from "react";
import AppointmentHistory from "../../AppointmentHistory/AppointmentHistory";

function AppointmentHistoryTab() {
	return (
		<CardWithProfileImageInfo name="usama" serviceName="consultation">
			<AppointmentHistory />
		</CardWithProfileImageInfo>
	);
}

export default AppointmentHistoryTab;
