import React, { useState } from "react";
import _classes from "./NotesWithText.module.scss";
import {
  Appointment,
  GetDoctorNotesByAppIdQuery,
  useGetAppointmentNotesByIdQuery,
  useGetDoctorNotesByAppIdQuery,
} from "generated/graphql";
import AcronymWithText from "../AcronymWithText/AcronymWithText";
import Router, { useRouter } from "next/router";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: GetDoctorNotesByAppIdQuery | undefined;
};

function ViewableNotes({ doctorNotes }: Props) {
  const [isPublish, setIsPublish] = useState(false);
  const [noteType, setNoteType] = useState("");

  const { query } = useRouter();
  function handleChange(value: string) {
    setNoteType(value);
  }

  // const [{ data: notesByAppointmentId }] = useGetDoctorNotesByAppIdQuery({
  //   variables: {
  //     id: Number(query?.id),
  //   },
  // });

  const [{ data: notesByAppointmentId }, executeGetAppointmentNotesByIdQuery] =
    useGetAppointmentNotesByIdQuery({
      variables: {
        id: Number(query?.id),
      },
    });
  console.log(notesByAppointmentId, "notesByAppointmentIdnotesByAppointmentId");

  const { currentAppointmentNote } = notesByAppointmentId?.appointment || {};
  const { isPublished } = currentAppointmentNote || {};

  const { note, subjective, objective, assessment, plan } =
    currentAppointmentNote || {};

  // const status = appointment?.status;

  return (
    <>
      <h2>Patient Notes</h2>
      {isPublished ? (
        <>
          <AcronymWithText
            character={"A"}
            word={"Assessment"}
            sentence={assessment || "No Details"}
          />
          <AcronymWithText
            character={"P"}
            word={"Plan"}
            sentence={plan || "No Details"}
          />
        </>
      ) : (
        <div>No Published Notes Available</div>
      )}
    </>
  );
}

export default ViewableNotes;
