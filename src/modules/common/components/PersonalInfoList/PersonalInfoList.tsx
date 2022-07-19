/* eslint-disable react/jsx-key */
import React from "react";
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
  } = userDetail || {};

  // console.log(userDetail, "userDetails");

  const [{ data }] = useCountriesQuery();
  const { countries } = data || {};
  console.log("useCountriesQuery6", data);

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
          <div className="w-1/2 sm:w-1/3 text-gray-1">First name</div>
          <div className="sm:w-1/2 text-secondary">{first_name}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Last name</div>
          <div className="sm:w-1/2 text-secondary">{last_name}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Gender</div>
          <div className="sm:w-1/2 text-secondary">{gender}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Date of birth</div>
          <div className="sm:w-1/2 text-secondary">
            {date_of_birth ? date.convertStringDateToUTC(date_of_birth) : "-"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Contact number</div>
          <div className="sm:w-1/2 text-secondary">{contact_number}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Email address</div>
          <div className="sm:w-1/2 text-secondary">{email}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Password</div>
          <div className="sm:w-1/2 text-secondary">
            <div className="sm:w-1/2 text-secondary">******</div>
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Country</div>
          <div className="sm:w-1/2 text-secondary">{countryName}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">State</div>
          <div className="sm:w-1/2 text-secondary">{state ? state : "-"}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">City</div>
          <div className="sm:w-1/2 text-secondary">
            {cityName[0]?.city_name ? cityName[0]?.city_name : "-"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Postal code</div>
          <div className="sm:w-1/2 text-secondary">{zip_code}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Street address</div>
          <div className="sm:w-1/2 text-secondary">{streetAddress}</div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Marital status</div>
          <div
            className={`sm:w-1/2 ${
              !patientProfile?.maritalStatus && "text-gray-1"
            }`}
          >
            {patientProfile?.maritalStatus || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">
            Do you have any children?
          </div>
          <div
            className={`sm:w-1/2 ${
              !patientProfile?.haveChildren && "text-gray-1"
            }`}
          >
            {patientProfile?.haveChildren || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">Number of children</div>
          <div
            className={`sm:w-1/2 ${!!patientProfile?.children && "text-black"}`}
          >
            {patientProfile?.children || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">
            What is your occupation?
          </div>
          <div
            className={`sm:w-1/2 ${
              !patientProfile?.occupation && "text-gray-1"
            }`}
          >
            {patientProfile?.occupation || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">
            Do you have any occupational exposure?
          </div>
          <div
            className={`sm:w-1/2 ${
              !patientProfile?.occupationalExposure && "text-gray-1"
            }`}
          >
            {patientProfile?.occupationalExposure || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">
            Do you have any occupational duration?
          </div>
          <div
            className={`sm:w-1/2 ${
              !patientProfile?.exposureDuration && "text-gray-1"
            }`}
          >
            {patientProfile?.exposureDuration || "N/A"}
          </div>
        </div>
      </li>

      <li>
        <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
          <div className="w-1/2 sm:w-1/3 text-gray-1">
            Do you have any pets?
          </div>
          <div className={`sm:w-1/2 ${!patientProfile?.pets && "text-gray-1"}`}>
            {patientProfile?.pets || "N/A"}
          </div>
        </div>
      </li>
    </ul>
  );
}
export default PersonalInfoList;
