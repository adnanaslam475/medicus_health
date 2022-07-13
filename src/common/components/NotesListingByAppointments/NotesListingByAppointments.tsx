import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Image from "next/image";
import React, { useRef, useState } from "react";
import smile from "../../../../public/assets/images/smile.svg";
import Acronym from "common/components/Acronym/Acronym";
import _classes from "./NotesListingByAppointments.module.scss";
import { useRouter } from "next/router";
import {
  Appointment,
  AppointmentNote,
  GetDoctorNotesByAppIdQuery,
  useGetAppointmentNotesByIdQuery,
} from "generated/graphql";
import AdminNotesWithTextTab from "modules/admin/pages/AdminAppointmentsDetail/AdminNotesWithTextTab";
import EditableNotes from "../EditableNotes/EditableNotes";
import { getRole } from "common/utils/userData";
import ViewableNotes from "../ViewableNotes/ViewableNotes";
import { convertStringDateToUTC } from "common/utils/date";

type Props = {
  appointment?: Appointment | undefined;
  onChange?: () => void;
  doctorNotes?: GetDoctorNotesByAppIdQuery;
};

function NotesListingByAppointments(props: Props) {
  const { query } = useRouter();
  const appointmentId = Number(query.id);
  const { doctorNotes, appointment } = props;

  // const [{ data: currentAppointmentNotes }] = useGetAppointmentNoteByIdQuery({
  //   variables: {
  //     appointmentId,
  //   },
  //   requestPolicy: "network-only",
  // });

  // getAppointmentNoteById;
  const [{ data: currentAppointmentNotes }] = useGetAppointmentNotesByIdQuery({
    variables: {
      id: Number(query?.id),
    },
    requestPolicy: "network-only",
  });

  // GET NOTES API CALL

  const { Panel } = Collapse;

  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const appointmentChild = currentAppointmentNotes;

  const actualDoctorNotes = appointmentChild?.appointment;

  const docData = actualDoctorNotes?.doctor;

  const docName = docData?.first_name + " " + docData?.last_name;

  const appId = actualDoctorNotes?.currentAppointmentNote?.appointment?.id;

  const appDate = actualDoctorNotes?.currentAppointmentNote?.createdAt;

  const a = [0];

  const status = appointment?.status;

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
          {a.map((data, index) => {
            return (
              <Panel
                className={`${_classes["site-collapse-custom-panel"]} w-full`}
                header={`AP-${appId}  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${docName}   \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${convertStringDateToUTC(
                  appDate
                )} `}
                key={index + 1}
              >
                {(getRole() === "Admin" || getRole() === "Doctor") &&
                  actualDoctorNotes !== null && (
                    <>
                      <EditableNotes
                      // doctorNotes={doctorNotes}
                      />
                    </>
                  )}

                {getRole() === "User" && (
                  <>
                    <ViewableNotes doctorNotes={doctorNotes} />
                  </>
                )}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </>
  );
}

export default NotesListingByAppointments;
