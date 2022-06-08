import React from "react";
import Router, { useRouter } from "next/router";
import { Button, notification, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import AdminAttachmentTab from "./PhysicianAttachmentTab";
import { Appointment, useGetAppointmentByIdQuery } from "generated/graphql";
import { REQUESTED, SUGGESTED } from "common/constants/status";

function AdminAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [{ data }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.appointmentId) },
  });
  // const [{ fetching: deleteFetching }, removeAppointmentByAdmin] =
  //   useRemoveAppointmentByAdminMutation();
  // const [open, setOpen] = React.useState<boolean>(false);
  const { appointment } = data || {};

  let doctorNotes =
    appointment?.doctorNote && Object?.entries(appointment?.doctorNote);
  const isNotesShow = [REQUESTED, SUGGESTED].includes(
    appointment?.status || ""
  );

  // const deleteModalHandler = () => setOpen(!open);
  // const deleteAppointmentHandler = async () => {
  //   try {
  //     const response = await removeAppointmentByAdmin({
  //       id: Number(query.appointmentId),
  //     });
  //     if (response?.error) {
  //       throw new Error(response?.error?.graphQLErrors[0]?.message);
  //     }
  //     if (response.data) {
  //       notification.success({
  //         message: "Appointment Delete Successfully",
  //       });
  //       Router.back();
  //       deleteModalHandler();
  //     }
  //   } catch (error: any) {
  //     notification.error({
  //       message: error?.message || "Something Went Wrong",
  //     });
  //   }
  // };
  return (
    <AppLayout>
      <div>
        <h2 className="mb-4">Appointment History Detail</h2>

        <div className="profile-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="Appointment Info" key="1" className="">
              <AdminAppointmentInfoTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health Questionnaire" key="3">
              <AdminHealthQuestionnaireFormTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician Questionnaire" key="4">
              <AdminQuestionnaireFormTab
                appointment={appointment as Appointment}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachment" key="5">
              <AdminAttachmentTab appointment={appointment as Appointment} />
            </Tabs.TabPane>
            {isNotesShow && (
              <Tabs.TabPane tab="Notes" key="6">
                <AdminNotesWithTextTab
                  appointment={appointment as Appointment}
                  doctorNotes={doctorNotes as [[string, string]]}
                />
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      </div>
      {/* <Button
        type="link"
        className="ml-auto mt-10"
        danger
        loading={deleteFetching}
        disabled={deleteFetching}
        icon={<CloseOutlined />}
        onClick={deleteModalHandler}
      >
        Delete Appointment
      </Button>
      <ConfirmationModal
        message="Are You Sure You want to delete this appointment?"
        onCancel={deleteModalHandler}
        confirmLoading={deleteFetching}
        onOk={deleteAppointmentHandler}
        visible={open}
      /> */}
    </AppLayout>
  );
}
export default AdminAppointmentHistoryDetail;
