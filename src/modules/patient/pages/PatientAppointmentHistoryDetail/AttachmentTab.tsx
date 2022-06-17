import Attachment from "common/components/Attachment/Attachment";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import React from "react";
import jpgIcon from "../../../../../public/assets/images/jpg.svg";
import word from "../../../../../public/assets/images/word-file.svg";
import { parseJson } from "common/utils/helper";
import { useRouter } from "next/router";
import { AttachmentObject } from "common/types/types";

function AttachmentTab() {
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
    urlArr = urlArr?.flat(1)?.map((item: any) => ({
      name: item.name,
      url: item.url,
    }));
  }
  const { patient, serviceType } = appointment || {};

  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <div className="flex gap-2">
        {urlArr?.map((item: AttachmentObject) => (
          <Attachment item={item} enable={false} />
        ))}
      </div>
    </CardWithProfileImageInfo>
  );
}

export default AttachmentTab;
