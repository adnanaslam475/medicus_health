/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HealthQuestionnaryData from "../../constants/healthQuestionnary";

import { Form, Input, Button, Radio, Checkbox, FormInstance } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import _classes from "./Questionnary.module.scss";
import { parseJson } from "common/utils/helper";
const CheckboxGroup = Checkbox.Group;

interface HealthQuesType {
  isUpdateMode?: boolean;
  onFinishSuccess?: (value: any) => void;
  onFinishedFailed?: (value: any) => void;
  skipHealthQues?: (value: any) => void;
  handleBackChange?: (value: any) => void;
  isLoading?: boolean;
  disable?: boolean;
  signupError?: string | undefined;
}

const HealthQuestionnary = ({
  isUpdateMode,
  onFinishSuccess,
  onFinishedFailed,
  handleBackChange,
  skipHealthQues,
  isLoading,
  disable,
  signupError,
}: HealthQuesType) => {
  const [terms, setTerms] = useState(false);
  const form: any = useRef();
  const handleChange = (e: any) => {
    // handleBackChange(e);
  };

  useEffect(() => {
    console.log(form);
  }, []);
  return (
    <div>
      {!isUpdateMode && disable && (
        <Button className="mb-4" block onClick={skipHealthQues}>
          Skip This For Now & Fill This Later
        </Button>
      )}

      <QuestionnaireForm
        ref={form}
        onFinishSuccess={onFinishSuccess}
        onFinishedFailed={onFinishedFailed}
      />
      <div className="flex justify-center items-center text-red">{signupError}</div>
      <div className="flex justify-between items-center">
        {!isUpdateMode && disable && (
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
        {disable && (
          <Button
            loading={isLoading}
            disabled={!terms || isLoading}
            className="ant-btn ant-btn-primary ant-btn mb-0"
            type="primary"
            onClick={() => form?.current?.submit()}
            // htmlType="submit"
          >
            {isUpdateMode ? "Update" : "Complete"}
          </Button>
        )}
      </div>
      {!isUpdateMode && disable && (
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
  const { onFinishSuccess, onFinishedFailed, data } = props || {};
  const [radioDrink, setRadioDrink] = useState(true);
  const [radioSmoke, setRadioSmoke] = useState(true);
  const [radioDrug, setRadioDrug] = useState(true);
  const [showDrugOthers, setShowDrugOthers] = useState(false);
  const [showSurgicalOthers, setShowSurgicalOthers] = useState(false);
  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current = formInstance;
    }
    if (data) {
      prepareAndSetEditPayload(parseJson(data));
    }
  }, [data]);

  function prepareAndSetEditPayload(parsedData: any) {
    setRadioDrink(parsedData?.q1.ans);
    setRadioSmoke(parsedData?.q2.ans);
    setRadioDrug(parsedData?.q3.ans);
    setShowDrugOthers(parsedData?.q3.q.selectedOption.includes("Others"));
    setShowSurgicalOthers(parsedData?.q4.selectedOption.includes("Others"));

    formInstance.setFieldsValue({
      // q1
      [HealthQuestionnaryData.q1.name]: parsedData?.q1.ans,
      [HealthQuestionnaryData.q1.q.name]: parsedData?.q1.q.ans,
      // q2
      [HealthQuestionnaryData.q2.name]: parsedData?.q2.ans,
      [HealthQuestionnaryData.q2.q.name]: parsedData?.q2.q.ans,
      // q3
      [HealthQuestionnaryData.q3.name]: parsedData?.q3.ans,
      [HealthQuestionnaryData.q3.q.name]: parsedData?.q3.q.selectedOption,
      [HealthQuestionnaryData.q3.q2.name]: parsedData?.q3?.q2?.ans,

      //q4
      [HealthQuestionnaryData.q4.name]: parsedData?.q4.selectedOption,
      [HealthQuestionnaryData.q4.q2.name]: parsedData?.q4?.q2?.ans,
      // surgical_text: parsedData?.q4.ans,
      [HealthQuestionnaryData.q5.name]: parsedData?.q5.ans,
      [HealthQuestionnaryData.q6.name]: parsedData?.q6.ans,
      [HealthQuestionnaryData.q7.name]: parsedData?.q7.ans,
      [HealthQuestionnaryData.q8.name]: parsedData?.q8.ans,
    });
  }

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

    if (values.drug_text) {
      HealthQuestionnaryData.q3.q2.ans = values.drug_text;
    } else {
      HealthQuestionnaryData.q3.q2.ans = null;
    }

    if (values.surgical_text) {
      HealthQuestionnaryData.q4.q2.ans = values.surgical_text;
    } else {
      HealthQuestionnaryData.q4.q2.ans = null;
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

    onFinishSuccess?.(HealthQuestionnaryData);
  };

  const onFinishHealthQuestionnaryFailed = (errorInfo: any) => {
    onFinishedFailed?.(errorInfo);
  };

  function onChangeMedicalCondition(e: CheckboxValueType[]): void {
    HealthQuestionnaryData.q3.q.selectedOption = e;
    setShowDrugOthers(e.includes("Others"));
  }

  function onChangeSurgicalHistory(checkedValue: CheckboxValueType[]): void {
    HealthQuestionnaryData.q4.selectedOption = checkedValue;
    setShowSurgicalOthers(checkedValue.includes("Others"));
  }

  return (
    <Form
      initialValues={{
        radio_drink: 0,
        radio_smoke: 0,
        radio_drug: 0,
      }}
      layout="vertical"
      onFinish={onFinishHealthQuestionnary}
      onFinishFailed={onFinishHealthQuestionnaryFailed}
      form={formInstance}
      className={`${_classes["questionnary-css"]} someClass`}
    >
      <Form.Item
        name={HealthQuestionnaryData.q1.name}
        label={HealthQuestionnaryData.q1.label}
        className="text-secondary"
        rules={[{ required: true, message: "Please pick an option!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setRadioDrink(e.target.value);
          }}
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
        >
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      </Form.Item>
        <>
          <Form.Item
            name={HealthQuestionnaryData.q3.q.name}
            label={HealthQuestionnaryData.q3.q.label}
            className="text-secondary"
          >
            {/* <div className="checkbox-dir-col"> */}
            <CheckboxGroup
              options={HealthQuestionnaryData.q3.q.option}
              onChange={onChangeMedicalCondition}
              style={{ display: "flex", flexDirection: "column" }}
            />
            {/* </div> */}
          </Form.Item>
          {showDrugOthers && (
            <Form.Item
              className="flex-1"
              // name="drug_text"
              name={HealthQuestionnaryData.q3.q2.name}
            >
              <Input />
            </Form.Item>
          )}
        </>
      <Form.Item
        name={HealthQuestionnaryData.q4.name}
        className="text-secondary"
        label={HealthQuestionnaryData.q4.label}
      >
        {/* <div className="checkbox-dir-col"> */}
        <CheckboxGroup
          options={HealthQuestionnaryData.q4.option}
          onChange={onChangeSurgicalHistory}
          style={{ display: "flex", flexDirection: "column" }}
        />
        {/* </div> */}
      </Form.Item>
      {showSurgicalOthers && (
        <Form.Item
          className="flex-1"
          // name="surgical_text"
          name={HealthQuestionnaryData.q4.q2.name}
        >
          <Input />
        </Form.Item>
      )}
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
