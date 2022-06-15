import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React, { useState } from "react";
import _classes from "./NotesWithText.module.scss";
import {
  Appointment,
  AppointmentNote,
  GetAppointmentNoteByIdQuery,
  useCreateOrUpdateAppointmentNoteMutation,
} from "generated/graphql";
import AcronymWithTextEditable from "../AcronymWithTextEditable/AcronymWithTextEditable";
import { Button, Form, notification, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import AcronymWithText from "../AcronymWithText/AcronymWithText";
import { useRouter } from "next/router";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: GetAppointmentNoteByIdQuery | undefined;
};

function EditableNotes({ doctorNotes }: Props) {
  const [edit, setEdit] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [localDocNotes, setlocalDocNotes] = useState();
  const [noteType, setNoteType] = useState("");
  const { query } = useRouter();
  function handleChange(value: string) {
    setNoteType(value);
  }

  const { appointmentNote } = doctorNotes || {};

  const { note, subjective, objective, assessment, plan } =
    appointmentNote || {};

  const [{ data: notes }, createOrUpdateAppointmentNote] =
    useCreateOrUpdateAppointmentNoteMutation();

  console.log(notes, "notesnotesnotesnotes");

  const addNote = async (value: any) => {
    console.log({ value });
    const res = await createOrUpdateAppointmentNote({
      createAppointmentNoteInput: {
        appointmentId: Number(query.id),
        isPublished: isPublish,
        subjective: value?.subjective || "",
        objective: value?.objective || "",
        assessment: value?.assessment || "",
        plan: value?.plan || "",
        note: value?.note || "",
        // noteType: "SOAP",
      },
    });
    if (res?.data?.createOrUpdateAppointmentNote.id) {
      notification.success({
        message: "Successfully Added",
      });
      setEdit(true);
    } else {
      notification.error({
        message: "Something went wrong",
      });
    }
  };

  return (
    <>
      <h2>View Notes</h2>
      <div className="flex mb-8 flex-col">
        <label className="">Select Notes Type</label>
        <Select
          className="mr-5"
          placeholder="Notes"
          onChange={handleChange}
          style={{ width: 200 }}
        >
          <Select.Option value="soap">SOAP</Select.Option>
          <Select.Option value="narrative">NARRATIVE</Select.Option>
        </Select>
      </div>
      <Form onFinish={addNote}>
        {noteType == "narrative" && (
          <>
            <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">NARRATIVE</h4>
            {!edit ? (
              <Form.Item name="note">
                <TextArea defaultValue={note || "No Details"} />
              </Form.Item>
            ) : (
              <>
                <AcronymWithText
                  character={"N"}
                  word={"NOTE"}
                  sentence={note || "No Details"}
                />
              </>
            )}
          </>
        )}
        {noteType == "soap" && (
          <>
            <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
            {
              <>
                <AcronymWithTextEditable
                  editable={edit}
                  character={"S"}
                  word={"Subjective"}
                  sentence={subjective || "No Details"}
                />

                <AcronymWithTextEditable
                  editable={edit}
                  character={"O"}
                  word={"Objective"}
                  sentence={objective || "No Details"}
                />

                <AcronymWithTextEditable
                  editable={edit}
                  character={"A"}
                  word={"Assessment"}
                  sentence={assessment || "No Details"}
                />

                <AcronymWithTextEditable
                  editable={edit}
                  character={"P"}
                  word={"Plan"}
                  sentence={plan || "No Details"}
                />
              </>
            }
          </>
        )}

        {edit ? (
          <div className="flex justify-end">
            <Button
              className="mt-2"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            <Button
              type="primary"
              className="mt-2"
              htmlType="submit"
              onClick={() => {
                setIsPublish(true);
              }}
            >
              Publish Notes
            </Button>
            <Button className="mt-2" htmlType="submit">
              Save
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}

export default EditableNotes;
