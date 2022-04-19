import { Modal } from 'antd'
import React from 'react'
import AppointmentReschedule from '../AppointmentReschedule/AppointmentReschedule'
import AppointmentSuccess from '../AppointmentSuccess/AppointmentSuccess';
import MakePayment from '../MakePayment/MakePayment';
import _Classes from './AppointmentModal.module.scss';

function AppointmentModal() {
  return (
    <Modal
    title="Appointment Reschedule"
    centered
    visible={true}
    width="520"
    // onOk={}
    // onCancel={closeModal}
    footer={null}
    className={`${_Classes['modal-header']}`}
  >
    {/* <AppointmentReschedule/> */}
    <MakePayment/>
    {/* <AppointmentSuccess/> */}
    </Modal>
  )
}

export default AppointmentModal 