import { Button, Form, InputNumber, notification } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import SmallLabelWithTextDiv from "common/components/LabelWithTextDiv/SmallLabelWithTextDiv";
import {
  useCreateAdminSettingsMutation,
  useGetAdminSettingsQuery,
} from "generated/graphql";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import _classes from "./AdminSettings.module.scss";

type AdminSettingsArray = {
  key: string;
  value: string | unknown;
};

function AdminSettings() {
  const [formInstance] = Form.useForm();

  const [consultationMedicusCut, setConsultationMedicusCut] =
    useState<number>(0);

  const [
    totalChargesConsultationPhysicianCut,
    setTotalChargesConsultationPhysicianCut,
  ] = useState<number>(0);

  const [secondOpinionMedicusCut, setSecondOpinionMedicusCut] =
    useState<number>(0);

  const [secondOpinionPhysicianCut, setSecondOpinionPhysicianCut] =
    useState<number>(0);
  const [key, setKey] = useState<AdminSettingsArray>({ key: "", value: "" });

  const [adminSettingArr, setAdminSettingArr] = useState<
    Array<AdminSettingsArray>
  >([]);

  //get admin settings
  const [{ data: getAdminSettingsData }] = useGetAdminSettingsQuery();

  useEffect(() => {
    if (getAdminSettingsData) {
      prepareAndSetEditPayload();
    }
  }, [getAdminSettingsData]);

  const {
    total_consultation_charges,
    consultation_charges_medicus_cut,
    consultation_charges_physician_cut,
    total_second_opinion_charges,
    second_opinion_charges_medicus_cut,
    second_opinion_charges_physician_cut,
    california_state_tax,
    washington_state_tax,
    taxes_state_tax,
  } = getAdminSettingsData?.adminSettings || {};

  // mutation admin settings
  const [{ data, fetching }, executeCreateAdminSettingsMutation] =
    useCreateAdminSettingsMutation();

  //for prepopulated admin settings data
  function prepareAndSetEditPayload() {
    formInstance.setFieldsValue({
      total_consultation_charges: total_consultation_charges,
      consultation_charges_medicus_cut: consultation_charges_medicus_cut,
      consultation_charges_physician_cut: consultation_charges_physician_cut,
      total_second_opinion_charges: total_second_opinion_charges,
      second_opinion_charges_medicus_cut: second_opinion_charges_medicus_cut,
      second_opinion_charges_physician_cut:
        second_opinion_charges_physician_cut,
      california_state_tax: california_state_tax,
      washington_state_tax: washington_state_tax,
      taxes_state_tax: taxes_state_tax,
    });
  }

  const onLocalFinish = async (values: any) => {
    setAdminSettingArr([]);
    try {
      let keys = Object.keys(values);
      let updatedValues = Object.values(values);

      keys.forEach((value: string, index) => {
        adminSettingArr.push({
          key: keys[index],
          value: updatedValues[index] ? String(updatedValues[index]) : "",
        });
      });

      const res = await executeCreateAdminSettingsMutation({
        createAdminSettingInput: adminSettingArr as [],
      });

      if (res?.data?.createAdminSetting) {
        notification.success({
          message: "Settings Saved Successfully",
        });
      } else {
        notification.error({
          message: res?.error?.message || "Something Went Wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    prepopulated(getAdminSettingsData?.adminSettings);
  }, [getAdminSettingsData?.adminSettings]);

  const prepopulated = (dataValues: any) => {
    const total_consultation_charges =
      dataValues?.total_consultation_charges / 100;

    //Consultation Medicus Cut
    const consultation_charges_medicus_cut =
      dataValues?.consultation_charges_medicus_cut * total_consultation_charges;
    setConsultationMedicusCut(consultation_charges_medicus_cut);

    //Consultation Physician Cut
    const consultation_charges_physician_cut =
      dataValues?.consultation_charges_physician_cut *
      total_consultation_charges;
    setTotalChargesConsultationPhysicianCut(consultation_charges_physician_cut);

    const total_second_opinion_charges =
      dataValues?.total_second_opinion_charges / 100;

    //Second Opnion Medicus Cut
    const second_opinion_charges_medicus_cut =
      dataValues?.second_opinion_charges_medicus_cut *
      total_second_opinion_charges;
    setSecondOpinionMedicusCut(second_opinion_charges_medicus_cut);

    //Second Opnion Physician Cut
    const second_opinion_charges_physician_cut =
      dataValues?.second_opinion_charges_physician_cut *
      total_second_opinion_charges;
    setSecondOpinionPhysicianCut(second_opinion_charges_physician_cut);
  };

  // calculating Medicus and Physician Cut
  const changesValue = (changedValues: any, allValues: any) => {
    prepopulated(allValues);
  };
  return (
    <AppLayout>
      <div className="w-full md:w-full">
        <Form
          layout="vertical"
          onFinish={onLocalFinish}
          onValuesChange={changesValue}
          form={formInstance}
        >
          <div>
            <h2>Appointment service charges</h2>
            <h3>Consultation</h3>
            <div className="sm:flex">
              <Form.Item
                label="Total charges"
                name="total_consultation_charges"
                className="font-bold text-secondary"
              >
                <InputNumber
                  addonBefore="$"
                  type="number"
                  min={0}
                  controls={false}
                />
              </Form.Item>
            </div>

            <div
              className={`flex sm:gap-4 flex-col sm:flex-row  ${_classes["mb-custom"]}`}
            >
              <Form.Item
                label="Medicus cut"
                name="consultation_charges_medicus_cut"
                className="text-secondary font-bold"
              >
                <InputNumber
                  addonAfter="%"
                  type="number"
                  min={0}
                  controls={false}
                />
              </Form.Item>
              <div className="">
                <SmallLabelWithTextDiv
                  label={""}
                  value={`${
                    consultationMedicusCut ? consultationMedicusCut : 0
                  }$`}
                />
              </div>
            </div>

            <div
              className={`flex sm:gap-4 flex-col sm:flex-row  ${_classes["mb-custom"]}`}
            >
              <Form.Item
                label="Physician cut"
                name="consultation_charges_physician_cut"
                className="font-bold text-secondary"
              >
                <InputNumber
                  addonAfter="%"
                  type="number"
                  min={0}
                  controls={false}
                />
              </Form.Item>
              <div className="">
                <SmallLabelWithTextDiv
                  label={""}
                  value={`${
                    totalChargesConsultationPhysicianCut
                      ? totalChargesConsultationPhysicianCut
                      : 0
                  }$`}
                />
              </div>
            </div>

            <div>
              <h3>Second opinion</h3>
              <div className="sm:flex">
                <Form.Item
                  label="Total charges"
                  name="total_second_opinion_charges"
                  className="font-bold text-secondary"
                >
                  <InputNumber
                    addonBefore="$"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
              </div>

              <div
                className={`flex sm:gap-4 flex-col sm:flex-row  ${_classes["mb-custom"]}`}
              >
                <Form.Item
                  label="Medicus cut"
                  name="second_opinion_charges_medicus_cut"
                  className="font-bold text-secondary"
                >
                  <InputNumber
                    addonAfter="%"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
                <div className="">
                  <SmallLabelWithTextDiv
                    label={""}
                    value={`${
                      secondOpinionMedicusCut ? secondOpinionMedicusCut : 0
                    }$`}
                  />
                </div>
              </div>

              <div
                className={`flex sm:gap-4 flex-col sm:flex-row  ${_classes["mb-custom"]}`}
              >
                <Form.Item
                  label="Physician cut"
                  name="second_opinion_charges_physician_cut"
                  className="font-bold text-secondary"
                >
                  <InputNumber
                    addonAfter="%"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
                <div className="">
                  <SmallLabelWithTextDiv
                    label={""}
                    value={`${
                      secondOpinionPhysicianCut ? secondOpinionPhysicianCut : 0
                    }$`}
                  />
                </div>
              </div>
            </div>

            <div className="hidden">
              <h3>State Tax</h3>
              <div className="flex">
                <Form.Item
                  label="California"
                  name="california_state_tax"
                  className="font-semibold text-secondary"
                >
                  <InputNumber
                    addonAfter="%"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
              </div>

              <div className="flex">
                <Form.Item
                  label="Washington"
                  name="washington_state_tax"
                  className="font-bold text-secondary"
                >
                  <InputNumber
                    addonAfter="%"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
              </div>
              <div className="flex">
                <Form.Item
                  label="Texas"
                  name="taxes_state_tax"
                  className="font-bold text-secondary"
                >
                  <InputNumber
                    addonAfter="%"
                    type="number"
                    min={0}
                    controls={false}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <div className="flex gap-4">
                <Button onClick={() => Router.back()}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={fetching}>
                  Save changes
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AppLayout>
  );
}

export default AdminSettings;
