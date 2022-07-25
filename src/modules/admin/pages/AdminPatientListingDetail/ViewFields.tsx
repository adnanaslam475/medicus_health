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
        <LabelWithTextDiv label="First name" value={first_name} />
        <LabelWithTextDiv label="Last name" value={last_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="Gender"
          value={userGender}
        />
        <LabelWithTextDiv
          label="Date of birth"
          value={
            date_of_birth ? date?.convertStringDateToUTC(date_of_birth) : "-"
          }
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
        <LabelWithTextDiv label="State" value={state_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="Marital status"
          value={patientProfile?.maritalStatus}
        />
        <LabelWithTextDiv
          label="Do you have any children?"
          value={patientProfile?.haveChildren}
        />
        {!!childrenCount && (
          <LabelWithTextDiv
            label="Number of childrens"
            value={patientProfile?.children}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv
          label="What is your occupation?"
          value={patientProfile?.occupation}
        />
        <LabelWithTextDiv
          label="Do you have any occupational exposure?"
          value={patientProfile?.occupationalExposure}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {showExposureDuration && (
          <LabelWithTextDiv
            label="Do you have any occupational duration?"
            value={patientProfile?.exposureDuration}
          />
        )}
        <LabelWithTextDiv
          label="Do you have any pets?"
          value={patientProfile?.pets}
        />
        {!showExposureDuration && <div className="w-full" />}
      </div>
    </div>
  );
};

export default ViewProfileFields;
