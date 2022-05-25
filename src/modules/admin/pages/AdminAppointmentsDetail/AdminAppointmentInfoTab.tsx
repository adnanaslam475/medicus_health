import React from "react";
import { useRouter } from "next/router";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

type Props = { data: object | undefined };
function AdminAppointmentInfoTab({ data }: Props) {
  

  return (
    <CardWithProfileImageInfo name="usama" serviceName="consultation">
      <div className="max-w-[800px]">
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AdminAppointmentInfoTab;
