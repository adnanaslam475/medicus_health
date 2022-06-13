import CardWithProfileImageInfo from "common/components/CardWithProfileImageInfo/CardWithProfileImageInfo";
import React, { useState } from "react";
import _classes from "./NotesWithText.module.scss";
import { Appointment } from "generated/graphql";
import AcronymWithTextEditable from "../AcronymWithTextEditable/AcronymWithTextEditable";
import { Button, Form, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import AcronymWithText from "../AcronymWithText/AcronymWithText";

type Props = {
  appointment?: Appointment | undefined;
  doctorNotes?: [[string, string]];
};

function NotesWithTextEditable({ appointment, doctorNotes }: Props) {
  const [edit, setEdit] = useState(false);
  const [localDocNotes, setlocalDocNotes] = useState<
    [string, string][] | undefined
  >([]);
  const [noteType, setNoteType] = useState("");
  function handleChange(value: string) {
    setNoteType(value);
    if (noteType === "narrative") {
      setlocalDocNotes(doctorNotes?.slice(3, 7));
    } else if (noteType === "soap") {
      setlocalDocNotes(doctorNotes?.filter((note) => note[0] === "note"));
    }

    console.log(localDocNotes, "localDocNotes");
  }

  console.log(doctorNotes?.slice(3, 7), "doctorNotesdoctorNotes");
  return (
    <>
      <CardWithProfileImageInfo
        name={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
        serviceName={appointment?.serviceType?.name}
      >
        <h2>Add Note</h2>
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
                <TextArea />
              </Form.Item>
            ) : (
              localDocNotes?.length &&
              localDocNotes
                ?.filter((val) => val[0] !== "__typename")
                .map((item) => {
                  let char = item[0].split("")[0];
                  // console.log(char, "Sss");
                  return (
                    <>
                      <AcronymWithText
                        character={char.toUpperCase()}
                        word={item[0]}
                        sentence={item[1]}
                      />
                      {/* <AcronymWithTextEditable
                          character={char.toUpperCase()}
                          editable={edit}
                          word={item[0]}
                          sentence={item[1]}
                        /> */}
                    </>
                  );
                })
            )}
          </>
        )}
        {noteType == "soap" && (
          <>
            <h4 className="pb-0 mb-0  pt-4 text-lightBlue-1">SOAP</h4>
            {localDocNotes?.length &&
              localDocNotes
                ?.filter((val) => val[0] !== "__typename")
                .map((item) => {
                  let char = item[0].split("")[0];
                  // console.log(char, "Sss");
                  return (
                    <>
                      {!edit ? (
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
                      )}
                    </>
                  );
                })}
          </>
        )}
      </CardWithProfileImageInfo>
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

export default NotesWithTextEditable;
