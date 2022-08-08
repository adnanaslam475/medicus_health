import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React, { useState, useEffect } from "react";
import _classes from "./EditableNotes.module.scss";
import {
  Appointment,
  GetDoctorNotesByAppIdQuery,
  useCreateOrUpdateAppointmentNoteMutation,
  useGetDoctorNotesByAppIdQuery,
  useRemoveAppointmentNoteMutation,
} from "generated/graphql";
import AcronymWithTextEditable from "../AcronymWithTextEditable/AcronymWithTextEditable";
import { Button, Form, notification, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import AcronymWithText from "../AcronymWithText/AcronymWithText";
import Router, { useRouter } from "next/router";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: GetDoctorNotesByAppIdQuery;
};

function EditableNotes() {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [localDocNotes, setlocalDocNotes] = useState();
  const [noteType, setNoteType] = useState("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [formInstance] = Form.useForm();

  const { query } = useRouter();
  function handleChange(value: string) {
    setNoteType(value);
  }

  // GET NOTES API CALL

  const [{ data: notesById }, executeGetDoctorNotesByAppIdQuery] =
    useGetDoctorNotesByAppIdQuery({
      variables: {
        id: Number(query?.id),
      },
      requestPolicy: "network-only",
    });

  const { appointment: currentNote } = notesById || {};
  const { id: noteId } = currentNote || {};

  // ADD NOTES API CALL

  const [{ data: notes, fetching }, createOrUpdateAppointmentNote] =
    useCreateOrUpdateAppointmentNoteMutation();

  const addNote = async (value: any) => {
    const res = await createOrUpdateAppointmentNote({
      createAppointmentNoteInput: {
        appointmentId: Number(query.id),
        isPublished: isPublish,
        subjective: value?.subjective || subjective,
        objective: value?.objective || objective,
        assessment: value?.assessment || assessment,
        plan: value?.plan || plan,
        note: value?.narrative || note,
        // noteType: "SOAP",
      },
    });
    if (res?.data?.createOrUpdateAppointmentNote.id) {
      notification.success({
        message: "Successfully Added",
      });
      setEdit(false);
      executeGetDoctorNotesByAppIdQuery({ requestPolicy: "network-only" });
    } else {
      notification.error({
        message: "Something went wrong",
      });
    }
  };

  // REMOVE NOTES API CALL

  const [{ fetching: RemoveFetching }, executeAppointmentNote] =
    useRemoveAppointmentNoteMutation();

  const deleteAppointmentNote = async () => {
    try {
      const response = await executeAppointmentNote({
        id: Number(noteId),
      });
      if (response?.error) {
        throw new Error(response?.error?.graphQLErrors[0]?.message);
      }
      if (response.data) {
        notification.success({
          message: "Note Delete Successfully",
        });
        Router.push(`/physician/appointments/upcoming`);
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something Went Wrong",
      });
    }
  };

  // FORM REFERENCE
  const { currentAppointmentNote } = notesById?.appointment || {};

  const { note, subjective, objective, assessment, plan } =
    currentAppointmentNote || {};

  useEffect(() => {
    formInstance.setFieldsValue({
      subjective,
      objective,
      assessment,
      plan,
      narrative: note,
    });
  }, [assessment, formInstance, note, objective, plan, subjective]);

  return (
    <>
      <h2>View Notes</h2>
      {/* <div className="flex mb-8 flex-col">
        <label className="">Select Notes Type</label>
        <Select
          className="mr-5"
          placeholder="Notes"
          onChange={handleChange}
          style={{ width: 200 }}
        >
          <Select.Option value="narrative">NARRATIVE</Select.Option>
          <Select.Option value="soap">SOAP</Select.Option>
        </Select>
      </div> */}
      <Form form={formInstance} onFinish={addNote}>
        {/* {noteType == "narrative" && (
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
        )} */}
        {/* {noteType == "soap" && ( */}
        <>
          <div className={`${_classes["narrative-cover"]} `}>
            <AcronymWithTextEditable
              editable={edit}
              character={"N"}
              word={"Narrative"}
              sentence={note || "No Details"}
            />
          </div>

          <div className="font-bold text-black my-3">SOAP</div>

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
        {/* )} */}

        {edit ? (
          <div className="flex justify-end gap-3">
            {/* <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => setOpen(true)}
              className="mt-2 border border-red"
            >
              Delete
            </Button> */}
            {/* Commented as per Feedback */}
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
            <Button className="mt-2" htmlType="submit" loading={fetching}>
              Save
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
            <Button
              className="mt-2"
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </Form>
      <ConfirmationModal
        visible={open}
        confirmLoading={RemoveFetching}
        onCancel={() => setOpen(false)}
        onOk={deleteAppointmentNote}
        message="Are you sure you want to delete this note?"
      />
    </>
  );
}

export default EditableNotes;
