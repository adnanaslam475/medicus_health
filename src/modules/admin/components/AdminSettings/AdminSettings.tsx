import { Button, Form, InputNumber, notification } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import SmallLabelWithTextDiv from "common/components/LabelWithTextDiv/SmallLabelWithTextDiv";
import { useCreateAdminSettingsMutation } from "generated/graphql";
import Router from "next/router";
import React, { useState } from "react";
import _classes from "./AdminSettings.module.scss";

type AdminSettingsArray = {
  key: string;
  value: string | unknown;
};

function AdminSettings() {
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

  // mutation admin settings
  const [{ data }, executeCreateAdminSettingsMutation] =
    useCreateAdminSettingsMutation();

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
        createAdminSettingInput: {
          AdminSettings: adminSettingArr as [],
        },
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

  // calculating Medicus and Physician Cut
  const changesValue = (changedValues: any, allValues: any) => {
    const totalChargesConsultation = allValues?.totalChargesConsultation / 100;

    //Consultation Medicus Cut
    const consultationMedicusCut =
      allValues?.totalChargesConsultationMedicus * totalChargesConsultation;
    setConsultationMedicusCut(consultationMedicusCut);

    //Consultation Physician Cut
    const totalChargesConsultationPhysicianCut =
      allValues?.totalChargesConsultationPhysician * totalChargesConsultation;
    setTotalChargesConsultationPhysicianCut(
      totalChargesConsultationPhysicianCut
    );

    const totalChargesSecondOpnion = allValues?.totalChargesSecondOpnion / 100;

    //Second Opnion Medicus Cut
    const secondOpnionMedicusCut =
      allValues?.totalChargesSecondOpnionMedicus * totalChargesSecondOpnion;
    setSecondOpinionMedicusCut(secondOpnionMedicusCut);

    //Second Opnion Physician Cut
    const secondOpnionPhysicianCut =
      allValues?.totalChargesSecondOpnionPhysician * totalChargesSecondOpnion;
    setSecondOpinionPhysicianCut(secondOpnionPhysicianCut);
  };
  return (
    <AppLayout>
      <div className="w-full md:w-full">
        <Form
          layout="vertical"
          onFinish={onLocalFinish}
          onValuesChange={changesValue}
        >
          <div>
            <h2>Appointment Service Charges</h2>
            <h3>Consultation</h3>
            <div className="flex">
              <Form.Item
                label="Total Charges"
                name="total_consultation_charges"
                className="font-bold text-black"
              >
                <InputNumber addonBefore="$" type="number" min={0} />
              </Form.Item>
            </div>

            <div className="flex">
              <Form.Item
                label="Medicus Cut"
                name="consultation_charges_medicus_cut"
                className={`${_classes["label-design"]}`}
              >
                <InputNumber addonAfter="%" type="number" min={0} />
              </Form.Item>
              <div className="ml-4">
                <SmallLabelWithTextDiv
                  label={""}
                  value={`${
                    consultationMedicusCut ? consultationMedicusCut : 0
                  } $`}
                />
              </div>
            </div>

            <div className="flex">
              <Form.Item
                label="Physician Cut"
                name="consultation_charges_physician_cut"
                className="font-bold text-black"
              >
                <InputNumber addonAfter="%" type="number" min={0} />
              </Form.Item>
              <div className="ml-4">
                <SmallLabelWithTextDiv
                  label={""}
                  value={`${
                    totalChargesConsultationPhysicianCut
                      ? totalChargesConsultationPhysicianCut
                      : 0
                  } $`}
                />
              </div>
            </div>

            <div>
              <h3>Second Opnion</h3>
              <div className="flex">
                <Form.Item
                  label="Total Charges"
                  name="total_second_opinion_charges"
                  className="font-bold text-black"
                >
                  <InputNumber addonBefore="$" type="number" min={0} />
                </Form.Item>
              </div>

              <div className="flex">
                <Form.Item
                  label="Medicus Cut"
                  name="second_opinion_charges_medicus_cut"
                  className="font-bold text-black"
                >
                  <InputNumber addonAfter="%" type="number" min={0} />
                </Form.Item>
                <div className="ml-4">
                  <SmallLabelWithTextDiv
                    label={""}
                    value={`${
                      secondOpinionMedicusCut ? secondOpinionMedicusCut : 0
                    } $`}
                  />
                </div>
              </div>

              <div className="flex">
                <Form.Item
                  label="Physician Cut"
                  name="second_opinion_charges_physician_cut"
                  className="font-bold text-black"
                >
                  <InputNumber addonAfter="%" type="number" min={0} />
                </Form.Item>
                <div className="ml-4">
                  <SmallLabelWithTextDiv
                    label={""}
                    value={`${
                      secondOpinionPhysicianCut ? secondOpinionPhysicianCut : 0
                    } $`}
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
                  className="font-bold text-black"
                >
                  <InputNumber addonAfter="%" type="number" min={0} />
                </Form.Item>
              </div>

              <div className="flex">
                <Form.Item
                  label="Washington"
                  name="washington_state_tax"
                  className="font-bold text-black"
                >
                  <InputNumber addonAfter="%" type="number" min={0} />
                </Form.Item>
              </div>
              <div className="flex">
                <Form.Item
                  label="Texas"
                  name="taxes_state_tax"
                  className="font-bold text-black"
                >
                  <InputNumber addonAfter="%" type="number" min={0} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <div className="flex gap-4">
                <Button onClick={() => Router.back()}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save Changes
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
