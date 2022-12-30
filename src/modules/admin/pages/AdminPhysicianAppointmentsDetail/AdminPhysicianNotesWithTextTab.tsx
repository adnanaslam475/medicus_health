import React from "react";
import { Appointment } from "generated/graphql";
import { Spin } from "antd";
import NotesTab from "common/components/NotesTab/NotesTab";

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
    <div className="">
      <NotesTab />
    </div>
  );
}

export default AdminPhysicianNotesWithTextTab;
