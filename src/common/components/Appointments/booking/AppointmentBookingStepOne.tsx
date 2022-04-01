import React from "react";
import { Form, Input, Button, Select, DatePicker} from "antd";

function StepOne() {
  return (
    <>
    <Form layout="vertical">
        <Form.Item label="Doctor*">
            <Select disabled placeholder="Dr. Paul Wallner" className="w-full">
                <Option value="Dr.Paul Wallner">Dr.Paul Wallner</Option>
            </Select>
        </Form.Item>
        <div className="flex">
            <div className="w-5/6">
                <Form.Item label="Service*">
                    <Select placeholder="Dr. Paul Wallner" className="w-full">
                        <Option value="Dr.Paul Wallner">Dr.Paul Wallner</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="w-1/6 ml-4">
                <Form.Item label="Charges">
                    <div className="text-primary bg-gray-6 rounded flex items-center	justify-center h-12 w-full">
                        $59.00
                    </div>
                </Form.Item>
            </div>
        </div>
        <Form.Item label="Doctor*">
            { <DatePicker className="w-full" /> }
        </Form.Item>
        <Form.Item label="Avaiability*">
            <div className="flex flex-wrap">
            <div className="w-44 bg-gray-4 rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
                    07:00 am - 09:00 am
                </div>
                <div className="w-44 bg-cyan text-white rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
                    07:00 am - 09:00 am
                </div>
                <div className="w-44 bg-gray-4 rounded flex items-center justify-center h-8 w-full mr-3 mb-3">
                    07:00 am - 09:00 am
                </div>
            </div>
        </Form.Item>
    </Form>
    </>
  );
}
export default StepOne;
