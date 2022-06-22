import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import _Classes from "./CalendarView.module.scss";
import { Input, Button } from "antd";
import {
  Appointment,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  usePhysicianAppointmentsQuery,
  User,
} from "generated/graphql";
import { CloseOutlined } from "@ant-design/icons";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";

type Props = {
  handleDateChange: (arg: any | undefined) => void;
  handleDateClick: (arg: any | undefined) => void;
  calendarComponentRef: React.LegacyRef<FullCalendar> | undefined | any;
  calender: object | any;
  redirectToListing: () => void;
  enableButton: boolean;
};

type events = {
  calenderEvents: Appointment | undefined | Array<object>;
};

type AdminData = {
  patientList: User[];
  physicianList: User[];
};

function AdminCalender(props: Props) {
  const {
    handleDateChange,
    calendarComponentRef,
    calender,
    handleDateClick,
    redirectToListing,
    enableButton,
  } = props;

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [filterCalender, setFilterCalender] = useState<events>({
    calenderEvents: [],
  });
  function handleSearch() {
    setIsSearch(!isSearch);
  }

  const [{ data: physicianData }] = usePhysicianAppointmentsQuery({
    variables: {
      filter: searchText ? {
        searchString: searchText,
      } : {},
    },
  });
  const { physicianAppointments } = physicianData || {};

  const setCalendarData = () => {
    setFilterCalender({
      ...calender,
      calenderEvents: physicianAppointments?.map(
        ({
          id,
          patient,
          requestedDate,
          serviceType,
          charges,
          status,
          appointmentTimeSlots,
        }) => ({
          id: id,
          title: patient?.first_name,
          start:
            appointmentTimeSlots
              ?.find((item) => item.selected)
              ?.startTime.split(".")[0] || requestedDate,
          patient: patient?.first_name + " " + patient?.last_name,
          serviceType: serviceType?.name,
          charges: charges,
          status: status,
          appointmentTimeSlots: appointmentTimeSlots,
        })
      ),
    });
  };

  useEffect(() => {
    setCalendarData();
  }, [physicianAppointments]);

  const handleChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const onClear = () => {
    setSearchText("");
  };

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
    },
  });
  const { getPhysicians } = physicianList || {};

  const [{ data: patientList }] = useGetPatientsQuery({
    variables: {
      filter: {},
    },
  });

  const { getPatients } = patientList || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let adminData = {
    physicianList: getPhysicians,
    patientList: getPatients,
  };

  return (
    <div>
      <div className={`${_Classes["calendarview"]}`}>
        {isSearch ? (
          <div className="my-2 flex flex-row">
            <div className="lg:ml-3 mt-3 sm:mt-0 sm:w-2/5">
              <Input
                value={searchText}
                placeholder="Search by ID or patient name"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onClear} type="text" className="sm:ml-3">
                <CloseOutlined className="text-sm" />
                <span className="text-gray-1">Clear</span>
              </Button>
            </div>
          </div>
        ) : null}
        <div className={`${_Classes["calendarviewStyle"]}`}>
          {enableButton ? (
            <FullCalendar
              dayHeaderContent={(args) => {
                const weekShortName = new Date(args.date).toLocaleString(
                  "en-us",
                  {
                    weekday: "short",
                  }
                );
                const currentDate = new Date(args.date).getDate();
                return (
                  <div className="flex-col">
                    <div className="text-black">{currentDate}</div>
                    <div className="text-black">{weekShortName}</div>
                  </div>
                );
              }}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "customText today customPrev customNext title",
                center: "",
                right: "listview search custom1",
              }}
              customButtons={{
                customNext: {
                  icon: "chevron-right",
                  click: () => {
                    handleDateChange("next");
                  },
                },
                customPrev: {
                  icon: "chevron-left",
                  click: () => {
                    handleDateChange("prev");
                  },
                },
                customText: {
                  text: "Appointment",
                },
                custom1: {
                  text: "Request an Appointment",
                  click: showModal,
                },
                listview: {
                  text: "List View",
                  click: redirectToListing,
                },
                search: {
                  text: "Search",
                  click: () => {
                    handleSearch();
                  },
                },
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={calendarComponentRef}
              events={
                filterCalender?.calenderEvents || calender?.calenderEvents
              }
              eventClick={handleDateClick}
              eventTextColor="black"
              displayEventTime={false}
              eventClassNames={(arg) => {
                if (arg.event.extendedProps?.status === "Requested") {
                  return [`${_Classes["clsRequested"]}`];
                }
                if (arg.event.extendedProps?.status === "Confirmed") {
                  return [`${_Classes["clsConfirmed"]}`];
                }
                if (arg.event.extendedProps?.status === "Completed") {
                  return [`${_Classes["clsCompleted"]}`];
                }
                if (arg.event.extendedProps?.status === "Cancelled") {
                  return [`${_Classes["clsCanceled"]}`];
                }
                if (arg.event.extendedProps?.status === "Suggested") {
                  return [`${_Classes["clsUpcoming"]}`];
                } else {
                  return [`${_Classes["clsUpcoming"]}`];
                }
              }}
            />
          ) : (
            <FullCalendar
              dayHeaderContent={(args) => {
                const weekShortName = new Date(args.date).toLocaleString(
                  "en-us",
                  {
                    weekday: "short",
                  }
                );
                const currentDate = new Date(args.date).getDate();
                return (
                  <div className="flex-col">
                    <div className="text-black">{currentDate}</div>
                    <div className="text-black">{weekShortName}</div>
                  </div>
                );
              }}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "customText today customPrev customNext title",
                center: "",
                right: "listview search",
              }}
              customButtons={{
                customNext: {
                  icon: "chevron-right",
                  click: () => {
                    handleDateChange("next");
                  },
                },
                customPrev: {
                  icon: "chevron-left",
                  click: () => {
                    handleDateChange("prev");
                  },
                },
                customText: {
                  text: "Appointment",
                },
                custom1: {
                  text: "Request an Appointment",
                  click: showModal,
                },
                listview: {
                  text: "List View",
                  click: redirectToListing,
                },
                search: {
                  text: "Search",
                  click: () => {
                    handleSearch();
                  },
                },
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={calendarComponentRef}
              events={
                filterCalender?.calenderEvents || calender?.calenderEvents
              }
              eventClick={handleDateClick}
              eventTextColor="black"
              displayEventTime={false}
              eventClassNames={(arg) => {
                if (arg.event.extendedProps?.status === "Requested") {
                  return [`${_Classes["clsRequested"]}`];
                }
                if (arg.event.extendedProps?.status === "Confirmed") {
                  return [`${_Classes["clsConfirmed"]}`];
                }
                if (arg.event.extendedProps?.status === "Completed") {
                  return [`${_Classes["clsCompleted"]}`];
                }
                if (arg.event.extendedProps?.status === "Cancelled") {
                  return [`${_Classes["clsCancelled"]}`];
                }
                if (arg.event.extendedProps?.status === "Suggested") {
                  return [`${_Classes["clsUpcoming"]}`];
                } else {
                  return [`${_Classes["clsUpcoming"]}`];
                }
              }}
            />
          )}
        </div>
      </div>
      <BookAppointmentJourney
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        adminData={adminData as AdminData}
      />
    </div>
  );
}

export default AdminCalender;
