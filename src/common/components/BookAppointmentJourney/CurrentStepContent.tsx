import React from "react";
import { DoctorProfile, User } from "../../../generated/graphql";
import AppointmentBookingStepFour from "../Appointments/booking/AppointmentBookingStepFour";
import { AppointmentBookingStepOne } from "../Appointments/booking/AppointmentBookingStepOne";
import AppointmentBookingStepThree from "../Appointments/booking/AppointmentBookingStepThree";
import AppointmentBookingStepTwo from "../Appointments/booking/AppointmentBookingStepTwo";

type AdminData = {
  patientList: User[];
  physicianList: User[];
};
type DoctorData = {
  doctor: {
    doctor_Id: number;
    doctor_first_name: string;
    doctor_last_name: string;
  };
  patient: {
    patient_id: number;
  };
};
type Props = {
  stepName: string;
  doctorData: DoctorProfile | undefined;
  adminData?: AdminData;
  adminApp_Details?: DoctorData;
};

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  { stepName, doctorData, adminData, adminApp_Details }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return (
        <AppointmentBookingStepOne
          physicianData={doctorData}
          ref={ref}
          adminData={adminData}
          adminApp_Details={adminApp_Details}
        />
      );
    case "stepTwo":
      return <AppointmentBookingStepTwo ref={ref} />;
    case "stepThree":
      return (
        <AppointmentBookingStepThree physicianData={doctorData} ref={ref} adminApp_Details={adminApp_Details} />
      );
    case "stepFour":
      return <AppointmentBookingStepFour />;

    default:
      return null;
  }
});

export default CurrentStepContent;
