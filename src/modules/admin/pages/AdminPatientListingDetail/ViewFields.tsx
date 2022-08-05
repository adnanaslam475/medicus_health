import React from "react";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import { date } from "common/utils";
import { User } from "generated/graphql";

type Props = {
  data: User | undefined;
  country_name: string | undefined;
  state_name: string | undefined;
  city_name: string | undefined;
};
const ViewProfileFields = ({
  data,
  country_name,
  state_name,
  city_name,
}: Props) => {
  const {
    first_name,
    last_name,
    gender,
    // city_name,
    date_of_birth,
    contact_number,
    patientProfile,
    email,

    // country_name,
  } = data || {};
  let childrenCount = patientProfile?.children && patientProfile?.children > 0;
  const showExposureDuration =
    patientProfile?.occupationalExposure === "Yes" ? true : false;

  const userGender = gender
    ? `${gender?.charAt(0)?.toUpperCase()}${gender?.slice(1)}`
    : "";
  return (
    <div className="max-w-[800px]">
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="Nombre" value={first_name} />
        <LabelWithTextDiv label="Apellido" value={last_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="Género" value={userGender} />
        <LabelWithTextDiv
          label="Fecha de nacimiento"
          value={
            date_of_birth ? date?.convertStringDateToUTC(date_of_birth) : "-"
          }
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="Dirección de correo electrónico"
          value={email}
        />
        <LabelWithTextDiv label="Numero de celular" value={contact_number} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="CounPaís de nacimientotry"
          value={country_name}
        />
        <LabelWithTextDiv label="Ciudad" value={city_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="Estado" value={state_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="Estado civil"
          value={patientProfile?.maritalStatus}
        />
        <LabelWithTextDiv
          label="¿Tienes hijos?"
          value={patientProfile?.haveChildren}
        />
        {!!childrenCount && (
          <LabelWithTextDiv
            label="Numero de niños"
            value={patientProfile?.children}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="¿Cuál es tu ocupación?"
          value={patientProfile?.occupation}
        />
        <LabelWithTextDiv
          label="¿Tiene alguna exposición ocupacional?"
          value={patientProfile?.occupationalExposure}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {showExposureDuration && (
          <LabelWithTextDiv
            label="¿Tiene alguna duración ocupacional?"
            value={patientProfile?.exposureDuration}
          />
        )}
        <LabelWithTextDiv
          label="¿Tiene mascotas?"
          value={patientProfile?.pets}
        />
        {!showExposureDuration && <div className="w-full" />}
      </div>
    </div>
  );
};

export default ViewProfileFields;
