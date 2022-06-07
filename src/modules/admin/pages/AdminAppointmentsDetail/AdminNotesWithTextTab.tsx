import React from "react";
// import NotesWithText from "common/components/NotesWithText/NotesWithText";
import { Appointment, AppointmentNote } from "generated/graphql";
import NotesWithTextEditable from "common/components/NotesWithTextEditable/NotesWithTextEditable";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: [[string, string]];
};

function AdminNotesWithTextTab({ appointment, doctorNotes }: Props) {
  return (
    <div className="max-w-1/2">
      <NotesWithTextEditable appointment={appointment} doctorNotes={doctorNotes} />
    </div>
  );
}

export default AdminNotesWithTextTab;
