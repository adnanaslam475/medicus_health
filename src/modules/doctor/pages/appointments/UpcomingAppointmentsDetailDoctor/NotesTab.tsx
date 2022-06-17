import { notification } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Notes from "common/components/Notes/Notes";
import NotesListingByAppointments from "common/components/NotesListingByAppointments/NotesListingByAppointments";
import {
  Appointment,
  AppointmentNote,
  GetAppointmentNoteByIdQuery,
  useCreateOrUpdateAppointmentNoteMutation,
  useDoctorAppointmentDetailAppointmentInfoQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentNoteByIdQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function NotesTab({}: Props) {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailAppointmentInfoQuery({
    variables: {
      id: Number(query.id),
    },
    pause: !query.id,
  });

  const [{ data: note }, createOrUpdateAppointmentNote] =
    useCreateOrUpdateAppointmentNoteMutation();

  const { appointment } = data || {};
  const { patient, serviceType } = appointment || {};

  console.log({ data });

  // GET NOTES API CALL

  const appointmentId = Number(query.id);

  const [{ data: notesById }, executeGetAppointmentNoteByIdQuery] =
    useGetAppointmentNoteByIdQuery({
      variables: {
        appointmentId,
      },
    });

  console.log(notesById, "notesById");

  const addNote = async (value: any, closeModal: () => void) => {
    console.log({ value });
    const res = await createOrUpdateAppointmentNote({
      createAppointmentNoteInput: {
        appointmentId: Number(query.id),
        isPublished: false,
        subjective: value?.subjective || "",
        objective: value?.objective || "",
        assessment: value?.assessment || "",
        plan: value?.plan || "",
        note: value?.note || "",
        // noteType: "SOAP",
      },
    });
    if (res?.data?.createOrUpdateAppointmentNote.id) {
      closeModal();
      notification.success({
        message: "Successfully Added",
      });
      executeGetAppointmentNoteByIdQuery({ requestPolicy: "network-only" });
    } else {
      notification.error({
        message: "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-1/2">
      <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        serviceName={serviceType?.name}
      >
        <Notes onFinish={addNote} disabled={notesById !== null} />
        <div className="mb-3"></div>
        {notesById && (
          <NotesListingByAppointments
            doctorNotes={notesById as GetAppointmentNoteByIdQuery}
          />
        )}
      </CardWithProfileImageInfo>
    </div>
  );
}

export default NotesTab;
