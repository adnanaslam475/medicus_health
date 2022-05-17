/* eslint-disable react/jsx-key */
import React from "react";
import LabelWithTextDiv from "common/components/LabelWithTextDiv/LabelWithTextDiv";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";

const props = {};
function PatientProfileFormTab() {
  return (
    <CardWithProfileImageInfo
    name="usama"
    serviceName="consultation"
  >
    <div className="max-w-[800px]">

    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="First Name" value="usama" />
      <LabelWithTextDiv label="Last Name" value="khan" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Gender" value="male" />
      <LabelWithTextDiv
        label="Date of birth"
        value="10 march"
      />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Email Address" value="uhk@gmail.com" />
      <LabelWithTextDiv label="Cell Number" value="2987213613821" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Country" value="pak" />
      <LabelWithTextDiv label="City" value="karachi" />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv label="Material Status" value="single" />
      <LabelWithTextDiv
        label="Do you have any Children?"
        value="no"
      />
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <LabelWithTextDiv
        label="What is your Occupation?"
        value="doctor"
      />
      <LabelWithTextDiv
        label="Do you have any Occupational Exposure?"
        value="sdas"
      />
    </div>
    <div className="flex gap-2">
      <LabelWithTextDiv label="Do you have any pets?" value="dasds" />
      <div className="w-full" />
    </div>
  </div>
  </CardWithProfileImageInfo>
  );
}

export default PatientProfileFormTab;
