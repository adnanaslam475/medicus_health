import React from "react";
import NotesWithText from "common/components/NotesWithText/NotesWithText";
import { Appointment, AppointmentNote } from "generated/graphql";
import { Spin } from "antd";
import EditableNotes from "common/components/EditableNotes/EditableNotes";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: [[string, string]];
  loading?: boolean;
};

function AdminPhysicianNotesWithTextTab({
  appointment,
  doctorNotes,
  loading,
}: Props) {
  return loading ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="max-w-1/2">
      <EditableNotes />
    </div>
  );
}

export default AdminPhysicianNotesWithTextTab;
