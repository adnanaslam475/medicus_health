import React from "react";
import { Appointment, DoctorProfile, User } from "../../../generated/graphql";
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
  doctorData?: DoctorProfile | undefined | null;

  adminData?: AdminData;
  patientData?: User[];
  adminApp_Details?: DoctorData;
  rebookData?: Appointment;
  clear?: boolean | undefined;
  setClear?: any;
};

const CurrentStepContent = React.forwardRef(function CurrentStepContent(
  {
    stepName,
    doctorData,
    adminData,
    adminApp_Details,
    patientData,
    rebookData,
  }: Props,
  ref: any
) {
  switch (stepName) {
    case "stepOne":
      return (
        <AppointmentBookingStepOne
          physicianData={doctorData}
          ref={ref}
          clear={clear}
          setClear={setClear}
          adminData={adminData}
          patientData={patientData}
          adminApp_Details={adminApp_Details}
          rebookData={rebookData}
        />
      );
    case "stepTwo":
      return (
        <AppointmentBookingStepTwo
          ref={ref}
          adminApp_Details={adminApp_Details}
          physicianData={doctorData}
<<<<<<< HEAD
          clear={clear}
=======
>>>>>>> 8646271b94b898e68ba63138a9147086d6c8d86e
          rebookData={rebookData}
        />
      );
    case "stepThree":
      return (
        <AppointmentBookingStepThree
          physicianData={doctorData}
          ref={ref}
          clear={clear}
          adminApp_Details={adminApp_Details}
          rebookData={rebookData}
        />
      );
    case "stepFour":
      return <AppointmentBookingStepFour />;

    default:
      return null;
  }
});

export default CurrentStepContent;
