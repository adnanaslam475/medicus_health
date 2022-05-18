import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React from "react";
import AcronymWithText from "common/components/AcronymWithText/AcronymWithText";
import _classes from "./NotesWithText.module.scss";
import { usePhysicianAppointmentsHistoryQuery } from "generated/graphql";
import { useRouter } from "next/router";

function Notes() {
  const { query } = useRouter();

  const [{ data }] = usePhysicianAppointmentsHistoryQuery({
    variables: {
      filter: { searchPatient: String(query?.id), status: "Completed" },
    },
  });
  const { appointments } = data || {};
  const appointment = appointments && appointments[0];

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);
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

export default Notes;
