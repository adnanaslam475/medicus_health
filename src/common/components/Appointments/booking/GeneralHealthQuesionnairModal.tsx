import { Button, Modal, notification } from "antd";
import React, { useEffect, useRef } from "react";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import {
  Appointment,
  DoctorProfile,
  usePatientHealthHistoryQuery,
  useUpdatePatientHealthHistoryMutation,
} from "generated/graphql";
import { getUserData } from "common/utils/userData";
import { QuestionnaireForm } from "common/components/Questionnary/Questionnary";

type DoctorData = {
  doctor: {
    doctor_Id: number;
    doctor_first_name: string;
    doctor_last_name: string;
  };
  patient: {
    patient_id: number;
  };
};

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ref: any;
  physicianData: DoctorProfile | undefined | null;
  adminApp_Details: DoctorData | undefined | null;
  rebookData?: Appointment;
};
const GeneralHealthQuesionnairModal = (props: Props) => {
  const { adminApp_Details, rebookData } = props || {};

  const { isModalVisible, setIsModalVisible } = props || {};

  const { data: appoinmentData } = useBookAppointment();
  const { user } = getUserData();

  const id = user?.id;
  const adminPatientId = appoinmentData?.stepOne?.patient?.split(":")[0];

  const patientId =
    rebookData?.patientId ||
    Number(adminApp_Details?.patient?.patient_id) ||
    Number(adminPatientId) ||
    (id as number);

    const form: any = useRef();

  const [result, updatePatientHealthHistory] =
    useUpdatePatientHealthHistoryMutation();

  const [{ data }, executeUsePatientHealthHistoryQuery] =
    usePatientHealthHistoryQuery({
      variables: { input: patientId as number },
    });

  const { error, fetching } = result;

  const onFinishHealthQuestionnarySuccess = async (quesPayload: any) => {
    const healthQuesJson = JSON.stringify(quesPayload);
    try {
      const res = await updatePatientHealthHistory({
        input: {
          history: healthQuesJson,
          user_id: patientId as number,
        },
      });
      if (res?.data?.updatePatientHealthHistory) {
        executeUsePatientHealthHistoryQuery({ requestPolicy: "network-only" });
        setIsModalVisible(false);
        notification.success({
          message: "Successfully updated",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    executeUsePatientHealthHistoryQuery({ requestPolicy: "network-only" });
  }, []);

  const handleOk = async (quesPayload: any) => {
    form.current.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={540}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={fetching}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <>
          <h2>General health questioniar</h2>
          <QuestionnaireForm
            ref={form}
            data={data?.patientHealthHistory?.history}
            onFinishSuccess={onFinishHealthQuestionnarySuccess}
          />
        </>
      </Modal>
    </>
  );
};

export default GeneralHealthQuesionnairModal;
