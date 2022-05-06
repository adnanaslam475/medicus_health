import React, { useEffect } from "react";
import {
  Divider,
  Radio,
  Checkbox,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import { useBookAppointment } from "../../BookAppointmentJourney/BookAppointmentContext";
import {
  useDoctorProfileQuery,
  useDoctorQuestionnaireQuery,
  useGetAllRequestedAppointmentsQuery,
} from "../../../../generated/graphql";
import { useRouter } from "next/router";
import { NamePath } from "antd/lib/form/interface";

const StepThree = React.forwardRef(function StepThree({}, ref: any) {
  const { query } = useRouter();

  const [{ data: dataList }] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(query?.id),
    },
  });
  const { doctorQuestionnaire } = dataList || {};

  const { saveStepThree, data } = useBookAppointment();
  const [formInstance] = Form.useForm();

  function onFinishLocal(values: any) {
    saveStepThree?.(values);
  }

  useEffect(() => {
    if (ref) {
      ref.current = formInstance;
    }
    formInstance.setFieldsValue({
      ...data.stepThree,
    });
    prepareAndSetEditPayload();
  }, []);

  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      doctorId: doctorQuestionnaire?.doctorId,
      id: doctorQuestionnaire?.id,
      // questionnaire: doctorQuestionnaire?.questionnaire,
    });
  }

  function parseJson(jsonString: string) {
    let obj = null;
    try {
      obj = JSON.parse(jsonString);
    } catch (error) {
      console.log(error);
      obj = null;
    }
    return obj;
  }


  let questionnair = parseJson(doctorQuestionnaire?.questionnaire);

  return (
    <>
      <h2>Request an Appointment</h2>
      <Form layout="vertical" form={formInstance} onFinish={onFinishLocal}>
        {/* <Form.Item>
          <div className="w-full bg-gray-4 border border-gray-3 rounded flex items-center p-3">
            <Checkbox value="0">
              <span className="text-gray-2">
                I want to use my last filled form
              </span>
            </Checkbox>
          </div>
        </Form.Item> */}
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
                  rules={[
                    {
                      required: true,
                      message: "Please fill the blank",
                      whitespace: true,
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select the option",
                      whitespace: true,
                    },
                  ]}
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
        {/* <Form.Item>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item> */}
      </Form>
    </>
  );
});
export default StepThree;
