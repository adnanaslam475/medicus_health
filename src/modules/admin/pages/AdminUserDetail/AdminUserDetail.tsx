import { Form, Select } from 'antd'
import AppLayout from 'common/components/AppLayout/AppLayout'
import React from 'react'

function AdminUserDetail() {
  return (
    <AppLayout>
       <Form
     
    
    
      layout="vertical"
    >
      <div>
        <span>MD-121</span>
        <h1>Mark Manson</h1>
        <span>mark@gmail.com</span>

      </div>
      <Select
          className="mr-5"
          placeholder="Send password reset link"
         
          style={{ width: 200 }}
        >
          <Select.Option value={false}>Active</Select.Option>
          <Select.Option value={true}>Disabled</Select.Option>
        </Select>
      </Form>
    </AppLayout>
  )
}

export default AdminUserDetail