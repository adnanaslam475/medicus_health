import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Modal } from "antd";
import Image from "next/image";
import React, { useRef, useState } from "react";
import _classes from "./NotesHistory.module.scss";
import { useRouter } from "next/router";
import {
  useGetAppointmentNotesByIdQuery,
  useGetDoctorNotesByAppIdQuery,
} from "generated/graphql";
import { getRole } from "common/utils/userData";
import AcronymWithText from "../AcronymWithText/AcronymWithText";
import { convertStringDateToUTC } from "common/utils/date";

type Props = {
  // historyNotes: AppointmentNote;
  // assessment: string | null | undefined;
  // plan: string | null | undefined;
};

function NotesHistory(props: Props) {
  const { query } = useRouter();
  // const appointmentId = Number(query.id);
  // const { historyNotes } = props;

  // const [{ data: getHistoryNotesData }] = useGetDoctorNotesByAppIdQuery({
  //   variables: {
  //     id: Number(query?.id),
  //   },
  // });

  const [{ data: getHistoryNotesData }, executeGetDoctorNotesByAppIdQuery] =
    useGetDoctorNotesByAppIdQuery({
      variables: {
        id: Number(query?.id),
      },
    });

  const { Panel } = Collapse;

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const noteId = getHistoryNotesData?.appointment?.currentAppointmentNote?.id;

  const appointmentChild = getHistoryNotesData;

  // const actualDoctorNotes =
  //   appointmentChild?.appointment?.currentAppointmentNote;

  // const { note, subjective, objective, assessment, plan } =
  //   actualDoctorNotes || {};
  // console.log(appointmentChild, "getactualDoctorNotes");

  const doctor = getHistoryNotesData?.appointment;

  const historyNotes = appointmentChild?.appointment?.notesHistory;

  const appointmentId = getHistoryNotesData?.appointment?.id;

  const firstName = getHistoryNotesData?.appointment.doctor?.first_name;
  const lastName = getHistoryNotesData?.appointment?.doctor?.last_name;

  const physicianFullName = firstName + " " + lastName;

  const status = getHistoryNotesData?.appointment.status;

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
          {(historyNotes || [])?.length > 0 ? (
            <>
              {historyNotes?.map((data: any, index: number) => {
                return (
                  <Panel
                    className={`${_classes["site-collapse-custom-panel"]} w-full`}
                    header={`AP-${
                      data?.appointment?.id
                    }  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${physicianFullName}   \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${convertStringDateToUTC(
                      data?.createdAt
                    )} `}
                    key={index + 1}
                  >
                    <>
                      {(getRole() === "Admin" || getRole() === "Doctor") && (
                        <div className={`${_classes["narrative-cover"]} `}>
                          <AcronymWithText
                            character={"N"}
                            word={"Narrative"}
                            sentence={data.note || "No details"}
                          />
                          <div className="font-bold text-black my-3">SOAP</div>
                          <AcronymWithText
                            character={"S"}
                            word={"Subjective"}
                            sentence={data.subjective || "No details"}
                          />
                          <AcronymWithText
                            character={"O"}
                            word={"Objective"}
                            sentence={data.objective || "No details"}
                          />

                          <div className="only-patient">
                            <AcronymWithText
                              character={"A"}
                              word={"Assessment"}
                              sentence={data.assessment || "No details"}
                            />
                            <AcronymWithText
                              character={"P"}
                              word={"Plan"}
                              sentence={data.plan || "No details"}
                            />
                          </div>
                        </div>
                      )}
                      {getRole() === "User" && (
                        <div className={`${_classes["narrative-cover"]} `}>
                          <div className="only-patient">
                            <AcronymWithText
                              character={"A"}
                              word={"Assessment"}
                              sentence={data.assessment || "No details"}
                            />
                            <AcronymWithText
                              character={"P"}
                              word={"Plan"}
                              sentence={data.plan || "No details"}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  </Panel>
                );
              })}
            </>
          ) : (
            <>
              <h5>No history notes available</h5>
            </>
          )}
        </Collapse>
      </div>
    </>
  );
}

export default NotesHistory;
