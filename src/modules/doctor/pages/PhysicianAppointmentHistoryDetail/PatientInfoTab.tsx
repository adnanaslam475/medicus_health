import { Spin } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { date } from "common/utils";
import {
  GetAppointmentInput,
  useDoctorAppointmentDetailPatientInfoQuery,
  useGetCityByIdQuery,
  useGetCountryByIdQuery,
  usePhysicianAppointmentsHistoryQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

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
      // filter: { appointmentId: Number(query?.id) },
      filter: { searchString: String(query?.id), status: "Completed" },
      pagination,
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
    patientProfile,
    country,
    state,
    city,
  } = patient || {};

  const { country_name } = country || {};
  const { state_name } = state || {};
  const { city_name } = city || {};

  const { maritalStatus, children, occupation, occupationalExposure, pets } =
    patientProfile || {};

  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <CardWithProfileImageInfo
      name={`${patient?.first_name} ${patient?.last_name}`}
      // serviceName={appointment?.patient?.email}
      imageUrl={appointment?.patient?.patientProfile?.profileImage}
    >
      <div className="max-w-[800px]">
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Nombre" value={first_name} />
          <LabelWithTextDiv label="Apellido" value={last_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Género" value={gender} />
          <LabelWithTextDiv
            label="Fecha de nacimiento"
            value={date?.formatDAYMMDDYY(date_of_birth)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Dirección de correo electrónico"
            value={email}
          />
          <LabelWithTextDiv
            label="Teléfono de contacto"
            value={contact_number}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="País de nacimiento"
            value={country_name ? country_name : "-"}
          />
          <LabelWithTextDiv
            label="Estado/Provinicia"
            value={state_name ? state_name : "-"}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Ciudad"
            value={city_name ? city_name : "-"}
          />

          <LabelWithTextDiv label="Estado civil" value={maritalStatus} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="¿Tienes hijos?" value={children} />
          <LabelWithTextDiv label="¿Cuál es tu ocupación?" value={occupation} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="¿Tiene alguna exposición ocupacional?"
            value={occupationalExposure}
          />
          <LabelWithTextDiv label="¿Tiene mascotas?" value={pets} />
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientInfoTab;
