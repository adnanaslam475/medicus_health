import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import _classes from './BankInfo.module.scss'
function BankInfo() {
    const [data, setData] = useState(false);
    const handleFormVisible = () => {
        setData(!data);
    };

    return (
        <div className="w-full pb-10">
           {data ===false && 
             <Button
             icon={<PlusOutlined />}
             className="text-primary"
             onClick={handleFormVisible}
           >
             Add Account
           </Button>}
          

            {data && (
                <Form
                    // form={formInstance}
                    name="basic"
                    // onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item label="Bank Name" name="firstName" className="flex-1">
                        <Input defaultValue="Capital Bank" />
                    </Form.Item>
                    <Form.Item label="Account Number" name="account" className="flex-1">
                        <Input defaultValue="123345453" />
                    </Form.Item>
                    <Form.Item label="Routing Number" name="routing" className="flex-1">
                        <Input defaultValue="312123" />
                    </Form.Item>
                </Form>
            )}
            {data ===true &&
            <div className="flex justify-end">
            <Button
                type="primary"
                onClick={handleFormVisible}
                
            >
                Remove Account
            </Button>
            </div>}

            <div className=" bg-white -ml-7 fixed bottom-0  w-full  border-t border-gray-4  items-center ">
              <Form.Item className="">
                <div className="items-center  -mb-5 mt-2  w-4/5 xl:w-4/6 2xl:w-4/5 flex justify-end gap-3">
                  <Button htmlType="submit" className="">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" className="">
                    Save Changes
                  </Button>
                </div>
              </Form.Item>
            </div> 
        
            </div>
    );
}

export default BankInfo;
