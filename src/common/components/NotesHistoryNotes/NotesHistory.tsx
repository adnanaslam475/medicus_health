import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Modal } from "antd";
import Image from "next/image";
import React, { useRef, useState } from "react";
import _classes from "./NotesHistory.module.scss";
import { useRouter } from "next/router";
import {
  Appointment,
  AppointmentNote,
  GetDoctorNotesByAppIdQuery,
  useGetAppointmentNoteByIdQuery,
  useGetDoctorNotesByAppIdQuery,
} from "generated/graphql";
import EditableNotes from "../EditableNotes/EditableNotes";
import { getRole } from "common/utils/userData";
import ViewableNotes from "../ViewableNotes/ViewableNotes";
import AcronymWithText from "../AcronymWithText/AcronymWithText";

type Props = {
  // historyNotes: AppointmentNote;
  // assessment: string | null | undefined;
  // plan: string | null | undefined;
};

function NotesHistory(props: Props) {
  const { query } = useRouter();
  const appointmentId = Number(query.id);
  // const { historyNotes } = props;

  // const [{ data: getHistoryNotesData }] = useGetAppointmentNoteByIdQuery({
  //   variables: {
  //     appointmentId,
  //   },
  // });
  const [{ data: getHistoryNotesData }, executeGetDoctorNotesByAppIdQuery] =
    useGetDoctorNotesByAppIdQuery({
      variables: {
        id: Number(query?.id),
      },
      requestPolicy: "network-only",
    });

  const { Panel } = Collapse;

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const appointmentChild = getHistoryNotesData;

  const actualDoctorNotes =
    appointmentChild?.appointment?.currentAppointmentNote;

  const { note, subjective, objective, assessment, plan } =
    actualDoctorNotes || {};
  console.log(appointmentChild, "getactualDoctorNotes");

  const historyNotes = appointmentChild?.appointment?.notesHistory;

  console.log(historyNotes, "getHistoryNotesData");

  // const status = appointment;

  return (
    <>
      <div
        className={`${_classes["notes-wrapper"]} flex justify-start flex-col py-3 rounded`}
      >
        <Collapse
          className="w-full mx-3 p-3 site-collapse-custom-collapse"
          defaultActiveKey={["1"]}
          onChange={onChangeCollapse}
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {historyNotes?.map((data, index) => {
            return (
              <Panel
                className={`${_classes["site-collapse-custom-panel"]} w-full`}
                header="Appointment Note"
                key={index}
              >
                <>
                  <AcronymWithText
                    character={"N"}
                    word={"Narrative"}
                    sentence={data.note || "No Details"}
                  />
                  <AcronymWithText
                    character={"S"}
                    word={"Subjective"}
                    sentence={data.subjective || "No Details"}
                  />
                  <AcronymWithText
                    character={"S"}
                    word={"Objective"}
                    sentence={data.objective || "No Details"}
                  />

                  <AcronymWithText
                    character={"A"}
                    word={"Assessment"}
                    sentence={data.assessment || "No Details"}
                  />
                  <AcronymWithText
                    character={"P"}
                    word={"Plan"}
                    sentence={data.plan || "No Details"}
                  />
                </>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </>
  );
}

export default NotesHistory;
