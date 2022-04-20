import { Button, Form, Input, Radio,Select } from "antd";
import Image from "next/image";
import React from "react";

import visa from "../../../../../../public/assets/images/visa.svg";
import mastercard from "../../../../../../public/assets/images/mastercard.svg";
import americanexpress from "../../../../../../public/assets/images/americanexpress.svg";
import { CheckOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import _Classes from './../AppointmentModal.module.scss'

const { Option } = Select;
function MakePaymentMore() {
  return (
      
      <div className="">
          	<h2 className="py-3">Make Payment</h2>
    <div className="relative inline mr-2 my-2">
    <div className="bg-white rounded mb-0 border border-primary inline p-4 pb-1 px-2">
        <Image
            alt=""
            src={visa}
            width={46}
            height={24}
            className="border rounded border-gray-2"
        />
    </div>
    <span className="absolute -top-7 rounded-full bg-primary pb-1 text-white px-1 -right-2 text-xs"><CheckOutlined /></span>
</div>
<div className="relative inline mr-2 my-2">
    <div className="bg-white rounded mb-0 border border-primary inline p-4 pb-1 px-2">
        <Image
            alt=""
            src={mastercard}
            width={46}
            height={24}
            className="border rounded border-gray-2"
        />
    </div>
    <span className="absolute -top-7 rounded-full bg-primary pb-1 text-white px-1 -right-2 text-xs"><CheckOutlined /></span>
</div>
<div className="relative inline mr-2 my-2">
    <div className="bg-white rounded mb-0 border border-primary inline p-4 pb-1 px-2">
        <Image
            alt=""
            src={americanexpress}
            width={46}
            height={24}
            className="border rounded border-gray-2"
        />
    </div>
    <span className="absolute -top-7 rounded-full bg-primary pb-1 text-white px-1 -right-2 text-xs"><CheckOutlined /></span>
</div>

<Form.Item name="name" label ="Card Number" rules={[{ required: true, message: 'Username is required' }]}>
<Input placeholder="Placeholder" />
</Form.Item>
<div className="flex justify-between gap-3 w-3/4 flex-1">
<Form.Item label="Expiry" className="flex ">
<Input.Group compact  className={`${_Classes["custom-width"]}`}>
<Form.Item
className="inline"
name={['address', 'province']}
noStyle
rules={[{ required: true, message: 'Province is required' }]}
>
<Select placeholder="mm">
  <Option value="Zhejiang">Zhejiang</Option>
  <Option value="Jiangsu">Jiangsu</Option>
</Select>
</Form.Item>
<Form.Item
className={`${_Classes["custom-width"]}`}
name={['address', 'province']}
noStyle
rules={[{ required: true, message: 'Province is required' }]}
>
<Select placeholder="yyyy">
  <Option value="Zhejiang">Zhejiang</Option>
  <Option value="Jiangsu">Jiangsu</Option>
</Select>
</Form.Item>
</Input.Group>
</Form.Item>
<Form.Item className="inline w-1/4 " name="cvv" label ="Cvv" rules={[{ required: true, message: 'Username is required' }]}>
<Input />
</Form.Item>
</div>
<Form.Item className="inline " name="nameoncard" label ="Name on card" rules={[{ required: true, message: 'Username is required' }]}>
<Input />
</Form.Item>
</div>
  )
}

export default MakePaymentMore