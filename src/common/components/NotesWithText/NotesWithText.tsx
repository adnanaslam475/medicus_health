import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React from "react";
import AcronymWithText from "common/components/AcronymWithText/AcronymWithText";
import _classes from "./NotesWithText.module.scss";
import { Appointment } from "generated/graphql";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: [[string, string]];
};

function NotesWithText({ appointment, doctorNotes }: Props) {
  return (
    <>
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
      >
        <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
        {doctorNotes?.length &&
          doctorNotes
            ?.filter((val) => val[0] !== "__typename")
            .map((item) => {
              let char = item[0].split("")[0];
              return (
                <AcronymWithText
                  character={char.toUpperCase()}
                  word={item[0]}
                  sentence={item[1]}
                />
              );
            })}
      </CardWithProfileImageInfo>
    </>
  );
}

export default NotesWithText;
