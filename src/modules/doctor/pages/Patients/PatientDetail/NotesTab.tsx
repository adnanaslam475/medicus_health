import { notification } from "antd";
import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import Notes from "common/components/Notes/Notes";
import {
  useCreateOrUpdateAppointmentNoteMutation,
  useDoctorAppointmentDetailAppointmentInfoQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function NotesTab({}: Props) {
  const { query } = useRouter();

  const [{ data }] = useDoctorAppointmentDetailAppointmentInfoQuery({
    variables: {
      id: Number(query.appointmentId),
    },
    pause: !query.appointmentId,
  });

  const [{ data: note }, createOrUpdateAppointmentNote] =
    useCreateOrUpdateAppointmentNoteMutation();

  const { appointment } = data || {};
  const { patient, serviceType } = appointment || {};

  const addNote = async (value: any, closeModal: () => void) => {
    console.log("value2333333", value);
    await createOrUpdateAppointmentNote({
      createAppointmentNoteInput: {
        appointmentId: Number(query.appointmentId),
        isPublished: false,
        subjective: value?.subjective,
        objective: value?.objective,
        assessment: value?.assessment,
        plan: value?.plan,
        note: value?.note,
        noteType: "SOAP",
      },
    });
    if (note?.createOrUpdateAppointmentNote.id) {
      closeModal();
      notification.success({
        message: "Successfully Added",
      });
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
        <Notes onFinish={addNote} />
      </CardWithProfileImageInfo>
    </div>
  );
}

export default NotesTab;
