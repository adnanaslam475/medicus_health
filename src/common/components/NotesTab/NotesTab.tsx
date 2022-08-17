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
import React, { useEffect, useState } from "react";
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
  const [isRoleGuard, setRoleGuard] = useState<boolean>(false);

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
  const { first_name, last_name } = appointment?.doctor || {};
  const doctorProfilePic = appointment?.doctor?.doctorProfile?.profile_image;
  const doctorSpecialization =
    appointment?.doctor?.doctorProfile?.specialization;
  let formatedDoctorFirstName = `${
    first_name?.includes("Dr.") ? first_name : `Dr. ${first_name}`
  }`;

  useEffect(() => {
    if (getRole() === "User") {
      setRoleGuard(true);
    } else {
      setRoleGuard(false);
    }
  }, []);

  return fetching ? (
    <div className="lg:w-1/3 sm:w-full flex justify-center py-20 mr-5">
      <Spin />
    </div>
  ) : (
    <div className="md:max-w-1/2">
      {/* <CardWithProfileImageInfo
        name={
          isRoleGuard
            ? `${formatedDoctorFirstName} ${last_name?.toLocaleLowerCase()}`
            : `${patient?.first_name} ${patient?.last_name}`
        }
        serviceName={isRoleGuard ? `${doctorSpecialization}` : null}
        imageUrl={
          isRoleGuard
            ? doctorProfilePic
            : appointment?.patient?.patientProfile?.profileImage
        }
      > */}
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
            {actualDoctorNotes ? (
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
              )
            ) : (
              <>
                Notes for this appointment have not been published by physician
                yet.
              </>
            )}
            {/* {!actualDoctorNotes ? (
              status === "Confirmed" || status === "Requested"
            ) : (
            )} */}
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
      {/* </CardWithProfileImageInfo> */}
    </div>
  );
}

export default NotesTab;
