import { Spin } from "antd";
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

  const [{ data, fetching }] = useDoctorAppointmentDetailPatientInfoQuery({
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
    country,
    state,
    city,
  } = patient || {};

  const { maritalStatus, children, occupation, occupationalExposure, pets } =
    patientProfile || {};

  const { country_name } = country || {};
  const { state_name } = state || {};
  const { city_name } = city || {};

  // const [{ data: country }] = useGetCountryByIdQuery({
  //   variables: {
  //     id: country_id!,
  //   },
  // });

  // const { country_name } = country?.country || {};

  // const [{ data: city }] = useGetCityByIdQuery({
  //   variables: {
  //     id: city_id!,
  //   },
  // });
  // const { city_name } = city?.city || {};
  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${patient?.first_name || ""} ${patient?.last_name || ""}`}
      // serviceName={serviceType?.name || ""}
      imageUrl={patient?.patientProfile?.profileImage || ""}
    >
      <div className="max-w-[800px]">
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="First name" value={first_name} />
          <LabelWithTextDiv label="Last name" value={last_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Gender" value={gender} />
          <LabelWithTextDiv
            label="Date of birth"
            value={date?.formatDAYMMDDYY(date_of_birth)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Email address" value={email} />
          <LabelWithTextDiv label="Cell number" value={contact_number} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Country"
            value={country_name ? country_name : "-"}
          />
          <LabelWithTextDiv
            label="State"
            value={state_name ? state_name : "-"}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="City" value={city_name ? city_name : "-"} />

          <LabelWithTextDiv label="Marital status" value={maritalStatus} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Do you have any children?"
            value={children}
          />
          <LabelWithTextDiv
            label="What is your occupation?"
            value={occupation}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Do you have any occupational exposure?"
            value={occupationalExposure}
          />
          <LabelWithTextDiv label="Do you have any pets?" value={pets} />
          {/* <div className="w-full" /> */}
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
