import React, { useRef, useState } from "react";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";
import Image from "next/image";
import { Button, Collapse, Form, Input, Modal } from "antd";
import smile from "../../../../public/assets/images/smile.svg";
import Acronym from "common/components/Acronym/Acronym";
import _classes from "./NotesListingByAppointments.module.scss";
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

  const finalPhysicianName =
    docName?.charAt(0).toUpperCase() + "" + docName.slice(1);
  let formatedDoctorFirstName = finalPhysicianName?.includes("Dr.")
    ? finalPhysicianName
    : `Dr. ${finalPhysicianName}`;

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
                header={`ID# ${appId}  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${formatedDoctorFirstName}`}
                key={index + 1}
                extra={convertStringDateToUTC(appDate)}
              >
                {(getRole() === "Admin" ||
                  getRole() === "Doctor" ||
                  getRole() === "Staff") &&
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
