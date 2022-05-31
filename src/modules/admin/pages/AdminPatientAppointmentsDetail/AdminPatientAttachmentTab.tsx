import React from "react";
import { useRouter } from "next/router";
import { parseJson } from "common/utils/helper";
import word from "../../../../../public/assets/images/word-file.svg";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Attachment from "common/components/Attachment/Attachment";
import {
  Appointment,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";

type Props = {
  appointment: Appointment | undefined;
};
function AdminPatientAttachmentTab({ appointment }: Props) {
  const { reportUrl } = appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr[0]?.map((item: any) => item?.split("com/")[1]);
  }
  const { patient, serviceType } = appointment || {};
  return (
    <>
      <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        serviceName={serviceType?.name}
      >
        <div className="flex gap-2">
          {urlArr?.map((item: string) => (
            <Attachment src={word} name={item} enable={false} />
          ))}
        </div>
      </CardWithProfileImageInfo>
    </>
  );
}

export default AdminPatientAttachmentTab;
