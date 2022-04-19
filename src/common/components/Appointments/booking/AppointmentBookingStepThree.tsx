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
import { useDoctorProfileQuery, useDoctorQuestionnaireQuery, useGetAllRequestedAppointmentsQuery } from "../../../../generated/graphql";
import { useRouter } from "next/router";

const StepThree = React.forwardRef(function StepThree({}, ref: any) {
  const { query } = useRouter();

  const [{data: dataList}] = useDoctorQuestionnaireQuery({
    variables: {
      doctorId: Number(query?.id)
    }
  });
  const { doctorQuestionnaire } = dataList || {};
  console.log(doctorQuestionnaire, "doctorQuestionnaire")

  const { saveStepThree, data } = useBookAppointment();
  const [formInstance] = Form.useForm();

  function onFinishLocal(values: any) {
    console.log("onFinishLocal called", values);
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

  function parseJson(jsonString:string){
    let obj = null;
    try{
        obj= JSON.parse(jsonString)
    } catch(error){
      console.log(error)
      obj = null
    }
    return obj
  }


  console.log(parseJson(doctorQuestionnaire?.questionnaire))
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

        <Divider />

        <Form.Item
          label="Please describe your main respiratory concern today?"
          className="text-secondary"
          name="respiratoryConcern"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="How long have you had these symptoms?"
          className="text-secondary"
          name="symptoms"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="How long have you had these symptoms?"
          className="text-secondary"
          name="longSymptoms"
        >
          <Radio.Group>
            <Radio value={0}>Improved</Radio>
            <Radio value={1}>Worsened</Radio>
            <Radio value={2}>Stayed the same</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="On a scale of 0-5 (0 is not at all, 5 is intolerable) how badly does your problem bother you?"
          className="text-secondary"
          name="problem"
        >
          <Radio.Group>
            <Radio value={0}>5</Radio>
            <Radio value={1}>4</Radio>
            <Radio value={2}>3</Radio>
            <Radio value={3}>2</Radio>
            <Radio value={4}>1</Radio>
            <Radio value={5}>0</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Does anything make the problem better?"
          className="text-secondary"
          name="problemBetter"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Does anything make the problem worse?"
          className="text-secondary"
          name="problemWorse"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Have you changed your lifestyle or activities because of your respiratory problem?"
          className="text-secondary mb-0"
          name="respiratoryProblem"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Please explain"
          className="text-secondary"
          name="pleaseExplain"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Do you have a cough?"
          className="text-secondary mb-0"
          name="cough"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Do you cough anything up?"
          className="text-secondary mb-0"
          name="coughAnything"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Describe what you are coughing up?"
          className="text-secondary"
          name="coughingUp"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Do you have a problem with acid reflux (heartburn)?"
          className="text-secondary"
          name="acidReflux"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Do you have a problem with sinus or post-nasal drip?"
          className="text-secondary"
          name="sinusOrPost"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Are you short of breath?"
          className="text-secondary mb-0"
          name="breath"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Does it occur at rest?"
          className="text-secondary mb-0"
          name="rest"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Does it occur when walking?"
          className="text-secondary mb-0"
          name="walking"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Does it occur when climbing a flight of stairs?"
          className="text-secondary"
          name="flightOfStairs"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="How far can you walk on level ground before you are winded?"
          className="text-secondary"
          name="winded"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Do you wheeze?"
          className="text-secondary"
          name="wheeze"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Can you lie flat at night to sleep?"
          className="text-secondary"
          name="sleep"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Do you get chest pain when you exercise or work hard?"
          className="text-secondary"
          name="workHard"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="What is your country of birth?"
          className="text-secondary"
          name="birth"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Have you traveled out of the country recently?"
          className="text-secondary mb-0"
          name="countryRecently"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Where did you travel to?"
          className="text-secondary"
          name="travel"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Do you have a history of, or have you been exposed to, tuberculosis (TB)?"
          className="text-secondary mb-0"
          name="tuberculosis"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Please explain."
          className="text-secondary"
          name="explain"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Do you have any pets or other animals?"
          className="text-secondary"
          name="animals"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Have you ever smoked anything besides cigarettes?"
          className="text-secondary mb-0"
          name="cigarettes"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="What and for how long?"
          className="text-secondary"
          name="howLong"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Have you ever been in the hospital because of breathing problems?"
          className="text-secondary mb-0"
          name="breathingProblems"
        >
          <Radio.Group>
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Please describe."
          className="text-secondary"
          name="PleaseDescribe"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Please list any known exposure to asbestos, fumes, toxins, heavy metals, grinding, solvents, etc.:"
          className="text-secondary"
          name="knownExposure"
        >
          <Input />
        </Form.Item>

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
