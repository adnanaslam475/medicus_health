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

  const doctorFirstName = loggedinDoctorDetails?.first_name || "";
  const doctorProfilePicture =
    loggedinDoctorDetails?.doctorProfile?.profile_image || "";
  const doctorSpecialization =
    loggedinDoctorDetails?.doctorProfile?.specialization || "";

  return (
    <div className="max-w-[800px]">
      <CardWithProfileImageInfo
        name={doctorFirstName}
        serviceName={String(doctorSpecialization)}
        imageUrl={doctorProfilePicture}
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
            <LabelWithTextDiv label="First name" value={first_name} />
            <LabelWithTextDiv label="Last name" value={last_name} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Gender" value={gender} />
            <LabelWithTextDiv label="Date of birth" value={date_of_birth} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Email address" value={email} />
            <LabelWithTextDiv label="Cell number" value={contact_number} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Country" value={countryName} />
            <LabelWithTextDiv label="City" value={cityName[0]?.city_name} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="State" value={state} />
            <LabelWithTextDiv label="Postal code" value={zip_code} />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <LabelWithTextDiv label="Street address" value={streetAddress} />
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
              value={exposureDuration}
            />
          </div>
          <div className="md:flex gap-2">
            <LabelWithTextDiv label="Do you have any pets?" value={pets} />
            <div className="w-full" />
          </div>
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}

export default PatientProfileFormTab;
