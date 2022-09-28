import React, { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { Button, FormInstance, notification, Tabs } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import AppLayout from "common/components/AppLayout/AppLayout";
import AdminAppointmentInfoTab from "./AdminAppointmentInfoTab";
import AdminQuestionnaireFormTab from "./AdminQuestionnaireFormTab";
import AdminHealthQuestionnaireFormTab from "./AdminHealthQuestionnaireFormTab";
import AdminNotesWithTextTab from "./AdminNotesWithTextTab";
import AdminAttachmentTab from "./PhysicianAttachmentTab";
import {
  Appointment,
  useDoctorQuestionnaireQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentMutation,
} from "generated/graphql";
import { REQUESTED, PROPOSED, COMPLETED } from "common/constants/status";
import NotesTab from "common/components/NotesTab/NotesTab";

function AdminAppointmentHistoryDetail() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");

  const [
    { fetching: updateMutationFetching },
    executeUseUpdateAppointmentMutation,
  ] = useUpdateAppointmentMutation();

  const [{ data, fetching }] = useGetAppointmentByIdQuery({
    variables: { id: Number(query?.id) },
  });

  const { appointment } = data || {};
  const status = appointment?.status;

  const doctorNotes =
    appointment?.currentAppointmentNote &&
    Object?.entries(appointment?.currentAppointmentNote);
  const isNotesShow = [REQUESTED, PROPOSED, COMPLETED].includes(
    appointment?.status || ""
  );

  const onChangeTabHandler = (key: string) => {
    setActiveTab(key);
    history.pushState({}, "", "?activeTab=" + key);
  };
  useEffect(() => {
    query?.activeTab && setActiveTab(String(query?.activeTab));
  }, [query]);

  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef();
  const saveChanges = async () => {
    if (isEdit) {
      const formRefference: any = formRef.current;
      const changedValues = formRefference?.getFieldsValue();
      console.log("updated values are", changedValues);

      try {
        const response = await executeUseUpdateAppointmentMutation({
          updateAppointmentInput: {
            serviceId:
              changedValues?.appointmentType || appointment?.serviceType?.id,
            charges: Number(appointment?.charges),
            doctorId: changedValues?.physician || appointment?.doctorId,
            id: appointment?.id,
          },
        });

        if (response?.error) {
          setIsEdit((prev) => !prev);
          throw new Error(response?.error?.graphQLErrors[0]?.message);
        }
        if (response.data) {
          setIsEdit((prev) => !prev);
          notification.success({
            message: "Successfully updated",
          });
        }
      } catch (error: any) {
        setIsEdit((prev) => !prev);
        notification.error({
          message: error.message || "Something went wrong",
        });
      }
    }
  };

  const HandleCancelButton = () => {
    const form: any = formRef?.current;
    if (!isEdit) {
      form?.resetFields();
    }
    setIsEdit((prev) => !prev);
  };
  let isEditable =
    window.location.search &&
    window.location.search === "?activeTab=1" &&
    appointment?.status !== "Canceled" &&
    appointment?.status !== "Completed";

  return (
    <AppLayout>
      <div>
        <div className="flex items-center mb-4">
          <h2 className="mb-0">Appointment details</h2>
          {isEditable && (
            <Button
              size="middle"
              className="max-h-[36px] max-w-[84px] px-0 mx-0 mr-2 ml-[29px] "
              onClick={HandleCancelButton}
            >
              {isEdit ? "Cancel" : "Edit info"}
            </Button>
          )}
          {isEdit && isEditable && (
            <Button
              size="middle"
              className="max-h-[36px]  px-0 mx-0 "
              onClick={() => saveChanges()}
              loading={updateMutationFetching}
            >
              Save changes
            </Button>
          )}
        </div>
        <div className="profile-tabs">
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={activeTab || "1"}
            onChange={onChangeTabHandler}
          >
            <Tabs.TabPane tab="Appointment info" key="1" className="">
              <AdminAppointmentInfoTab
                appointment={appointment as Appointment}
                loading={fetching}
                isEdit={isEdit}
                formRef={formRef}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Health questionnaire" key="3">
              <AdminHealthQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Physician questionnaire" key="4">
              <AdminQuestionnaireFormTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Attachments" key="5">
              <AdminAttachmentTab
                appointment={appointment as Appointment}
                loading={fetching}
              />
            </Tabs.TabPane>
            {/* {isNotesShow && (
              <Tabs.TabPane tab="Notes" key="6">
                <AdminNotesWithTextTab
                  appointment={appointment as Appointment}
                  doctorNotes={doctorNotes as [[string, string]]}
                />
              </Tabs.TabPane>
            )} */}
            {(status === "Confirmed" ||
              status === "Completed" ||
              status === "Canceled" ||
              status === "Requested") && (
              <>
                {/* {pathname.includes("appointments") && ( */}
                <Tabs.TabPane tab={<span>Notes</span>} key="6">
                  <NotesTab />
                </Tabs.TabPane>
                {/* )} */}
              </>
            )}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
export default AdminAppointmentHistoryDetail;
