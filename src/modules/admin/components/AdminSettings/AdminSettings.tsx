import { Form, InputNumber } from "antd";
import AppLayout from "common/components/AppLayout/AppLayout";
import SmallLabelWithTextDiv from "common/components/LabelWithTextDiv/SmallLabelWithTextDiv";
import React from "react";

function AdminSettings() {
  return (
    <AppLayout>
      <div className="w-full md:w-1/2">
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
                    addonBefore="$"
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
                <div className="ml-4">
                  <SmallLabelWithTextDiv label={""} value={"80$"} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </AppLayout>
  );
}

export default AdminSettings;
