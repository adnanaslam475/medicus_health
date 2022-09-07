/* eslint-disable react/jsx-key */
import { useTranslations } from "next-intl";
import React from "react";
import { timezoneLabel } from "utils/helper";
import { date } from "../../../../common/utils";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  User,
} from "../../../../generated/graphql";

type Props = {
  userDetail: User | undefined;
};

function PersonalInfoList({ userDetail }: { userDetail: any }) {
  const t = useTranslations("PersonalInfo");
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_number,
    email,
    password,
    country_id,
    state_id,
    city_id,
    zip_code,
    streetAddress,
    patientProfile,
    timeZone,
  } = userDetail || {};

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

  return (
    <ul className="custom-list mt-4 border border-gray-5 px-0 rounded custom-list-items">
      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Nombre</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{first_name}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Apellido</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{last_name}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Género</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{gender}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Fecha de nacimiento
          </div>
          <div className="sm:w-1/2 text-secondary md:pl-4">
            {date_of_birth ? date.convertStringDateToUTC(date_of_birth) : "-"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Teléfono de contacto #
          </div>
          <div className="sm:w-1/2 text-secondary md:pl-4">
            {`+${contact_number}`}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Dirección de correo electrónico
          </div>
          <div className="sm:w-1/2 text-secondary md:pl-4 break-normal break-all">
            {email}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Contraseña</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">
            <div className="sm:w-1/2 text-secondary ">******</div>
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Pais</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{countryName}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Estado</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">
            {state ? state : "-"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">Ciudad</div>
          <div className="sm:w-1/2 text-secondary md:pl-4">
            {cityName[0]?.city_name ? cityName[0]?.city_name : "-"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Código postal
          </div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{zip_code}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1  md:pl-4">
            Zona horaria
          </div>
          <div className="sm:w-1/2 text-secondary  md:pl-4">
            {/* {timezoneLabel(timeZone?.timeZone)} */}
            {timeZone?.timeZoneName}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1  md:pl-4">
            Dirección (calle y numero)
          </div>
          <div className="sm:w-1/2 text-secondary md:pl-4">{streetAddress}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Estado civil
          </div>
          <div
            className={`sm:w-1/2 md:pl-4 ${
              !patientProfile?.maritalStatus && "text-gray-1 md:pl-4"
            }`}
          >
            {patientProfile?.maritalStatus || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            ¿Tienes hijos?
          </div>
          <div
            className={`sm:w-1/2 md:pl-4 ${
              !patientProfile?.haveChildren && "text-gray-1"
            }`}
          >
            {patientProfile?.haveChildren
              ? t(patientProfile?.haveChildren)
              : "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            Numero de niños
          </div>
          <div
            className={`sm:w-1/2 md:pl-4  ${
              !patientProfile?.children && "text-gray-1"
            }`}
          >
            {/* {patientProfile?.children ? patientProfile?.children : "N/A"} */}
            {patientProfile?.children || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            ¿Cuál es tu ocupación?
          </div>
          <div
            className={`sm:w-1/2 md:pl-4 ${
              !patientProfile?.occupation && "text-gray-1 md:pl-4"
            }`}
          >
            {patientProfile?.occupation || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            ¿Tiene alguna exposición ocupacional?
          </div>
          <div
            className={`sm:w-1/2 md:pl-4 ${
              !patientProfile?.occupationalExposure && "text-gray-1 md:pl-4"
            }`}
          >
            {patientProfile?.haveChildren
              ? t(patientProfile?.occupationalExposure)
              : "N/A"}
          </div>
        </div>
      </li>

      {patientProfile?.occupationalExposure === "Yes" && (
        <li>
          <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
            <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
              {/* Do you have any occupational duration? */}
              ¿Tiene alguna duración ocupacional?
            </div>
            <div
              className={`sm:w-1/2 md:pl-4 ${
                !patientProfile?.exposureDuration && "text-gray-1"
              }`}
            >
              {patientProfile?.exposureDuration}
            </div>
          </div>
        </li>
      )}

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-full sm:w-1/3 text-gray-1 md:pl-4">
            {/* Do you have any pets? */}
            ¿Tiene mascotas?
          </div>
          <div
            className={`sm:w-1/2 md:pl-4 ${
              !patientProfile?.pets && "text-gray-1"
            }`}
          >
            {patientProfile?.pets || "N/A"}
          </div>
        </div>
      </li>
    </ul>
  );
}
export default PersonalInfoList;
