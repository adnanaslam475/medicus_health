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

  console.log(parseJson(doctorQuestionnaire?.questionnaire));
  let questionnair = parseJson(doctorQuestionnaire?.questionnaire)
  
  // let questionnair = [
  //   {
  //     label: "Please describe your main respiratory concern today?",
  //     name: "respiratoryConcern",
  //     type: "text",
  //   },
  //   {
  //     label: "How long have you had these symptoms?",
  //     name: "symptoms",
  //     type: "text",
  //   },
  //   {
  //     label: "How long have you had these symptoms?",
  //     name: "longSymptoms",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Improved",
  //       },
  //       {
  //         value: 1,
  //         label: "Worsened",
  //       },
  //       {
  //         value: 2,
  //         label: "Stayed the same",
  //       },
  //     ],
  //   },
  //   {
  //     label: "On a scale of 0-5 (0 is not at all, 5 is intolerable) how badly does your problem bother you?",
  //     name: "problem",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: 5,
  //       },
  //       {
  //         value: 1,
  //         label: 4,
  //       },
  //       {
  //         value: 2,
  //         label: 3,
  //       },
  //       {
  //         value: 3,
  //         label: 2,
  //       },
  //       {
  //         value: 4,
  //         label: 1,
  //       },
  //       {
  //         value: 5,
  //         label: 0,
  //       },
  //     ],
  //   },
  //   {
  //     label: "Does anything make the problem better?",
  //     name: "problemBetter",
  //     type: "text",
  //   },
  //   {
  //     label: "Does anything make the problem worse?",
  //     name: "problemWorse",
  //     type: "text",
  //   },
  //   {
  //     label: "Have you changed your lifestyle or activities because of your respiratory problem?",
  //     name: "respiratoryProblem",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Please explain",
  //     name: "pleaseExplain",
  //     type: "text",
  //   },
  //   {
  //     label: "Do you have a cough?",
  //     name: "problem",
  //     type: "",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Do you cough anything up?",
  //     name: "coughAnything",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Describe what you are coughing up?",
  //     name: "coughingUp",
  //     type: "text",
  //   },
  //   {
  //     label: "How far can you walk on level ground before you are winded?",
  //     name: "winded",
  //     type: "text",
  //   },
  //   {
  //     label: "Do you have a problem with acid reflux (heartburn)?",
  //     name: "acidReflux",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Do you have a problem with sinus or post-nasal drip?",
  //     name: "sinusOrPost",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Are you short of breath?",
  //     name: "breath",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Does it occur at rest?",
  //     name: "rest",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Does it occur when walking?",
  //     name: "walking",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Does it occur when climbing a flight of stairs?",
  //     name: "flightOfStairs",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Please describe.",
  //     name: "PleaseDescribe",
  //     type: "text",
  //   },
  //   {
  //     label: "Do you wheeze?",
  //     name: "wheeze",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Can you lie flat at night to sleep?",
  //     name: "sleep",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Do you get chest pain when you exercise or work hard?",
  //     name: "workHard",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "What is your country of birth?",
  //     name: "birth",
  //     type: "text",
  //   },
  //   {
  //     label: "Have you traveled out of the country recently?",
  //     name: "countryRecently",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Where did you travel to?",
  //     name: "travel",
  //     type: "text",
  //   },
  //   {
  //     label: "Do you have a history of, or have you been exposed to, tuberculosis (TB)?",
  //     name: "tuberculosis",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Please explain",
  //     name: "explain",
  //     type: "text",
  //   },
  //   {
  //     label: "Do you have any pets or other animals?",
  //     name: "animals",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Have you ever smoked anything besides cigarettes?",
  //     name: "cigarettes",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "What and for how long?",
  //     name: "howLong",
  //     type: "text",
  //   },
  //   {
  //     label: "Have you ever been in the hospital because of breathing problems?",
  //     name: "knownExposure",
  //     type: "radio",
  //     options: [
  //       {
  //         value: 0,
  //         label: "Yes",
  //       },
  //       {
  //         value: 1,
  //         label: "No",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Please list any known exposure to asbestos, fumes, toxins, heavy metals, grinding, solvents, etc.:",
  //     name: "howLong",
  //     type: "text",
  //   },
  // ];
  
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
        {questionnair?.map((item: { type: NamePath | undefined; label: {} | null | undefined; name: NamePath | undefined; options: { value: any; label: any; }[]; }, index: any) => {
          if (item.type === "text") {
            return (
              <Form.Item
                label={item.label}
                className="text-secondary"
                name={item.type}
                rules={[{required: true, message: "Please fill the blank", whitespace: true}]}
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
                rules={[{required: true, message: "Please select the option", whitespace: true}]}
              >
                <Radio.Group>
                  {item?.options?.map(({ value, label }) => {
                    return <Radio value={value}>{label}</Radio>;
                  })}
                </Radio.Group>
              </Form.Item>
            );
          }
        })}
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
