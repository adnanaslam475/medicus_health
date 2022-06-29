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
  GetAppointmentNoteByIdQuery,
  GetDoctorNotesByAppIdQuery,
  useGetAppointmentNoteByIdQuery,
} from "generated/graphql";
import AdminNotesWithTextTab from "modules/admin/pages/AdminAppointmentsDetail/AdminNotesWithTextTab";
import EditableNotes from "../EditableNotes/EditableNotes";
import { getRole } from "common/utils/userData";
import ViewableNotes from "../ViewableNotes/ViewableNotes";

type Props = {
  // onFinish?: (values: any, setModalVisible: () => void) => void;
  appointment?: Appointment | undefined;
  onChange?: () => void;
  doctorNotes?: GetDoctorNotesByAppIdQuery;
};

function NotesListingByAppointments(props: Props) {
  const { query } = useRouter();
  const appointmentId = Number(query.id);
  const { doctorNotes, appointment } = props;

  const [{ data }] = useGetAppointmentNoteByIdQuery({
    variables: {
      appointmentId,
    },
  });

  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const onChangeCollapse = (key: string | string[]) => {
    console.log(key);
  };

  const appointmentChild = appointment;

  const actualDoctorNotes = appointmentChild?.currentAppointmentNote;

  // console.log(actualDoctorNotes, "notesByAppointmentId");
  const a = [1, 2, 4, 5, 6];
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
                header="Appointment Note"
                key={index}
              >
                {(getRole() === "Admin" || getRole() === "Doctor") &&
                  actualDoctorNotes !== null && (
                    <>
                      <EditableNotes
                        // appointment={appointment as Appointment}
                        doctorNotes={doctorNotes}
                      />
                    </>
                  )}

                {getRole() === "User" && (
                  <>
                    <ViewableNotes
                      // appointment={appointment as Appointment}
                      doctorNotes={doctorNotes}
                    />
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
