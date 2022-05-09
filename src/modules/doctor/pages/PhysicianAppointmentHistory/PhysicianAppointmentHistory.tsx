import { Select, DatePicker, Space, Button, Tag, Input } from "antd";
import React,{useState} from "react";
import AppLayout from "common/components/AppLayout/AppLayout";
import { CaretDownOutlined, CloseOutlined, EyeFilled, SearchOutlined } from "@ant-design/icons";
import TransactionHistory from "common/components/AccountTabs/TransactionHistory/TransactionHistory";
import { useGetAllRequestedAppointmentsQuery } from "../../../../generated/graphql"
import { date } from "common/utils";
import PhysicianAppointmentHistoryTable from "common/components/PhysicianAppointmentHistoryTable/PhysicianAppointmentHistoryTable";
import { aimsCalendarIcon } from "../../../../utils/images"
import { getDateInFormat } from "../../../../../src/common/utils/date";
import PhysicianHistoryFilter from 'common/components/PhysicianHistoryFilter/PhysicianHistoryFilter'
const { RangePicker } = DatePicker;

function PatientAppointmentHistory() {
    
  // GET ALL APPOINMENTS
  const [{ data }] = useGetAllRequestedAppointmentsQuery({
    variables: {
      filter: {
        status: "Completed",
      },
    },
  });
  const [dateRangeValues, selectDateRangeValues] = useState(null);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dateRange, selectDateRange] = useState(null);
  const { appointments } = data || {};
  
  const [dueStartDate, setStartDate] = useState<Date | null>();
  const [dueEndDate, setEndDate] = useState<Date | null>();
  const [dataListPhysician, setDataListPhysician] = useState<string>();
  const [doctorIds, setDoctorId] = useState<number>();
  const [appointmentIds, setAppointmentIds] = useState<number>();
  const [serviceIds, setServiceIds] = useState<number>();
  const [status, setStatus] = useState<string>("Confirmed");




  function onChange(date: any, dateString: any) {
    console.log(date, dateString);
    selectDateRangeValues(date);
    // setStartDate(dateString[0]);
    // setEndDate(dateString[1]);
    selectDateRange(date);
  }
  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-none sm:flex items-center justify-between mb-5">
          <div className="pr-3 mb-3 sm:mb-0">
            <h2 className="mb-0">History</h2>
          </div>
          <Button type="primary" size="large">
            Request an Appointment
          </Button>
        </div>
     
        {/* Transaction History table */}
        <PhysicianHistoryFilter
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setDataListPhysician={setDataListPhysician}
          setDoctorId={setDoctorId}
          setAppointmentIds={setAppointmentIds}
          setServiceIds={setServiceIds}
          isFromPhysician
        />
        <div className="custom-table-ui">
          <PhysicianAppointmentHistoryTable data={appointments} />
        </div>
      </div>
    </AppLayout>
  );
}
export default PatientAppointmentHistory;
