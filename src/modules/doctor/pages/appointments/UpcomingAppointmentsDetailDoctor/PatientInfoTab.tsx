import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { useDoctorAppointmentDetailPatientInfoQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import CardWithProfileImageInfo from "./CardWithProfileImageInfo";

type Props = {};

function PatientInfoTab({}: Props) {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailPatientInfoQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });
  const { appointment } = data || {};
  const { patient, serviceType } = appointment || {};
  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <div className="max-w-[800px]">
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="first Name" value="mark" />
          <LabelWithTextDiv label="Last Name" value="mark" />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Gender" value="mark" />
          <LabelWithTextDiv label="Date of birth" value="mark" />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="fEmail Address" value="mark" />
          <LabelWithTextDiv label="Cell Number" value="mark" />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Country" value="mark" />
          <LabelWithTextDiv label="City" value="mark" />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Material Status" value="mark" />
          <LabelWithTextDiv label="Do you have any Children?" value="mark" />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="What is your Occupation?" value="mark" />
          <LabelWithTextDiv
            label="Do you have any Occupational Exposure?"
            value="mark"
          />
        </div>
        <div className="flex gap-2">
          <LabelWithTextDiv label="Do you have any pets?" value="mark" />
          <div className="w-full" />
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
