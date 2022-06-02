import Attachment from "common/components/Attachment/Attachment";
import { parseJson } from "common/utils/helper";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import word from "../../../../../public/assets/images/word-file.svg";
import { useRouter } from "next/router";
import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

function PhysicianAttachmentTab() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  const { reportUrl } = appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr[0]?.map((item: any) => item.split("com/")[1]);
  }
  const { patient, serviceType } = appointment || {};
  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <div className="flex gap-2">
        {urlArr?.map((item: string) => (
          <Attachment name={item} enable={false} />
        ))}
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PhysicianAttachmentTab;
