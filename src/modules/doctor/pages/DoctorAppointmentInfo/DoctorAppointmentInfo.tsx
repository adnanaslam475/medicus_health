import { MessageOutlined, VideoCameraFilled } from '@ant-design/icons'
import { Button } from 'antd'
import LabelWithText from 'common/components/LabelWithText/LabelWithText'
import React from 'react'
import _classes from './DoctorAppointmentInfo.module.scss'

function DoctorAppointmentInfo() {
  return (
    <>
    <div className="max-w-1/2">
     <LabelWithText label="ID" text="1"/>
     <LabelWithText label="Patient" text="1"/>
     <LabelWithText label="Type" text="1"/>
     <LabelWithText label="Date" text="1"/>
     <LabelWithText label="Time" text="1"/>
      <LabelWithText label="Total Amount" text="1"/>
      <LabelWithText label="Status" text="Pending"/>
    </div>
    <div className="max-w-1/2 flex justify-between mt-4">
      <div className="flex">
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]} mr-3`}
        >
          Message Admin
        </Button>
        <Button
          icon={<MessageOutlined />}
          className={`${_classes["appointments-btn"]}`}
        >
          Message Physician
        </Button>
      </div>
      <Button
        type="primary"
        icon={<VideoCameraFilled />}
        className={`${_classes["appointments-btn"]} bg-current`}
      >
        Join Now
      </Button>
    </div>
  </>
  )
}

export default DoctorAppointmentInfo