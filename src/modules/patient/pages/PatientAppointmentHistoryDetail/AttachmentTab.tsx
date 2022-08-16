import Attachment from "common/components/Attachment/Attachment";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import {
  GetAppointmentInput,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import React from "react";
import jpgIcon from "../../../../../public/assets/images/jpg.svg";
import word from "../../../../../public/assets/images/word-file.svg";
import { parseJson } from "common/utils/helper";
import { useRouter } from "next/router";
import { AttachmentObject } from "common/types/types";
import { Empty, Spin } from "antd";

function AttachmentTab() {
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
      // filter: { searchString: String(query?.id), status: "Completed" },
      filter: { ...filterValues, status: "Completed" },
      pagination: { limit: -1, page: 1 },
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

  // urlArr ? console.log(urlArr, "anis----") : console.log("anis");
  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    // <CardWithProfileImageInfo
    //   name={`${patient?.first_name} ${patient?.last_name}`}
    //   serviceName={serviceType?.name}
    //   imageUrl={appointment?.patient?.patientProfile?.profileImage}

    // >
    <div className="flex gap-2">
      {urlArr?.length ? (
        urlArr?.map((item: AttachmentObject) => (
          <Attachment item={item} enable={false} />
        ))
      ) : (
        <div className="flex items-center justify-center w-3/5 mt-5">
          <Empty />
        </div>
      )}
    </div>
    // </CardWithProfileImageInfo>
  );
}

export default AttachmentTab;
