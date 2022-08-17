import React, { useEffect } from "react";
import { Radio, Checkbox, Form, Input } from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import {
  Appointment,
  DoctorProfile,
  useDoctorQuestionnaireQuery,
  usePatientLastQuestionnaireQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import { NamePath } from "antd/lib/form/interface";
import { parseJson } from "common/utils/helper";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { getUserData } from "common/utils/userData";

type Props = {
  physicianData?: DoctorProfile | undefined | null;
  adminApp_Details?: DoctorData;
  rebookData?: Appointment;
  clear?: boolean | undefined;
};

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

const StepThree = React.forwardRef(function StepThree(props: Props, ref: any) {
  const { query } = useRouter();
  const { physicianData, adminApp_Details, rebookData, clear } = props || {};
  const { id } = physicianData?.user || {};
  const { saveStepThree, data } = useBookAppointment();
  const [formInstance] = Form.useForm();
  const physicianId = data?.stepOne?.physician?.split(":")[0];
  const patientIdFromStepOne = data?.stepOne?.patient?.split(":")[0];

  let doctorQuestionnaireId =
    Number(rebookData?.doctorId) ||
    Number(adminApp_Details?.doctor?.doctor_Id) ||
    Number(physicianId) ||
    Number(id) ||
    Number(query?.id);

  const [{ data: dataList, fetching }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: doctorQuestionnaireId,
      languageId: 2,
    },
    pause: !doctorQuestionnaireId,
  });
  const { doctorQuestionnaire } = dataList || {};
  const { user } = getUserData();
  const role = user?.role;
  const loggedinPatientId =
    role === "Admin"
      ? patientIdFromStepOne
      : rebookData
      ? Number(rebookData?.patientId)
      : user?.id;
  const physicianQuestionnairePatientId = rebookData
    ? Number(rebookData?.patientId)
    : Number(loggedinPatientId) ||
      Number(adminApp_Details?.patient?.patient_id);

  const physicianQuestionnaireDoctorId = rebookData
    ? Number(rebookData?.doctorId)
    : Number(id) ||
      Number(physicianId) ||
      Number(adminApp_Details?.doctor?.doctor_Id);

  const [{ data: patientLastQuestionaryData }] =
    usePatientLastQuestionnaireQuery({
      variables: {
        patientId: physicianQuestionnairePatientId,
        doctorId: physicianQuestionnaireDoctorId,
      },
      pause:
        !physicianQuestionnaireDoctorId || !physicianQuestionnairePatientId,
    });
  const { patientLastQuestionnaire } = patientLastQuestionaryData || {};
  function onFinishLocal(values: any) {
    saveStepThree?.({ ...values, isLastFilled: data?.stepThree?.isLastFilled });
  }
  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
  }, []);

  useEffect(() => {
    prepareAndSetEditPayload();
    if (clear) {
      formInstance.resetFields();
    }
  }, [data.stepThree, clear]);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      doctorId: doctorQuestionnaire?.doctorId,
      id: doctorQuestionnaire?.id,
      ...data.stepThree,
    });
  }

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  const checkBoxHandler = (e: CheckboxChangeEvent) => {
    let formatedQuestioner = parseJson(patientLastQuestionnaire?.history);
    if (e?.target?.checked) {
      saveStepThree?.({
        ...formatedQuestioner,
        isLastFilled: e?.target?.checked,
      });
    } else {
      saveStepThree?.(undefined);
      formInstance.resetFields();
    }
  };

  return (
    <>
      <h2>Request an appointment</h2>
      <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
        {doctorQuestionnaire && (
          <Form.Item valuePropName="checked">
            <div className="w-full bg-gray-4 border border-gray-3 rounded flex items-center p-3">
              <Checkbox
                value={data?.stepThree?.isLastFilled || 0}
                onChange={(e) => checkBoxHandler(e)}
                checked={data?.stepThree?.isLastFilled || false}
              >
                <span className="text-gray-2">
                  {/* I want to use my last filled form */}
                  Quiero usar mi último formulario completado
                </span>
              </Checkbox>
            </div>
          </Form.Item>
        )}
        {questionnair ? (
          questionnair?.map(
            (
              item: {
                type: NamePath | undefined;
                label: {} | null | undefined;
                name: NamePath | undefined;
                options: { value: any; label: any }[];
              },
              index: any
            ) => {
              if (item.type === "text") {
                return (
                  <Form.Item
                    label={item.label}
                    className="text-secondary"
                    name={item.name}
                    rules={[{ required: true, message: "¡Requerido!" }]}
                  >
                    <Input />
                  </Form.Item>
                );
              } else if (item.type === "radio") {
                return (
                  <Form.Item
                    label={item.label}
                    className="text-secondary"
                    name={item.name}
                    rules={[{ required: true, message: "¡Requerido!" }]}
                  >
                    <Radio.Group>
                      {item?.options?.map(({ value, label }) => {
                        return <Radio value={value}>{label}</Radio>;
                      })}
                    </Radio.Group>
                  </Form.Item>
                );
              } else if (item.type === "checkbox") {
                return (
                  <Form.Item
                    label={item.label}
                    className="text-secondary"
                    name={item.name}
                    // rules={[{ required: true, message: "¡Requerido!" }]}
                  >
                    <Checkbox.Group>
                      {item?.options?.map(({ value, label }) => {
                        return <Checkbox value={value}>{label}</Checkbox>;
                      })}
                    </Checkbox.Group>
                    {/* <CheckboxGroup
            options={[3]}
            onChange={onChangeMedicalCondition}
            style={{ display: "flex", flexDirection: "column" }}
            disabled={disabled}
          /> */}
                  </Form.Item>
                );
              }
            }
          )
        ) : (
          <>
            <div className="text-center text-gray-2 py-3">
              Physician questionnaire not available
            </div>
          </>
        )}
      </Form>
    </>
  );
});
export default StepThree;
