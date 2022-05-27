import { Button, Form, InputNumber } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import SmallLabelWithTextDiv from "common/components/LabelWithTextDiv/SmallLabelWithTextDiv";
import Router from "next/router";
import React from "react";
import _classes from "./AdminSettings.module.scss";
function AdminSettings() {
  return (
    <AppLayout>
      <div className="w-full md:w-full">
        <Form layout="vertical">
          <div>
            <h2>Appointment Service Charges</h2>
            <h3>Consultation</h3>
            <div className="flex">
              <Form.Item
                label="Total Charges"
                name="totalCharges"
                className="font-bold text-black"
              >
                <InputNumber
                  addonBefore="$"
                  placeholder="$"
                  type="number"
                  min={0}
                />
              </Form.Item>
            </div>

            <div className="flex">
              <Form.Item
                label="Medicus Cut"
                name="totalChargesMedicus"
                className={`${_classes["label-design"]}`}
              >
                <InputNumber
                  addonAfter="%"
                  placeholder="$"
                  type="number"
                  min={0}
                />
              </Form.Item>
              <div className="ml-4">
                <SmallLabelWithTextDiv label={""} value={"80$"} />
              </div>
            </div>

            <div className="flex">
              <Form.Item
                label="Physician Cut"
                name="totalChargesPhysician"
                className="font-bold text-black"
              >
                <InputNumber
                  addonAfter="%"
                  placeholder="$"
                  type="number"
                  min={0}
                />
              </Form.Item>
              <div className="ml-4">
                <SmallLabelWithTextDiv label={""} value={"80$"} />
              </div>
            </div>

            <div>
              <h3>Second Opnion</h3>
              <div className="flex">
                <Form.Item
                  label="Total Charges"
                  name="totalCharges"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonBefore="$"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </div>

              <div className="flex">
                <Form.Item
                  label="Medicus Cut"
                  name="totalChargesMedicus"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonAfter="%"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
                <div className="ml-4">
                  <SmallLabelWithTextDiv label={""} value={"80$"} />
                </div>
              </div>

              <div className="flex">
                <Form.Item
                  label="Physician Cut"
                  name="totalChargesPhysician"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonAfter="%"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
                <div className="ml-4">
                  <SmallLabelWithTextDiv label={""} value={"80$"} />
                </div>
              </div>
            </div>

            <div>
              <h3>State Tax</h3>
              <div className="flex">
                <Form.Item
                  label="California"
                  name="totalCharges"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonAfter="$"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </div>

              <div className="flex">
                <Form.Item
                  label="Washington"
                  name="totalChargesMedicus"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonAfter="%"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </div>
              <div className="flex">
                <Form.Item
                  label="Texas"
                  name="totalChargesMedicus"
                  className="font-bold text-black"
                >
                  <InputNumber
                    addonAfter="%"
                    placeholder="$"
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <div className="flex gap-4">
                <Button htmlType="submit" onClick={() => Router.back()}>
                  Cancel
                </Button>
                <Button
                  // loading={fetching}
                  // disabled={fetching}
                  type="primary"
                  htmlType="submit"
                >
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
