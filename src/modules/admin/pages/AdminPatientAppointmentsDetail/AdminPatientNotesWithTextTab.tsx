import React from "react";
import NotesWithText from "common/components/NotesWithText/NotesWithText";
import { Appointment } from "generated/graphql";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: [[string, string]];
};

function AdminPatientNotesWithTextTab({ appointment, doctorNotes }: Props) {
  return (
    <div className="max-w-1/2">
      <NotesWithText appointment={appointment} doctorNotes={doctorNotes} />
    </div>
  );
}

export default AdminPatientNotesWithTextTab;
