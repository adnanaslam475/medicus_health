import React, { useEffect } from "react";
import { Radio, Checkbox, Form, Input } from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import {
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
  physicianData?: DoctorProfile;
};

const StepThree = React.forwardRef(function StepThree(props: Props, ref: any) {
  const { query } = useRouter();
  const { physicianData } = props || {};
  const { id } = physicianData?.user || {};
  const { saveStepThree, data } = useBookAppointment();
  const [formInstance] = Form.useForm();
  const physicianId = data?.stepOne?.physician?.split(":")[0];
  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(physicianId) || Number(query?.id) || Number(id),
    },
  });
  const { doctorQuestionnaire } = dataList || {};
  const { user } = getUserData();
  const loggedinPatientId = user?.id;

  const [{ data: patientLastQuestionaryData }] =
    usePatientLastQuestionnaireQuery({
      variables: {
        patientId: Number(loggedinPatientId),
        doctorId: Number(id),
      },
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
  }, [data.stepThree]);

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
      <h2>Request an Appointment</h2>
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
                  I want to use my last filled form
                </span>
              </Checkbox>
            </div>
          </Form.Item>
        )}
        {questionnair?.map(
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
                >
                  <Radio.Group>
                    {item?.options?.map(({ value, label }) => {
                      return <Radio value={value}>{label}</Radio>;
                    })}
                  </Radio.Group>
                </Form.Item>
              );
            }
          }
        )}
      </Form>
    </>
  );
});
export default StepThree;
