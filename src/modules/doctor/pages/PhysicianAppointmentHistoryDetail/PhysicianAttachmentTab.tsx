import Attachment from "common/components/Attachment/Attachment";
import { parseJson } from "common/utils/helper";
import {
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import word from "../../../../../public/assets/images/word-file.svg";
import { useRouter } from "next/router";
import React from "react";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import { AttachmentObject } from "common/types/types";

function PhysicianAttachmentTab() {
  const { query } = useRouter();

  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const [sorting, setSorting] = React.useState({
    column: "",
    order: "",
  });

  const [{ data, fetching }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchString: String(query?.id), status: "Completed" },
      pagination,
      sorting,
    },
  });

  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

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
      // serviceName={appointment?.patient?.email}
      imageUrl={appointment?.patient?.patientProfile?.profileImage}    >
      <div className="flex gap-2">
        {urlArr?.map((item: AttachmentObject) => (
          <Attachment item={item} enable={false} />
        ))}
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PhysicianAttachmentTab;
