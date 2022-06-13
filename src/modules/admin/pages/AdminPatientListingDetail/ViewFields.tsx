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

  return (
    <div className="max-w-[800px]">
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="First Name" value={first_name} />
        <LabelWithTextDiv label="Last Name" value={last_name} />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="Gender" value={gender} />
        <LabelWithTextDiv
          label="Date of birth"
          value={date_of_birth ?date?.formatMMMMDDYYYY(date_of_birth): "-"}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <LabelWithTextDiv label="Email Address" value={email} />
        <LabelWithTextDiv label="Cell Number" value={contact_number} />
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
          value={patientProfile?.occupationalExposure}
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
  );
};

export default ViewProfileFields;
