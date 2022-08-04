import React, { useEffect } from "react";
import { Form, Input, Radio, Layout, Divider, Checkbox, Empty } from "antd";
import {
  GetAppointmentByIdQuery,
  useDoctorQuestionnaireQuery,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { parseJson } from "common/utils/helper";
import _classes from "./AppointmentButtons.module.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NamePath } from "antd/lib/form/interface";
import { getUserData } from "common/utils/userData";

type Props = {
  appointmentHealthHistory: string;
  disable?: boolean;
};

function PhysicianQuestionnaire(props: Props) {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const { appointmentHealthHistory, disable } = props || {};
  let History = parseJson(appointmentHealthHistory);
  const router = useRouter();
  const { user } = getUserData();

  const { pathname } = router || {};
  let disabled =
    pathname?.includes("/physician/appointments") ||
    pathname?.includes("/patient/appointments") ||
    disable;

  useEffect(() => {
    if (History) {
      prepareAndSetEditPayload();
    }
  }, [History]);

  function prepareAndSetEditPayload() {
    Object?.keys(History)?.map((value) => {
      return formInstance.setFieldsValue({
        [value]: History?.[value],
      });
    });
  }

  let doctorQuestionnaireId = user?.role === "Doctor" ? user?.id : 0;

  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: doctorQuestionnaireId,
    },
    pause: !doctorQuestionnaireId,
  });
  const { doctorQuestionnaire } = dataList || {};

  const checkBoxHandler = (e: CheckboxChangeEvent) => {
    // let formatedQuestioner = parseJson(patientLastQuestionnaire?.history);
    // if (e?.target?.checked) {
    //   saveStepThree?.({
    //     ...formatedQuestioner,
    //     isLastFilled: e?.target?.checked,
    //   });
    // } else {
    //   saveStepThree?.(undefined);
    //   formInstance.resetFields();
    // }
  };
  function onFinishLocal(values: any) {
    // saveStepThree?.({ ...values, isLastFilled: data?.stepThree?.isLastFilled });
    console.log();
  }

  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);
  console.log(questionnair, "my question");

  return (
    <React.Fragment>
      <div className="md:w-3/6">
        <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
          {!questionnair ? (
            <div className="flex items-center justify-center w-full">
              <Empty />
            </div>
          ) : (
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
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input disabled />
                    </Form.Item>
                  );
                } else if (item.type === "radio") {
                  return (
                    <Form.Item
                      label={item.label}
                      className="text-secondary"
                      name={item.name}
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Radio.Group>
                        {item?.options?.map(({ value, label }) => {
                          return (
                            <Radio value={value} disabled>
                              {label}
                            </Radio>
                          );
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
                    >
                      <Checkbox.Group>
                        {item?.options?.map(({ value, label }) => {
                          return (
                            <Checkbox value={value} disabled>
                              {label}
                            </Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                    </Form.Item>
                  );
                }
              }
            )
          )}
        </Form>
      </div>
    </React.Fragment>
  );
}
export default PhysicianQuestionnaire;
