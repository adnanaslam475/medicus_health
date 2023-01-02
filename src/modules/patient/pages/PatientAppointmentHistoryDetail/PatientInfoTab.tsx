import React from "react";
import { useRouter } from "next/router";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { date } from "common/utils";
import {
  GetAppointmentInput,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { Spin } from "antd";

type Props = {};

function PatientInfoTab({}: Props) {
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
      filter: {
        ...filterValues,
        status: "Completed",
        searchString: String(query?.id),
      },
      pagination: { limit: -1, page: 1 },
      sorting,
    },
  });

  const { appointments } = data || {};
  const appointment = appointments?.items && appointments.items[0];

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

  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    // <CardWithProfileImageInfo
    //   name={`${patient?.first_name} ${patient?.last_name}`}
    //   serviceName={serviceType?.name}
    //   imageUrl={patient?.patientProfile?.profileImage}

    // >
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
          <LabelWithTextDiv label="Country" value={country_name} />
          <LabelWithTextDiv label="City" value={city_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Marital status" value={maritalStatus} />
          <LabelWithTextDiv
            label="Do you have any children?"
            value={children}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="What is your occupation?"
            value={occupation}
          />
          <LabelWithTextDiv
            label="Do you have any occupational exposure?"
            value={occupationalExposure}
          />
        </div>
        <div className="flex gap-2">
          <LabelWithTextDiv label="Do you have any pets?" value={pets} />
          <div className="w-full" />
        </div>
      </div>
    // </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
