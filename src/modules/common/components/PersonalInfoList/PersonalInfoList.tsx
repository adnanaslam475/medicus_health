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
              <div className="md:w-1/2 text-gray-1">First Name</div>
              <div className="md:w-1/2 text-secondary">{first_name}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Last Name</div>
              <div className="md:w-1/2 text-secondary">{last_name}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Gender</div>
              <div className="md:w-1/2 text-secondary">{gender}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Date of Birth</div>
              <div className="md:w-1/2 text-secondary">
                {date.convertStringDateToUTC(date_of_birth)}
              </div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Contact Number</div>
              <div className="md:w-1/2 text-secondary">{contact_number}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Email Address</div>
              <div className="md:w-1/2 text-secondary">{email}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Password</div>
              <div className="md:w-1/2 text-secondary">
                <div className="md:w-1/2 text-secondary">******</div>
              </div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Country</div>
              <div className="md:w-1/2 text-secondary">{countryName}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">State</div>
              <div className="md:w-1/2 text-secondary">{state}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">City</div>
              <div className="md:w-1/2 text-secondary">
                {cityName[0]?.city_name}
              </div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Postal Code</div>
              <div className="md:w-1/2 text-secondary">{zip_code}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Street Address</div>
              <div className="md:w-1/2 text-secondary">{streetAddress}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Marital Status</div>
              <div className="md:w-1/2">{patientProfile?.maritalStatus}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Do you have any children?</div>
              <div className="md:w-1/2">{patientProfile?.children}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">What is your Occupation?</div>
              <div className="md:w-1/2">{patientProfile?.occupation}</div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">
                Do you have any Occupational Exposure?
              </div>
              <div className="md:w-1/2">
                {patientProfile?.occupationalExposure}
              </div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">
                Do you have any Occupational Duration?
              </div>
              <div className="md:w-1/2">
                {patientProfile?.exposureDuration}
              </div>
            </div>
          </li>

          <li>
            <div className="flex-none sm:flex w-full border-b border-gray-5 p-4">
              <div className="md:w-1/2 text-gray-1">Do you have any pets?</div>
              <div className="md:w-1/2">{patientProfile?.pets}</div>
            </div>
          </li>
      </ul>
  );
}
export default PersonalInfoList;
