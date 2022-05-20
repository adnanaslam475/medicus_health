import CardWithProfileImageInfo from 'common/components/CardWithProfileImageInfo/CardWithProfileImageInfo'
import React from 'react'
import AdminPhysicianPatientAppointment
 from '../AdminPhysicianPatientAppointment/AdminPhysicianPatientAppointment'
function AdminPhysicianPatientAppointmentTab() {
  return (
    <CardWithProfileImageInfo
    name="usama"
    serviceName="consultation"
  >
    <AdminPhysicianPatientAppointment/>
          </CardWithProfileImageInfo>
  )
}

export default AdminPhysicianPatientAppointmentTab