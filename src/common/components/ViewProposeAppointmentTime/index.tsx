import { Button } from "antd";
import AppointmentModalJourney from "modules/patient/components/AppointmentModalJourney/AppointmentModalJourney";
import React, { useState } from "react";
import { isChrome } from "utils/helper";
import _classes from "./style.module.scss";
// import AppointmentModalJourney from "";

type Props = {
  appointmentId: number;
};
const ViewProposeAppointmentTime = (props: Props) => {
  const { appointmentId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  function onCancel() {
    setShowModal(false);
    // setCurrentAppointmentId(undefined);
  }
  return (
    <>
      <Button
        type={"primary"}
        className={`${_classes["card-btn"]} ${isChrome && 'antCustomBtn'}`}
        onClick={() => setShowModal(true)}
      >
        View proposed appointment times
      </Button>
      <AppointmentModalJourney
        visible={showModal}
        onCancel={onCancel}
        appointmentId={appointmentId}
      />
    </>
  );
};

export default ViewProposeAppointmentTime;
