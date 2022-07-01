import { notification } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Notes from "common/components/Notes/Notes";
import NotesListingByAppointments from "common/components/NotesListingByAppointments/NotesListingByAppointments";
import { getRole } from "common/utils/userData";
import {
  Appointment,
  AppointmentNote,
  GetAppointmentNoteByIdQuery,
  GetDoctorNotesByAppIdQuery,
  useCreateOrUpdateAppointmentNoteMutation,
  useDoctorAppointmentDetailAppointmentInfoQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentNoteByIdQuery,
  useGetAppointmentNotesByIdQuery,
  useGetDoctorNotesByAppIdQuery,
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
  const status = appointment?.status;
  const { patient, serviceType } = appointment || {};

  const appointmentId = Number(query.id);

  // GET NOTES API CALL

  const [{ data: notesByAppointmentId }, executeGetAppointmentNotesByIdQuery] =
    useGetAppointmentNotesByIdQuery({
      variables: {
        id: Number(query?.id),
      },
    });

  const appointmentChild = notesByAppointmentId;

  const actualDoctorNotes =
    appointmentChild?.appointment.currentAppointmentNote;

  console.log(appointmentChild, "actualDoctorNotesactualDoctorNotes");

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
      executeGetAppointmentNotesByIdQuery({ requestPolicy: "network-only" });
    } else {
      notification.error({
        message: "Something went wrong",
      });
    }
  };
  return (
    <div className="md:max-w-1/2">
      <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        serviceName={serviceType?.name}
        imageUrl={patient?.patientProfile?.profileImage}
      >
        {(getRole() === "Doctor" || getRole() === "Admin") && (
          <>
            {/* {!notesByAppointmentId && ( */}
            {/* {!actualDoctorNotes && ( */}
            <>
              <Notes
                onFinish={addNote}
                // disabled={actualDoctorNotes !== null}
              />
              <div className="mb-3"></div>
            </>
            {/* )} */}
          </>
        )}

        {actualDoctorNotes && (
          <NotesListingByAppointments
            doctorNotes={notesByAppointmentId as GetDoctorNotesByAppIdQuery}
          />
        )}

        {/* FOR PATIENT ONLY */}
        {getRole() === "User" &&
          (actualDoctorNotes ? (
            <NotesListingByAppointments
              doctorNotes={notesByAppointmentId as GetDoctorNotesByAppIdQuery}
            />
          ) : (
            <div className="div">No Published Notes Available</div>
          ))}

        {/* NotesListingByAppointments */}
      </CardWithProfileImageInfo>
    </div>
  );
}

export default NotesTab;
