import { notification, Spin } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Notes from "common/components/Notes/Notes";
import NotesListingByAppointments from "common/components/NotesListingByAppointments/NotesListingByAppointments";
import { getRole } from "common/utils/userData";
import {
  Appointment,
  AppointmentNote,
  GetDoctorNotesByAppIdQuery,
  useCreateOrUpdateAppointmentNoteMutation,
  useDoctorAppointmentDetailAppointmentInfoQuery,
  useGetAppointmentNotesByIdQuery,
  useGetDoctorNotesByAppIdQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import NotesHistory from "../NotesHistoryNotes/NotesHistory";

type Props = {
  // onFinish?: (values: any, setModalVisible: () => void) => void;
  // onChange?: () => void;
  // status: string | null | undefined;
};

function NotesTab({}: Props) {
  const { query } = useRouter();

  const [{ data, fetching }] = useDoctorAppointmentDetailAppointmentInfoQuery({
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

  // GET HISTORY NOTES

  const historyNotes = appointmentChild?.appointment.notesHistory;

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
        message: "Successfully added",
      });
      executeGetAppointmentNotesByIdQuery({ requestPolicy: "network-only" });
    } else {
      notification.error({
        message: "Something went wrong",
      });
    }
  };
  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="md:max-w-1/2">
      <CardWithProfileImageInfo
        name={`${patient?.first_name} ${patient?.last_name}`}
        // serviceName={serviceType?.name}
        imageUrl={patient?.patientProfile?.profileImage}
      >
        {(getRole() === "Doctor" || getRole() === "Admin") && (
          <>
            {/* {!notesByAppointmentId && ( */}
            {!actualDoctorNotes && (
              <>
                {(status === "!Requested" ||
                  status === "Completed" ||
                  status === "!Cancel" ||
                  status === "Confirmed") && (
                  <>
                    <Notes
                      onFinish={addNote}
                      // disabled={actualDoctorNotes !== null}
                    />
                    <div className="mb-3"></div>
                  </>
                )}
              </>
            )}
          </>
        )}

        <>
          <div className="my-3">
            {actualDoctorNotes &&
              (status === "Confirmed" ||
                status === "Requested" ||
                status === "Completed") && (
                <>
                  <h3>Current appointment notes</h3>
                  <NotesListingByAppointments
                    doctorNotes={
                      notesByAppointmentId as GetDoctorNotesByAppIdQuery
                    }
                  />
                </>
              )}
            {!actualDoctorNotes ? (
              status === "Confirmed" || status === "Requested"
            ) : (
              <>No current appointment notes available.</>
            )}
          </div>
        </>
        {/* FOR PATIENT ONLY */}
        {/* {getRole() === "User" &&
          (actualDoctorNotes ? (
            <NotesListingByAppointments
              doctorNotes={notesByAppointmentId as GetDoctorNotesByAppIdQuery}
            />
          ) : (
            <div className="div">No Published Notes Available</div>
          ))} */}
        {/* HISTORY NOTES */}
        <div className="history-notes-cover">
          <h3>Notes history</h3>
          <NotesHistory />
        </div>
      </CardWithProfileImageInfo>
    </div>
  );
}

export default NotesTab;
