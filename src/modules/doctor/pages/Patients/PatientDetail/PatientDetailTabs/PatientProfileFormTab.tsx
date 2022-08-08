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
    country_id,
    state_id,
    city_id,
    zip_code,
    streetAddress,
    patientProfile,
  } = userDetail || {};

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

  const [getStatesByCountry] = useGetStatesByCountryQuery({
    variables: {
      input: country_id || 0,
    },
    pause: country_id === undefined,
  });

  const [getCityByState] = useGetCitiesByStateQuery({
    variables: {
      input: state_id || 0,
    },
    pause: state_id === undefined,
  });

  let selectedCountry = countries?.filter((item) => item.id === country_id);
  let countryName = "";
  if (selectedCountry) {
    countryName = selectedCountry[0]?.country_name;
  }

  let selectedState = getStatesByCountry?.data?.getStatesByCountry.filter(
    (item) => item.id === state_id
  );

  let state = "";
  if (selectedState) {
    state = selectedState[0]?.state_name;
  }

  let selectedCity = getCityByState?.data?.getCitiesByState.filter(
    (city) => city.state_id === state_id
  );
  let cityName: any[] = [];
  if (selectedCity) {
    cityName = selectedCity?.filter((item) => item.id === city_id);
  }
  const profilePicture = userDetail?.patientProfile?.profileImage

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
            <LabelWithTextDiv label="País de nacimiento" value={countryName} />
            <LabelWithTextDiv label="Ciudad" value={cityName[0]?.city_name} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Estado" value={state} />
            <LabelWithTextDiv label="Código postal" value={zip_code} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="Dirección (calle y numero)"
              value={streetAddress}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Estado civil" value={maritalStatus} />
            <LabelWithTextDiv label="¿Tienes hijos?" value={children} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv
              label="¿Cuál es tu ocupación?"
              value={occupation}
            />
            <LabelWithTextDiv
              label="¿Tiene alguna exposición ocupacional?"
              value={occupationalExposure === "Yes" ? exposureDuration : "No"}
            />
          </div>
          <div className="md:flex gap-2">
            <LabelWithTextDiv label="¿Tiene mascotas?" value={pets} />
            <div className="w-full" />
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}

export default PatientProfileFormTab;
