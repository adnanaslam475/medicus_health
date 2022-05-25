import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { Appointment } from "generated/graphql";

type Props = { data: Appointment | undefined };
function AdminAppointmentInfoTab({ data }: Props) {
  

  return (
    <CardWithProfileImageInfo name="usama" serviceName="consultation">
      <div className="max-w-[800px]">
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AdminAppointmentInfoTab;
