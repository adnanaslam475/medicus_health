/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HealthQuestionnaryData from "../../constants/healthQuestionnary";

import { Form, Input, Button, Radio, Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

interface HealthQuesType {
  isUpdateMode: boolean;
  onFinishSuccess: (value: any) => void;
  onFinishedFailed: (value: any) => void;
  skipHealthQues: (value: any) => void;
  handleBackChange: (value: any) => void;
  isLoading: boolean;
}

const HealthQuestionnary = ({
  isUpdateMode,
  onFinishSuccess,
  onFinishedFailed,
  handleBackChange,
  skipHealthQues,
  isLoading,
}: HealthQuesType) => {
  const [terms, setTerms] = useState(false);
  const form = useRef();
  const handleChange = (e: any) => {
    handleBackChange(e);
  };

  return (
    <div>
      {!isUpdateMode && (
        <Button className="mb-4" block onClick={skipHealthQues}>
          Skip This For Now & Fill This Later
        </Button>
      )}

      <QuestionnaireForm
        ref={form}
        onFinishSuccess={onFinishSuccess}
        onFinishedFailed={onFinishedFailed}
      />

      <div className="flex justify-between items-center">
        {!isUpdateMode && (
          <Checkbox
            value={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          >
            <span className="mb-10 text-gray text-xs">
              I agree to the <Link href={"#"}>Terms & Condition</Link>
            </span>
          </Checkbox>
        )}
        <Button
          loading={isLoading}
          disabled={!terms || isLoading}
          className="ant-btn ant-btn-primary ant-btn-block mb-0"
          type="primary"
          onClick={() => form.current?.submit()}
          // htmlType="submit"
        >
          {isUpdateMode ? "Updated" : "Complete"}
        </Button>
      </div>
      {!isUpdateMode && (
        <div className="flex justify-center">
          <div className="inline-flex items-center">
            <div className="mb-0">
              <Button type="link" onClick={(e) => handleChange(e)}>
                <div className="flex items-center">
                  <span className="mt-1">
                    <Image
                      alt=""
                      className="left-arrow-icon mx-auto mt-3"
                      height={16}
                      width={16}
                      src="/assets/icon/arrow-left.svg"
                    />
                  </span>
                  <span className="ml-3">Back</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthQuestionnary;

export const QuestionnaireForm = React.forwardRef(function QuestionnaireForm(
  props: any,
  ref: any
) {
  const { onFinishSuccess, onFinishedFailed } = props || {};
  const [radioDrink, setRadioDring] = useState(true);
  const [radioSmoke, setRadioSmoke] = useState(true);
  const [radioDrug, setRadioDrug] = useState(true);
  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current = formInstance;
    }
  }, []);

  const onFinishHealthQuestionnary = async (values: any) => {
    if (values.radio_drink) {
      HealthQuestionnaryData.q1["ans"] = 1;
      HealthQuestionnaryData.q1.q.ans = values.drinks;
    } else {
      HealthQuestionnaryData.q1["ans"] = 0;
      HealthQuestionnaryData.q1.q.ans = null;
    }

    if (values.radio_smoke) {
      HealthQuestionnaryData.q2["ans"] = 1;
      HealthQuestionnaryData.q2.q.ans = values.smoke;
    } else {
      HealthQuestionnaryData.q2["ans"] = 0;
      HealthQuestionnaryData.q2.q.ans = null;
    }

    if (values.radio_drug) {
      HealthQuestionnaryData.q3["ans"] = 1;
      HealthQuestionnaryData.q3.q.ans = values.medical;
    } else {
      HealthQuestionnaryData.q3["ans"] = 0;
      HealthQuestionnaryData.q3.q.ans = null;
    }

    if (values.surgical_text !== "") {
      HealthQuestionnaryData.q4.ans = values.surgical_text;
    } else {
      HealthQuestionnaryData.q4.ans = null;
    }

    if (values.allergies !== "") {
      HealthQuestionnaryData.q5.ans = values.allergies;
    } else {
      HealthQuestionnaryData.q5.ans = null;
    }

    if (values.adverse !== "") {
      HealthQuestionnaryData.q6.ans = values.adverse;
    } else {
      HealthQuestionnaryData.q6.ans = null;
    }

    if (values.medication !== "") {
      HealthQuestionnaryData.q7.ans = values.medication;
    } else {
      HealthQuestionnaryData.q7.ans = null;
    }

    if (values.inherited !== "") {
      HealthQuestionnaryData.q8.ans = values.inherited;
    } else {
      HealthQuestionnaryData.q8.ans = null;
    }

    onFinishSuccess(HealthQuestionnaryData);
  };

  const onFinishHealthQuestionnaryFailed = (errorInfo: any) => {
    onFinishedFailed(errorInfo);
  };

  function onChangeMedicalCondition(e: CheckboxValueType[]): void {
    HealthQuestionnaryData.q3.q.selectedOption = e;
  }

  function onChangeSurgicalHistory(checkedValue: CheckboxValueType[]): void {
    HealthQuestionnaryData.q4.selectedOption = checkedValue;
  }

  return (
    <Form
      initialValues={{
        radio_drink: 1,
        radio_smoke: 1,
        radio_drug: 1,
      }}
      layout="vertical"
      onFinish={onFinishHealthQuestionnary}
      onFinishFailed={onFinishHealthQuestionnaryFailed}
      form={formInstance}
    >
      <Form.Item
        name={HealthQuestionnaryData.q1.name}
        label={HealthQuestionnaryData.q1.label}
        className="text-secondary"
        rules={[{ required: true, message: "Please pick an option!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setRadioDring(e.target.value);
          }}
          defaultValue={1}
        >
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {!!radioDrink && (
        <Form.Item
          className="flex-1 text-secondary"
          name={HealthQuestionnaryData.q1.q.name}
          label={HealthQuestionnaryData.q1.q.label}
          rules={[
            {
              required: true,
              message: "Please fill filed",
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        name={HealthQuestionnaryData.q2.name}
        label={HealthQuestionnaryData.q2.label}
        className="text-secondary"
        rules={[{ required: true, message: "Please pick an option!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setRadioSmoke(e.target.value);
          }}
          defaultValue={1}
        >
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {!!radioSmoke && (
        <Form.Item
          className="flex-1 text-secondary"
          name={HealthQuestionnaryData.q2.q.name}
          label={HealthQuestionnaryData.q2.q.label}
          rules={[
            {
              required: true,
              message: "Please fill filed",
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        name={HealthQuestionnaryData.q3.name}
        label={HealthQuestionnaryData.q3.label}
        className="text-secondary"
        rules={[{ required: true, message: "Please pick an option!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setRadioDrug(e.target.value);
          }}
          defaultValue={1}
        >
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {!!radioDrug && (
        <>
          <Form.Item
            name={HealthQuestionnaryData.q3.q.name}
            label={HealthQuestionnaryData.q3.q.label}
            className="text-secondary"
          >
            <div className="checkbox-dir-col">
              <CheckboxGroup
                options={HealthQuestionnaryData.q3.q.option}
                onChange={onChangeMedicalCondition}
              />
            </div>
          </Form.Item>
          <Form.Item className="flex-1" name="drug_text">
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item
        name={HealthQuestionnaryData.q4.name}
        className="text-secondary"
        label={HealthQuestionnaryData.q4.label}
      >
        <div className="checkbox-dir-col">
          <CheckboxGroup
            options={HealthQuestionnaryData.q4.option}
            onChange={onChangeSurgicalHistory}
          />
        </div>
      </Form.Item>
      <Form.Item className="flex-1" name="surgical_text">
        <Input />
      </Form.Item>
      <Form.Item
        className="flex-1 text-secondary"
        name={HealthQuestionnaryData.q5.name}
        label={HealthQuestionnaryData.q5.label}
        rules={[
          {
            required: true,
            message: "Please fill",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="flex-1 text-secondary"
        name={HealthQuestionnaryData.q6.name}
        label={HealthQuestionnaryData.q6.label}
        rules={[
          {
            required: true,
            message: "Please fill",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="flex-1 text-secondary"
        name={HealthQuestionnaryData.q7.name}
        label={HealthQuestionnaryData.q7.label}
        rules={[
          {
            required: true,
            message: "Please fill",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className="flex-1 text-secondary"
        name={HealthQuestionnaryData.q8.name}
        label={HealthQuestionnaryData.q8.label}
        rules={[
          {
            required: true,
            message: "Please fill",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});
