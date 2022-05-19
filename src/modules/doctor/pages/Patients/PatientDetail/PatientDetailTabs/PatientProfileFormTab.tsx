/* eslint-disable react/jsx-key */
import React from "react";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
// import { date } from "./../../../../../../utils/DayPicker";
import {
  useCountriesQuery,
  useGetCitiesByStateQuery,
  useGetStatesByCountryQuery,
  User,
} from "../../../../../../generated/graphql";
// const props = {};
type Props = {
  userDetail?: User | undefined;
};
function PatientProfileFormTab({ userDetail }: { userDetail: any }) {
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

  console.log(userDetail, "userDetail");

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
    <CardWithProfileImageInfo name="usama" serviceName="consultation">
      <div className="max-w-[800px]">
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="First Name" value={first_name} />
          <LabelWithTextDiv label="Last Name" value={last_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Gender" value={gender} />
          <LabelWithTextDiv label="Date of birth" value={date_of_birth} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Email Address" value={email} />
          <LabelWithTextDiv label="Cell Number" value={contact_number} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv label="Country" value={countryName} />
          <LabelWithTextDiv label="City" value={cityName[0]?.city_name} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="Marital Status"
            value={patientProfile?.maritalStatus}
          />
          <LabelWithTextDiv
            label="Do you have any Children?"
            value={patientProfile?.children}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <LabelWithTextDiv
            label="What is your Occupation?"
            value={patientProfile?.occupation}
          />
          <LabelWithTextDiv
            label="Do you have any Occupational Exposure?"
            value={`${patientProfile?.occupationalExposure} ${patientProfile?.exposureDuration}`}
          />
        </div>
        <div className="flex gap-2">
          <LabelWithTextDiv
            label="Do you have any pets?"
            value={patientProfile?.pets}
          />
          <div className="w-full" />
        </div>
      </div>
    </CardWithProfileImageInfo>
  );
}

export default PatientProfileFormTab;
