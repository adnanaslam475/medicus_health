import React, { useEffect } from "react";
import { Form, Input, Radio, Layout, Divider } from "antd";
import {
  GetAppointmentByIdQuery,
  useDoctorQuestionnaireQuery,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import { NamePath } from "rc-field-form/lib/interface";
import { parseJson } from "common/utils/helper";

type Props = {
  appointmentHealthHistory: string;
};

function PhysicianQuestionnaire(props: Props) {
  const { query } = useRouter();
  const [formInstance] = Form.useForm();
  const { appointmentHealthHistory } = props || {};

  let History = parseJson(appointmentHealthHistory);

  useEffect(() => {
    prepareAndSetEditPayload();
  }, [History]);
  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      respiratoryConcern: History?.respiratoryConcern,
      symptoms: History?.symptoms,
      problemBetter: History?.problemBetter,
      problemWorse: History?.problemWorse,
      pleaseExplain: History?.pleaseExplain,
      coughingUp: History?.coughingUp,
      winded: History?.winded,
      birth: History?.birth,
      travel: History?.travel,
      explain: History?.explain,
      knownExposure: History?.knownExposure,
      howLong: History?.howLong,
      PleaseDescribe: History?.PleaseDescribe,
    });
  }

  return (
    <React.Fragment>
      <div className="w-3/6">
        <Form layout="vertical" form={formInstance}>
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
            <Radio.Group defaultValue={History?.longSymptoms}>
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
            <Radio.Group defaultValue={History?.problem}>
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
            className="text-secondary"
            name="respiratoryProblem"
          >
            <Radio.Group defaultValue={History?.respiratoryProblem}>
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
            label="Do you cough anything up?"
            className="text-secondary"
            name="coughAnything"
          >
            <Radio.Group defaultValue={History?.coughAnything}>
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
            <Radio.Group defaultValue={History?.acidReflux}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Do you have a problem with sinus or post-nasal drip?"
            className="text-secondary"
            name="sinusOrPost"
          >
            <Radio.Group defaultValue={History?.sinusOrPost}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Are you short of breath?"
            className="text-secondary mb-0"
            name="breath"
          >
            <Radio.Group defaultValue={History?.breath}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Does it occur at rest?"
            className="text-secondary mb-0"
            name="rest"
          >
            <Radio.Group defaultValue={History?.rest}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Does it occur when walking?"
            className="text-secondary mb-0"
            name="walking"
          >
            <Radio.Group defaultValue={History?.walking}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Does it occur when climbing a flight of stairs?"
            className="text-secondary"
            name="flightOfStairs"
          >
            <Radio.Group defaultValue={History?.flightOfStairs}>
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
            <Radio.Group defaultValue={History?.wheeze}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Can you lie flat at night to sleep?"
            className="text-secondary"
            name="sleep"
          >
            <Radio.Group defaultValue={History?.sleep}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Do you get chest pain when you exercise or work hard?"
            className="text-secondary"
            name="workHard"
          >
            <Radio.Group defaultValue={History?.workHard}>
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
            <Radio.Group defaultValue={History?.countryRecently}>
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
            <Radio.Group defaultValue={History?.tuberculosis}>
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
            <Radio.Group defaultValue={History?.animals}>
              <Radio value={0}>Yes</Radio>
              <Radio value={1}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Have you ever smoked anything besides cigarettes?"
            className="text-secondary mb-0"
            name="cigarettes"
          >
            <Radio.Group defaultValue={History?.cigarettes}>
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
            <Radio.Group defaultValue={History?.breathingProblems}>
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
        </Form>
      </div>
    </React.Fragment>
  );
}
export default PhysicianQuestionnaire;
