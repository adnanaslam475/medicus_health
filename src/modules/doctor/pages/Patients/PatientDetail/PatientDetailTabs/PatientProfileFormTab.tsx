/* eslint-disable react/jsx-key */
import React from "react";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  User,
} from "../../../../../../generated/graphql";
import MessageButtons from "common/components/MessageButtons/MessageButtons";
import { getUserData } from "common/utils/userData";
import { formatYYYYMMMMDD } from "common/utils/date";
// const props = {};
type Props = {
  userDetail?: User;
  loggedinDoctorDetails?: User;
};

function PatientProfileFormTab({ userDetail, loggedinDoctorDetails }: Props) {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_number,
    doctorProfile,
    email,
    password,
    zip_code,
    country,
    state,
    city,
    streetAddress,
    patientProfile,
  } = userDetail || {};

  const { country_name } = country || {};
  const { state_name } = state || {};
  const { city_name } = city || {};

  const {
    maritalStatus,
    children,
    occupation,
    occupationalExposure,
    exposureDuration,
    pets,
  } = patientProfile || {};

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};

  const profilePicture = userDetail?.patientProfile?.profileImage;

  return (
    <div className="max-w-[800px]">
      <CardWithProfileImageInfo
        name={first_name}
        serviceName={email}
        imageUrl={profilePicture}
      >
        <div className="messageButtons">
          <MessageButtons
            doctorId={
              getUserData().user?.role === "Doctor"
                ? getUserData().user?.id
                : ""
            }
            patientID={patientProfile?.userId}
          />
        </div>
        <div className="max-w-[800px]">
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Nombre" value={first_name} />
            <LabelWithTextDiv label="Apellido" value={last_name} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Género" value={gender} />
            <LabelWithTextDiv
              label="Fecha de nacimiento"
              value={formatYYYYMMMMDD(date_of_birth)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="Dirección de correo electrónico"
              value={email}
            />
            <LabelWithTextDiv
              label="Numero de celular"
              value={contact_number}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="País de nacimiento"
              value={country_name ? country_name : "-"}
            />
            <LabelWithTextDiv
              label="Estado"
              value={state_name ? state_name : "-"}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="Ciudad"
              value={city_name ? city_name : "-"}
            />
            <LabelWithTextDiv label="Código postal" value={zip_code} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="Dirección (calle y numero)"
              value={streetAddress}
            />
            <LabelWithTextDiv label="Estado civil" value={maritalStatus} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="¿Tienes hijos?" value={children} />
            <LabelWithTextDiv
              label="¿Cuál es tu ocupación?"
              value={occupation}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="¿Tiene alguna exposición ocupacional?"
              value={occupationalExposure === "Yes" ? exposureDuration : "No"}
            />
            <LabelWithTextDiv label="¿Tiene mascotas?" value={pets} />
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}

export default PatientProfileFormTab;
