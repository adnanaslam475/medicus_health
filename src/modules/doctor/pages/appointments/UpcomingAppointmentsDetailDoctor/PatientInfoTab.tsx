import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { date } from "common/utils";
import {
  useDoctorAppointmentDetailPatientInfoQuery,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function PatientInfoTab({}: Props) {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailPatientInfoQuery({
    variables: {
      id: Number(query.id),
    },
    pause: !query.id,
  });
  const { appointment } = data || {};
  const { patient, serviceType } = appointment || {};
  const {
    first_name,
    last_name,
    gender,
    email,
    date_of_birth,
    contact_number,
    country_id,
    city_id,
    patientProfile,
  } = patient || {};

  const { maritalStatus, children, occupation, occupationalExposure, pets } =
    patientProfile || {};

  const [{ data: country }] = useGetCountryByIdQuery({
    variables: {
      id: country_id!,
    },
  });

  const { country_name } = country?.country || {};

  const [{ data: city }] = useGetCityByIdQuery({
    variables: {
      id: city_id!,
    },
  });

  const { city_name } = city?.city || {};

  return (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      serviceName={serviceType?.name}
    >
      <div className="max-w-[800px]">
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="First Name" value={first_name} />
          <LabelWithTextDiv label="Last Name" value={last_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Gender" value={gender} />
          <LabelWithTextDiv
            label="Date of birth"
            value={date?.formatMMMMDDYYYY(date_of_birth)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Email Address" value={email} />
          <LabelWithTextDiv label="Cell Number" value={contact_number} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Country" value={country_name} />
          <LabelWithTextDiv label="City" value={city_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Marital Status" value={maritalStatus} />
          <LabelWithTextDiv
            label="Do you have any Children?"
            value={children}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="What is your Occupation?"
            value={occupation}
          />
          <LabelWithTextDiv
            label="Do you have any Occupational Exposure?"
            value={occupationalExposure}
          />
        </div>
        <div className="md:flex gap-2">
          <LabelWithTextDiv label="Do you have any pets?" value={pets} />
          <div className="w-full" />
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
