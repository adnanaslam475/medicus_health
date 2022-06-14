import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React, { useState } from "react";
import _classes from "./NotesWithText.module.scss";
import {
  Appointment,
  AppointmentNote,
  GetAppointmentNoteByIdQuery,
} from "generated/graphql";
import AcronymWithTextEditable from "../AcronymWithTextEditable/AcronymWithTextEditable";
import { Button, Form, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import AcronymWithText from "../AcronymWithText/AcronymWithText";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: GetAppointmentNoteByIdQuery | undefined;
};

function EditableNotes({ appointment, doctorNotes }: Props) {
  const [edit, setEdit] = useState(false);
  const [localDocNotes, setlocalDocNotes] = useState(null);
  const [noteType, setNoteType] = useState("");
  function handleChange(value: string) {
    setNoteType(value);

    console.log(localDocNotes, "localDocNotes");
  }

  const { appointmentNote } = doctorNotes || {};

  // console.log(appointmentNote, "appointmentNoteappointmentNote");

  console.log({ doctorNotes }, "SOAR");
  console.log(doctorNotes, "appointmentNote");

  const { note, subjective, objective, assessment, plan } =
    appointmentNote || {};

  return (
    <>
      {/* <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
      > */}
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

              {/* <AcronymWithTextEditable
                  character={char.toUpperCase()}
                  editable={edit}
                  word={item[0]}
                  sentence={item[1]}
                /> */}
            </>
          )}
        </>
      )}
      {noteType == "soap" && (
        <>
          <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
          {
            <>
              {/* {!edit ? (
                        <AcronymWithTextEditable
                          character={char.toUpperCase()}
                          editable={edit}
                          word={item[0]}
                          sentence={item[1]}
                        />
                      ) : (
                        <AcronymWithText
                          character={char.toUpperCase()}
                          word={item[0]}
                          sentence={item[1]}
                        />
                      )} */}
              {/* {
                      <AcronymWithTextEditable
                        character={char.toUpperCase()}
                        editable={edit}
                        word={item[0]}
                        sentence={item[1]}
                      />
                    } */}
              {/* ======================= */}
              {/* <AcronymWithText
                character={"S"}
                word={"Subjective"}
                sentence={subjective}
              />
              <AcronymWithText
                character={"O"}
                word={"Objective"}
                sentence={objective}
              />
              <AcronymWithText
                character={"A"}
                word={"Assessment"}
                sentence={assessment}
              />
              <AcronymWithText character={"P"} word={"Plan"} sentence={plan} /> */}
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
      {/* </CardWithProfileImageInfo> */}
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
        <div className="flex justify-end">
          <Button
            className="mt-2"
            onClick={() => {
              setEdit(true);
            }}
          >
            Save
          </Button>
        </div>
      )}
    </>
  );
}

export default EditableNotes;
