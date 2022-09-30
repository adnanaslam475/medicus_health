import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import _Classes from "./CalendarView.module.scss";
// import { CloseOutlined } from "@ant-design/icons";
import BookAppointmentJourney from "common/components/BookAppointmentJourney/BookAppointmentJourney";
import AdminAppointmentsFilter from "modules/admin/components/AdminAppointmentsFilter/AdminAppointmentsFilter";
import {
  Appointment,
  GetAppointmentInput,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  usePhysicianAppointmentsQuery,
  User,
} from "generated/graphql";
import { getRole } from "../../../../common/utils/userData";
import { translationJson } from "common/locales/translationJson";
import { date, userData } from "common/utils";
import dayjs from "dayjs";
import { getCurrentUserTimeZone } from "common/utils/date";
import { Spin } from "antd";

type Props = {
  handleDateChange: (arg: any | undefined) => void;
  handleDateClick: (arg: any | undefined) => void;
  calendarComponentRef: React.LegacyRef<FullCalendar> | undefined | any;
  calender: object | any;
  redirectToListing: () => void;
  enableButton: boolean;
  isPhysicianCalendar?: boolean;
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
    isPhysicianCalendar,
  } = props;

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [filterCalender, setFilterCalender] = useState<events>({
    calenderEvents: [],
  });
  const [filterValues, setFilterValues] = React.useState<GetAppointmentInput>(
    {}
  );
  function handleSearch() {
    setIsSearch(!isSearch);
  }

  const timeZone = getCurrentUserTimeZone();
  const [
    { data: physicianData, fetching },
    executeUsePhysicianAppointmentsQuery,
  ] = usePhysicianAppointmentsQuery({
    variables: {
      filter: {
        ...filterValues,
        status: isPhysicianCalendar ? "Confirmed" : "", // we need to show all appointments for admin and only confirmed for physician
      },
      pagination: { page: 1, limit: -1 },
    },
  });
  const { physicianAppointments } = physicianData || {};

  const setCalendarData = () => {
    setFilterCalender({
      ...calender,
      calenderEvents: physicianAppointments?.items?.map(
        ({
          id,
          patient,
          requestedDate,
          serviceType,
          charges,
          status,
          appointmentTimeSlots,
          transaction,
          appointmentDateTime,
          doctor,
        }) => {
          const startTime =
            !!appointmentTimeSlots?.length &&
            appointmentTimeSlots?.find((item) => item.selected)?.startTime
              ? appointmentTimeSlots?.find((item) => item.selected)?.startTime
              : appointmentDateTime?.startTime
              ? appointmentDateTime?.startTime
              : new Date().toISOString();
          const endTime =
            !!appointmentTimeSlots?.length &&
            appointmentTimeSlots?.find((item) => item.selected)?.endTime
              ? appointmentTimeSlots?.find((item) => item.selected)?.endTime
              : appointmentDateTime?.endTime
              ? appointmentDateTime?.endTime
              : new Date().toISOString();

          const [startDate] = startTime.split("T");
          const start =
            userData.getRole() === "Admin"
              ? appointmentDateTime?.startTime
              : `${startDate}T${dayjs(startTime)
                  .tz(timeZone)
                  .format("HH:mm")}:00.000Z`;
          const end =
            userData.getRole() === "Admin"
              ? appointmentDateTime?.endTime
              : `${startDate}T${dayjs(endTime)
                  .tz(timeZone)
                  .format("HH:mm")}:00.000Z`;

          return {
            id: id,
            title: `${serviceType?.name}: ${patient?.first_name} ${patient?.last_name}`,
            mobileName: `${serviceType?.name}: ${patient?.first_name} ${patient?.last_name}`,
            start: start,
            end: end,
            doctor: doctor?.first_name + " " + doctor?.last_name,
            patient: patient?.first_name + " " + patient?.last_name,
            serviceType: serviceType?.name,
            charges: transaction?.amountReceived || charges,
            status: status,
            appointmentTimeSlots: appointmentTimeSlots,
            appointmentDateTime: appointmentDateTime,
          };
        }
      ),
    });
  };

  useEffect(() => {
    setCalendarData();
  }, [physicianAppointments]);

  const [{ data: physicianList }] = useGetPhysiciansQuery({
    variables: {
      filter: {},
      pagination: { page: 1, limit: -1 },
    },
  });
  const { getPhysicians } = physicianList || {};

  const [{ data: patientList }] = useGetPatientsQuery({
    variables: {
      filter: {},
      pagination: { page: 1, limit: -1 },
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
    physicianList: getPhysicians?.items,
    patientList: getPatients?.items,
  };

  const onChangeFilters = (values: GetAppointmentInput) => {
    setFilterValues(values);
    executeUsePhysicianAppointmentsQuery({
      filter: filterValues,
      requestPolicy: "network-only",
    });
  };

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    if (!fetching) {
      setIsInitialLoad(false);
    }
  }, [fetching]);

  // const mobileCalenName = {};
  // console.log("first", arg.event.extendedProps);
  return (
    <div>
      {isInitialLoad ? (
        <div className="lg:w-2/3 sm:w-full flex justify-center py-20 mr-5">
          <Spin />
        </div>
      ) : (
        <div className={`${_Classes["calendarview"]}`}>
          {isSearch ? (
            <AdminAppointmentsFilter
              filterValues={filterValues}
              onChange={onChangeFilters}
            />
          ) : null}
          <div className={`${_Classes["calendarviewStyle"]}`}>
            {enableButton ? (
              getRole() == "Admin" ? (
                <FullCalendar
                  // hiddenDays={[0, 6]}
                  expandRows={true}
                  eventDidMount={(info) => {
                    const div = document.createElement("div");
                    div.classList.add("tooltipCustom");
                    const span = document.createElement("span");
                    span.classList.add("tooltiptext");
                    // eslint-disable-next-line no-underscore-dangle
                    span.innerText =
                      info?.event?._def?.extendedProps?.mobileName;
                    div.appendChild(span);
                    info.el.appendChild(div);
                  }}
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
                  timeZone="UTC"
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
                      text: "Appointments",
                    },
                    custom1: {
                      text: "Request an appointment",
                      click: showModal,
                    },
                    listview: {
                      text: "List view",
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
                    if (arg.event.extendedProps?.status === "Canceled") {
                      return [`${_Classes["clsCanceled"]}`];
                    }
                    if (arg.event.extendedProps?.status === "Proposed") {
                      return [`${_Classes["clsUpcoming"]}`];
                    } else {
                      return [`${_Classes["clsUpcoming"]}`];
                    }
                  }}
                />
              ) : (
                <FullCalendar
                  expandRows={true}
                  eventDidMount={(info) => {
                    console.log(
                      "hello world2",
                      info?.event?._def?.extendedProps
                    );

                    const div = document.createElement("div");
                    div.classList.add("tooltipCustom");
                    const span = document.createElement("span");
                    span.classList.add("tooltiptext");
                    // eslint-disable-next-line no-underscore-dangle
                    span.innerText =
                      info?.event?._def?.extendedProps?.mobileName;
                    div.appendChild(span);
                    info.el.appendChild(div);
                  }}
                  // hiddenDays={[0, 6]}
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
                  timeZone="UTC"
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
                      text: "Upcomming appointments",
                    },
                    custom1: {
                      text: "Request an appointment",
                      click: showModal,
                    },
                    listview: {
                      text: "List view",
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
                    if (arg.event.extendedProps?.status === "Canceled") {
                      return [`${_Classes["clsCanceled"]}`];
                    }
                    if (arg.event.extendedProps?.status === "Proposed") {
                      return [`${_Classes["clsUpcoming"]}`];
                    } else {
                      return [`${_Classes["clsUpcoming"]}`];
                    }
                  }}
                />
              )
            ) : (
              <FullCalendar
                expandRows={true}
                eventDidMount={(info) => {
                  console.log("hello world3", info?.event?._def?.extendedProps);

                  const div = document.createElement("div");
                  div.classList.add("tooltipCustom");
                  const span = document.createElement("span");
                  span.classList.add("tooltiptext");
                  // eslint-disable-next-line no-underscore-dangle
                  span.innerText = info?.event?._def?.extendedProps?.mobileName;
                  div.appendChild(span);
                  info.el.appendChild(div);
                }}
                // hiddenDays={[0, 6]}
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
                timeZone="UTC"
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
                    text: "Upcoming appointments",
                  },
                  custom1: {
                    text: "Request an appointment",
                    click: showModal,
                  },
                  listview: {
                    text: "List view",
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
                  if (arg.event.extendedProps?.status === "Canceled") {
                    return [`${_Classes["clsCancelled"]}`];
                  }
                  if (arg.event.extendedProps?.status === "Proposed") {
                    return [`${_Classes["clsUpcoming"]}`];
                  } else {
                    return [`${_Classes["clsUpcoming"]}`];
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
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

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: translationJson(locale),
    },
  };
}
