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

  // FRESH COMMENT
  // const [{ data: getHistoryNotesData }, executeGetDoctorNotesByAppIdQuery] =
  //   useGetDoctorNotesByAppIdQuery({
  //     variables: {
  //       id: Number(query?.id),
  //     },
  //   });

  // FRESH NEXT COMMENT

  const [{ data: getHistoryNotesData }, executeGetAppointmentNotesByIdQuery] =
    useGetAppointmentNotesByIdQuery({
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

  const doctor = getHistoryNotesData?.appointment;

  const historyNotes = appointmentChild?.appointment?.notesHistory;

  const doctorNameforHistoryNotes = (firstName: string, lastName: string) => {
    const capitalFirstname = firstName?.charAt(0).toUpperCase();

    const physicianFullName = capitalFirstname + "" + firstName?.slice(1);

    const finalPhysicianName = physicianFullName + " " + lastName;

    let formatedDoctorFirstName = finalPhysicianName?.includes("Dr.")
      ? finalPhysicianName
      : `Dr. ${finalPhysicianName}`;
    return formatedDoctorFirstName;
  };

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
                    // header={`ID#-AP-${
                    //   data?.appointment?.id
                    // }  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${formatedDoctorFirstName}   \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${convertStringDateToUTC(
                    //   data?.createdAt
                    // )} `}
                    // header={`ID# ${
                    //   data?.appointment?.id
                    // }  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${doctorNameforHistoryNotes(
                    //   data?.appointment?.doctor?.first_name,
                    //   data?.appointment?.doctor?.last_name
                    // )}   `}
                    header={
                      <div className=" justify-between flex flex-col sm:flex-row flex-1">
                        <div>{`ID# ${data?.appointment?.id}`}</div>
                        <div>
                          {doctorNameforHistoryNotes(
                            data?.appointment?.doctor?.first_name,
                            data?.appointment?.doctor?.last_name
                          )}
                        </div>
                        <div>{convertStringDateToUTC(data?.createdAt)}</div>
                      </div>
                    }
                    key={index + 1}
                    // extra={convertStringDateToUTC(data?.createdAt)}
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
              <h5>No notes history available</h5>
            </>
          )}
        </Collapse>
      </div>
    </>
  );
}

export default NotesHistory;
