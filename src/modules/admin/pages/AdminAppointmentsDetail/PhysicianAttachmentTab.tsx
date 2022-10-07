import React from "react";
import { useRouter } from "next/router";
import { parseJson } from "common/utils/helper";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Attachment from "common/components/Attachment/Attachment";
import {
  Appointment,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { AttachmentObject } from "common/types/types";
import { Empty, Spin } from "antd";

type Props = {
  appointment: Appointment | undefined;
  loading?: boolean;
};
function AdminAttachmentTab({ appointment, loading }: Props) {
  const { reportUrl } = appointment || {};

  let urlArr = parseJson(reportUrl);
  if (urlArr && urlArr.length > 0) {
    urlArr = urlArr?.flat(1)?.map((item: any) => ({
      name: item.name,
      url: item.url,
    }));
  }
  const { patient, serviceType } = appointment || {};
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <>
      <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        serviceName={serviceType?.name}
        imageUrl={appointment?.patient?.patientProfile?.profileImage}
      >
        <div className="">
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
      </CardWithProfileImageInfo>
    </>
  );
}

export default AdminAttachmentTab;
