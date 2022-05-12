/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import _Classes from "./CalendarView.module.scss";
import { Input, Button, Select } from "antd";
import {
  Appointment,
  useDoctorProfilesQuery,
  usePhysicianAppointmentsQuery,
} from "../../../../generated/graphql";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  handleDateChange: (arg: any | undefined) => void;
  handleDateClick: (arg: any | undefined) => void;
  calendarComponentRef: React.LegacyRef<FullCalendar> | undefined | any;
  calender: object | any;
  redirectToListing: () => void;
};

type events = {
  calenderEvents: Appointment | undefined | Array<object>;
};

function AdminAimsCalender(props: Props) {
  const {
    handleDateChange,
    calendarComponentRef,
    calender,
    handleDateClick,
    redirectToListing,
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
      filter: {
        patientName: searchText,
      },
    },
  });
  const { physicianAppointments } = physicianData || {};

  const setCalendarData = () => {
    setFilterCalender({
      ...calender,
      calenderEvents: physicianAppointments?.map(
        ({ id, patient, requestedDate, serviceType, charges }) => ({
          id: id,
          title: patient.first_name,
          start: requestedDate,
          patient: patient.first_name + " " + patient.last_name,
          serviceType: serviceType?.name,
          charges: charges,
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
        <FullCalendar
          dayHeaderContent={(args) => {
            const weekShortName = new Date(args.date).toLocaleString("en-us", {
              weekday: "short",
            });
            const currentDate = new Date(args.date).getDate();
            return (
              <div style={{ flexDirection: "column" }}>
                <div style={{ color: "#000" }}>{currentDate}</div>
                <div style={{ color: "#000" }}>{weekShortName}</div>
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
              click: function () {},
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
          events={filterCalender?.calenderEvents || calender?.calenderEvents}
          eventClick={handleDateClick}
          eventTextColor="black"
          displayEventTime={false}
        />
      </div>
    </div>
  );
}

export default AdminAimsCalender;
